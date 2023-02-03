/* eslint-disable no-use-before-define */
/* eslint-disable object-curly-newline */
import { useEffect, useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

/* Elements */
import Layout from 'components/Layout/Layout';
import AccountOverview from 'components/AccountOverview/AccountOverview';
import DepositDetailPanel from 'components/DepositDetailPanel/depositDetailPanel';
import { FEIBInputLabel, FEIBInput } from 'components/elements';

/* Reducers & JS functions */
import { setWaittingVisible } from 'stores/reducers/ModalReducer';
import { customPopup, showPrompt } from 'utilities/MessageModal';
import { loadFuncParams } from 'utilities/AppScriptProxy';
import { switchZhNumber, currencySymbolGenerator } from 'utilities/Generator';
import { getAccountsList, getAccountBonus, updateAccount } from 'utilities/CacheData';
import { Func } from 'utilities/FuncID';
import { useNavigation } from 'hooks/useNavigation';
import ThreeColumnInfoPanel from 'components/ThreeColumnInfoPanel';
import {
  getInterest,
  getTransactions,
  setAccountAlias,
} from './api';
import PageWrapper from './C00300.style';

/**
 * C00300 臺幣帳戶首頁
 */
const C00300 = () => {
  const dispatch = useDispatch();
  const {startFunc, closeFunc} = useNavigation();
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const { register, unregister, handleSubmit } = useForm();

  const [accounts, setAccounts] = useState();
  const [selectedAccountIdx, setSelectedAccountIdx] = useState();

  const selectedAccount = accounts ? accounts[selectedAccountIdx ?? 0] : null;

  // 優存(利率/利息)資訊 顯示模式（true.優惠利率, false.累積利息)
  const [showRate, setShowRate] = useState();

  /**
   * 頁面啟動，初始化
   */
  useEffect(() => {
    dispatch(setWaittingVisible(true));

    // 取得帳號基本資料，不含跨轉優惠次數，且餘額「非即時」。
    // NOTE 使用非同步方式更新畫面，一開始會先顯示帳戶基本資料，待取得跨轉等資訊時再更新一次畫面。
    getAccountsList('MC', async (items) => { // M=臺幣主帳戶、C=臺幣子帳戶
      if (items.length === 0) {
        await showPrompt('您還沒有任臺幣存款帳戶，請在系統關閉此功能後，立即申請。', () => closeFunc());
      } else {
        setAccounts(items);
        await processStartParams(items);
        dispatch(setWaittingVisible(false));
      }
    });
    return () => setAccounts(null);
  }, []);

  /**
   * 處理 Function Controller 提供的啟動參數。
   * @param {[*]} accts
   */
  const processStartParams = async (accts) => {
    // startParams: {
    //   defaultAccount: 預設帳號
    //   showRate: 優存(利率/利息)資訊 顯示模式
    // }
    const startParams = await loadFuncParams();
    // 取得 Function Controller 提供的 keepData(model)
    if (startParams && (startParams instanceof Object)) {
      const index = accts.findIndex((acc) => acc.accountNo === startParams.defaultAccount);
      setSelectedAccountIdx(index);
      setShowRate(startParams.showRate);
    } else {
      setSelectedAccountIdx(0);
      setShowRate(true);
      // 只要是重新登入，而不是從呼叫的功能返回（例：轉帳），就清掉交易明細快取。
      accts.forEach((acc) => {
        delete acc.isLoadingTxn; // 可能因為在載入中就關閉功能，而導致此旗標未被清除。
        delete acc.txnDetails;
      });
      forceUpdate(); // 因為在執行此方法前，已經先 setAccounts 輸出到畫面上了，所以需要再刷一次畫面。
    }
  };

  /**
   * 更新帳戶交易明細清單。
   * @returns 需有傳回明細清單供顯示。
   * TODO : 在該頁面開啟的情況下接收轉帳，會因為 account.txnDetails 已被 cached，導致無法再次刷新
   */
  const loadTransactions = (account) => {
    const { txnDetails } = account;
    if (!account.isLoadingTxn) {
      if (!txnDetails) {
        account.isLoadingTxn = true; // 避免因為非同步執行造成的重覆下載
        // 取得帳戶交易明細（三年內的前25筆即可）
        getTransactions(account.accountNo).then((transData) => {
          const details = transData.acctTxDtls.slice(0, 10); // 最多只需保留 10筆。
          account.txnDetails = details;

          // 更新餘額。
          if (transData.acctTxDtls.length > 0) {
            account.balance = details[0].balance;
          }

          delete account.isLoadingTxn; // 載入完成才能清掉旗標！
          updateAccount(account);
          forceUpdate();
        });
      }
    }
    return txnDetails;
  };

  /**
   * 下載 優存(利率/利息)資訊
   */
  const loadExtraInfo = async (account) => {
    if (!account.bonus || !account.bonus.loading) {
      account.bonus = { loading: true };
      getAccountBonus(account.accountNo, (info) => {
        account.bonus = info;
        forceUpdate();
        delete account.bonus.loading;
      });
    }
  };

  /**
   * 顯示 優存(利率/利息)資訊
   */
  const renderBonusInfoPanel = () => {
    if (!selectedAccount) return null;

    const { accountNo, bonus } = selectedAccount;
    if (!bonus || !bonus.freeTransferRemain) loadExtraInfo(selectedAccount); // 下載 優存(利率/利息)資訊

    const { freeWithdrawRemain, freeTransferRemain, bonusQuota, bonusRate } = bonus ?? {
      freeWithdrawRemain: null, freeTransferRemain: null, bonusQuota: null, bonusRate: null, // 預設值
    };

    // 優存(利率/利息)資訊
    let col2Title;
    let col2Value;
    if (showRate) {
      col2Title = '優惠利率';
      col2Value = bonusRate ? `${bonusRate * 100}%` : '-';
    } else {
      col2Title = '累積利息';
      if (selectedAccount.interest === undefined) {
        getInterest(accountNo).then((apiRs) => {
          selectedAccount.interest = apiRs.interest;
          forceUpdate();
        });
      }
      col2Value = (selectedAccount.interest > 0) ? `${currencySymbolGenerator('NTD', selectedAccount.interest)}` : '0';
    }

    const panelContent = [
      {
        label: '免費跨提/轉',
        value: `${freeWithdrawRemain ?? '-'}/${freeTransferRemain ?? '-'}`,
        iconType: 'Arrow',
      },
      {
        label: col2Title,
        value: col2Value,
        iconType: 'switch',
        onClick: () => setShowRate(!showRate),
      },
      {
        label: '優惠利率額度',
        value: `${switchZhNumber(bonusQuota, false)}`,
        iconType: 'Arrow',
        onClick: () => handleFunctionClick('depositPlus'),
      },
    ];

    return (
      <div className="panel">
        <ThreeColumnInfoPanel content={panelContent} />
      </div>
    );
  };

  /**
   * 編輯帳戶名稱
   * @param {*} name 原始帳戶名稱
   */
  const showRenameDialog = async (name) => {
    // Note: 因為這個 Dialog 是動態產生的，所以一定要刪掉註冊的元件。
    //       否則，下次註冊將失效，而且持續傳回最後一次的輪入值，而不會改變。
    unregister('newName', { keepDirty: false });

    const body = (
      <>
        <FEIBInputLabel>新的帳戶名稱</FEIBInputLabel>
        <FEIBInput
          {...register('newName')}
          autoFocus
          inputProps={{ maxLength: 10, placeholder: '請設定此帳戶的專屬名稱', defaultValue: name, autoComplete: 'off' }}
        />
      </>
    );
    const onOk = (values) => {
      selectedAccount.alias = values.newName; // 變更卡片上的帳戶名稱
      setAccountAlias(selectedAccount.accountNo, selectedAccount.alias);
      forceUpdate();

      // NOTE 明細資料不需要存入Cache，下次進入C00300時才會更新。
      const newAccount = {...selectedAccount};
      delete newAccount.isLoadingTxn;
      delete newAccount.txnDetails;
      updateAccount(newAccount);
    };
    await customPopup('帳戶名稱編輯', body, handleSubmit(onOk));
  };

  /**
   * 執行指定的單元功能。
   * @param {*} funcCode 功能代碼
   */
  const handleFunctionClick = async (funcCode) => {
    let params = null;

    const keepData = { defaultAccount: selectedAccount.accountNo, showRate };
    switch (funcCode) {
      case 'moreTranscations': // 更多明細
        params = {
          ...selectedAccount, // 直接提供帳戶摘要資訊就不用再下載。
          cardColor: 'purple',
        };
        break;

      case Func.D00100_臺幣轉帳.id:
        params = { transOut: selectedAccount.accountNo };
        break;

      case Func.D00300_無卡提款.id: // 無卡提款，只有母帳號才可以使用。 // TODO 帶參數過去
        params = { transOut: selectedAccount.accountNo };
        break;

      case Func.E00100_換匯.id: // TODO 帶參數過去
        params = { transOut: selectedAccount.accountNo };
        break;

      case Func.C00800.id: // 匯出存摺
        params = { accountNo: selectedAccount.accountNo }; // TODO 直接帶入台幣帳號
        break;

      case Func.D00800.id: // 匯出存摺
        params = { selectedAccount }; // TODO 直接帶入台幣帳號
        break;

      case 'Rename': // 帳戶名稱編輯
        showRenameDialog(selectedAccount.alias);
        return;

      case 'depositPlus':
      default:
        break;
    }

    startFunc(funcCode, params, keepData);
  };

  /**
   * 頁面輸出
   */
  return (
    <Layout title="臺幣活存">
      <PageWrapper small>
        {selectedAccount
          ? (
            <>
              <AccountOverview
                accounts={accounts}
                defaultSlide={selectedAccountIdx}
                onAccountChanged={setSelectedAccountIdx}
                onFunctionClick={handleFunctionClick}
                cardColor="purple"
                funcList={[
                  { fid: Func.D00100_臺幣轉帳.id, title: '轉帳' },
                  { fid: Func.E00100_換匯.id, title: '換匯' },
                  { fid: Func.D00300_無卡提款.id, title: '無卡提款', hidden: (selectedAccount.acctType !== 'M') },
                ]}
                moreFuncs={[
                  // { fid: null, title: '定存', icon: 'fixedDeposit', enabled: false }, // TODO: 此階段隱藏
                  { fid: Func.D00800.id, title: '預約轉帳查詢/取消', icon: 'reserve' },
                  { fid: Func.C00800.id, title: '匯出存摺', icon: 'coverDownload' },
                  { fid: 'Rename', title: '帳戶名稱編輯', icon: 'edit' },
                ]}
              />

              {/* 顯示 優惠利率資訊面版 */}
              { renderBonusInfoPanel() }

              <DepositDetailPanel
                details={loadTransactions(selectedAccount)}
                onMoreFuncClick={() => handleFunctionClick('moreTranscations')}
              />
            </>
          ) : null}
      </PageWrapper>
    </Layout>
  );
};

export default C00300;
