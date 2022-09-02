import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { AddIcon } from 'assets/images/icons';
import Main from 'components/Layout';
import Layout from 'components/Layout/Layout';
import MemberAccountCard from 'components/MemberAccountCard';
import { showCustomPrompt, showDrawer } from 'utilities/MessageModal';
import { loadLocalData, setLocalData } from 'utilities/Generator';
import { setDrawerVisible, setWaittingVisible } from 'stores/reducers/ModalReducer';

import {
  getAllFrequentAccount,
  addFrequentAccount,
  updateFrequentAccount,
  deleteFrequentAccount,
} from './api';

import AccountEditor from './D00500_AccountEditor';
import PageWrapper from './D00500.style';

/**
 * D00500 常用帳號管理頁
 */
const Page = () => {
  const dispatch = useDispatch();
  const [accounts, setAccounts] = useState([]);

  const storageName = 'FreqAccts';

  /**
   *- 初始化
   */
  useEffect(async () => {
    dispatch(setWaittingVisible(true));

    const accts = await loadLocalData(storageName, getAllFrequentAccount);
    setAccounts(accts);

    dispatch(setWaittingVisible(false));
  }, []);

  /**
   * 處理UI流程：新增帳戶
   */
  const addnewAccount = async () => {
    const onFinished = async (newAcct) => {
      const successful = await addFrequentAccount(newAcct);
      if (successful) {
        setAccounts(setLocalData(storageName, [{
          ...newAcct,
          isNew: true,
        }, ...accounts]));
      }
      dispatch(setDrawerVisible(false));
    };

    await showDrawer('新增常用帳號', (<AccountEditor onFinished={onFinished} />));
  };

  /**
   * 處理UI流程：編輯帳戶
   * @param {*} acct 變更前資料。
   */
  const editAccount = async (acct) => {
    const { bankId, acctId } = acct; // 變更前 常用轉入帳戶-銀行代碼 及 帳號
    const onFinished = async (newAcct) => {
      const successful = await updateFrequentAccount({
        ...newAcct,
        orgBankId: bankId,
        orgAcctId: acctId,
      });
      dispatch(setDrawerVisible(false));
      if (successful) {
        acct.isNew = false;
        setAccounts(setLocalData(storageName, [...accounts])); // 強制更新清單。
      }
    };

    await showDrawer('編輯常用帳號', (<AccountEditor initData={acct} onFinished={onFinished} />));
  };

  /**
   * 處理UI流程：移除登記帳戶
   */
  const removeAccount = (acct) => {
    const onRemoveConfirm = async () => {
      const successful = await deleteFrequentAccount({ bankId: acct.bankId, acctId: acct.acctId });
      if (successful) {
        const tmpCards = accounts.filter((c) => c.acctId !== acct.acctId);
        setAccounts(setLocalData(storageName, tmpCards));
      }
    };

    showCustomPrompt({
      title: '系統訊息',
      message: (<div style={{ textAlign: 'center' }}>您確定要刪除此帳號?</div>),
      okContent: '確定刪除',
      onOk: onRemoveConfirm,
      cancelContent: '我再想想',
    });
  };

  /**
   * 顯示帳戶列表
   */
  return (
    <Layout title="常用帳號管理">
      <Main small>
        <PageWrapper>
          <button type="button" aria-label="新增常用帳號" className="addMemberButtonArea" onClick={addnewAccount}>
            <div className="addMemberButtonIcon">
              <AddIcon />
            </div>
            <span className="addMemberButtonText">新增常用帳號</span>
          </button>
          {accounts?.map((acct) => (
            <MemberAccountCard
              key={acct.acctId}
              type="常用帳號"
              name={acct.nickName}
              bankNo={acct.bankId}
              bankName={acct.bankName}
              account={acct.acctId}
              avatarSrc={acct.headshot}
              hasNewTag={acct.isNew}
              onEdit={() => editAccount(acct)}
              onRemove={() => removeAccount(acct)}
            />
          )) }
        </PageWrapper>
      </Main>
    </Layout>
  );
};

export default Page;
