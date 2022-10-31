import uuid from 'react-uuid';
// import { useDispatch } from 'react-redux';
// import { setDrawer, setDrawerVisible } from 'stores/reducers/ModalReducer';

import AccountCard from 'components/AccountCard';
import { accountOverviewCardVarient, getCurrenyInfo } from 'utilities/Generator';
import { startFunc } from 'utilities/AppScriptProxy';

import { showDrawer } from 'utilities/MessageModal';
import AccountCardListWrapper from './AccountCardList.style';

/**
 * C00100 帳戶總覽之下方帳戶列表元件
 * 首先，先過濾帳戶列表，因為：
 *   1. 子帳戶、外幣帳戶、貸款會有多個，必須加總起來，且點擊後，會出現下拉式選單。
 *      - 只有一個時不會有選單，直接進入下一頁。
 *   2. 依照spec，帳戶總覽不呈現社群帳本。
 * 最後，再依金額排序。
 */
const AccountCardList = ({ data, isDebt }) => {
  // const dispatch = useDispatch();
  // 證券 start function
  const sAccStartFunc = (account, cardColor) => {
    startFunc('moreTranscations', {
      acctBalx: account.balance,
      accBranch: account.accountNo.slice(0, 3),
      acctId: account.accountNo,
      acctName: account.alias,
      acctType: account.type,
      ccyCd: account.currency,
      cardColor,
    });
  };

  // 累加帳戶金額
  const accumulateBalance = (list) => list.reduce((accumulate, item) => accumulate + Math.abs(item.balance), 0);

  // 子帳戶、外幣帳戶、貸款、證券除外
  const mainList = data.filter((account) => account.type !== 'C' && account.type !== 'F' && account.type !== 'L' && account.type !== 'S');

  // 子帳戶，且 只有『存錢計畫』
  const subAccounts = data.filter((account) => account.type === 'C' && account.purpose === 2);
  if (subAccounts.length > 0) {
    mainList.push({
      type: 'C',
      accountNo: null,
      balance: accumulateBalance(subAccounts),
    });

    // 依金額從大到小排序。
    subAccounts.sort((a, b) => b.balance - a.balance);
  }

  // 外幣帳戶
  const foreignAccounts = data.filter((account) => account.type === 'F');
  if (foreignAccounts.length > 0) {
    mainList.push({
      type: 'F',
      accountNo: foreignAccounts[0].accountNo,
      balance: accumulateBalance(foreignAccounts), // TODO: 金額為“轉換為台幣後”的加總，目前為數字直接加總
    });

    // 依金額從大到小排序。
    foreignAccounts.sort((a, b) => b.balance - a.balance);
  }

  // 貸款
  const loanAccounts = data.filter((account) => account.type === 'L');
  if (loanAccounts.length > 0) {
    mainList.push({
      type: 'L',
      accountNo: null,
      balance: accumulateBalance(loanAccounts),
    });

    // 依金額從大到小排序。
    loanAccounts.sort((a, b) => b.balance - a.balance);
  }

  // 證券
  const stockAccounts = data.filter((account) => account.type === 'S');
  if (stockAccounts.length > 0) {
    mainList.push({
      type: 'S',
      accountNo: null,
      balance: accumulateBalance(stockAccounts),
    });

    stockAccounts.sort((a, b) => b.balance - a.balance);
  }

  // 總金額，用於計算百分比
  const totalBalance = accumulateBalance(mainList);

  // 負債的金額是負值，將金額轉正，以便後續處理。
  mainList.forEach((account) => { account.balance = Math.abs(account.balance); });

  // 依金額從大到小排序。
  mainList.sort((a, b) => b.balance - a.balance);

  // 產生下拉選單(子帳戶／外幣帳戶／貸款 / 證券S)
  const renderSubAccountDrawer = (accounts, funcId) => {
    const subTotalBalance = accumulateBalance(accounts);
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2.4rem',
          paddingInline: '1.6rem',
          marginBottom: '4rem',
        }}
      >
        { accounts.map((card) => {
          const cardColor = accountOverviewCardVarient(card.type);
          const onClick = () => {
            if (card.type === 'S') {
              sAccStartFunc(card, cardColor);
              return;
            }
            startFunc(funcId, { focusToAccountNo: card.accountNo }); // TODO 從 存錢計畫 返回時的處理。
          };

          let cardName;
          switch (card.type) {
            case 'F': // 外幣帳戶
              cardName = getCurrenyInfo(card.currency).name;
              break;
            case 'S': // 證券戶
              cardName = '證券交割戶';
              break;
            case 'C': // 子帳戶
              cardName = '存錢計畫';
              break;
            case 'L': // 貸款
              cardName = '貸款';
              break;

            default:
              cardName = '';
              break;
          }
          return (
            <button
              key={uuid()}
              type="button"
              title={`前往${cardName}`}
              aria-label={`前往${cardName}`}
              onClick={onClick}
            >
              <AccountCard
                cardName={cardName}
                percent={subTotalBalance > 0 ? Math.round((card.balance / subTotalBalance) * 100) : 0}
                hasShadow
                dollarSign={card.currency}
                {...card}
              />
            </button>
          );
        }) }
      </div>
    );
  };

  return (
    <AccountCardListWrapper>
      { mainList.map((account) => {
        let annotation;
        let funcID;
        let cardName;
        let onClick = () => startFunc(funcID); // TODO 從 存錢計畫 返回時的處理。
        const cardInfo = accountOverviewCardVarient(account.type);

        switch (account.type) {
          case 'M': // 母帳戶
            cardName = '主帳戶';
            funcID = 'C00300';
            break;
          case 'F': // 外幣帳戶 數量為1時不開drawer
            cardName = '外幣帳戶';
            funcID = 'C00400';
            onClick = () => (foreignAccounts.length === 1 ? startFunc(funcID) : showDrawer('選擇帳戶', renderSubAccountDrawer(foreignAccounts, funcID)));
            break;
          case 'S': // 證券戶
            cardName = '證券交割戶';
            // 證券S 數量為1時不開drawer
            onClick = () => (stockAccounts.length === 1 ? sAccStartFunc(account, cardInfo.color) : showDrawer('選擇帳戶', renderSubAccountDrawer(stockAccounts)));
            break;

          case 'C': // 子帳戶 數量為1時不開drawer
            cardName = '子帳戶';
            funcID = 'C00600';
            onClick = () => (subAccounts.length === 1 ? startFunc(funcID, { focusToAccountNo: subAccounts[0].accountNo }) : showDrawer('選擇計畫', renderSubAccountDrawer(subAccounts, funcID)));
            // {
            //   // dispatch(setDrawer({ title: '選擇計畫', content: renderSubAccountDrawer(subAccounts), shouldAutoClose: true }));
            //   // dispatch(setDrawerVisible(true));
            // };
            break;
          case 'CC': // 信用卡
            cardName = '信用卡';
            annotation = '已使用額度';
            funcID = 'C00700';
            break;
          case 'L': // 貸款 數量為1時不開drawer
            cardName = '貸款';
            funcID = 'L00100';
            onClick = () => (loanAccounts.length === 1 ? startFunc(funcID) : showDrawer('選擇計畫', renderSubAccountDrawer(loanAccounts, funcID)));
            break;
          default:
            cardName = '';
            annotation = null;
            funcID = null;
            onClick = null;
            break;
        }

        return (
          <button
            key={uuid()}
            type="button"
            title={`前往${cardName}`}
            aria-label={`前往${cardName}`}
            onClick={onClick}
          >
            <AccountCard // 會依 card.type 決定顏色。
              cardName={cardName}
              percent={totalBalance > 0 ? Math.round((account.balance / totalBalance) * 100) : 0} // TODO 可能因為捨進位問題，會不等於100
              annotation={annotation}
              hasShadow
              isShowAccoutNo={!isDebt}
              {...account}
            />
          </button>
        );
      })}
    </AccountCardListWrapper>
  );
};

export default AccountCardList;
