/* eslint-disable object-curly-newline */
/* eslint-disable arrow-body-style */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { goToFunc } from 'utilities/BankeePlus';
import { FEIBButton } from 'components/elements';
import { setWaittingVisible } from '../../stores/reducers/ModalReducer';
import { logout } from './Nav.api';
import { getAllNotices, addNotice, removeNotice, updateNotice } from '../../pages/ForeignCurrencyPriceSetting/api'; // 到價通知設定

import NavWrapper from './Nav.style';

const Nav = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(async () => {
    const token = sessionStorage.getItem('jwtToken');
    if (!token) {
      history.push('/login');
    }
  }, []);

  // 登出
  const logOut = async () => {
    await logout();
    history.push('/login');
    // const url = 'https://appbankee-t.feib.com.tw/ords/db1/netdb/logoutUser';
    // const data = {
    //   id_number: localStorage.getItem('custId'),
    // };
    // const callLogout = () => fetch(url, {
    //   body: JSON.stringify(data),
    //   headers: {
    //     'content-type': 'application/json',
    //   },
    //   method: 'POST',
    // }).then((response) => response.json());

    // callLogout()
    //   .then(({ code }) => {
    //     if (code === '00') {
    //       history.push('/login');
    //     }
    //   });
  };

  const startFunc = (funcID, params) => {
    dispatch(setWaittingVisible(true));
    goToFunc({ route: funcID, funcID }, params);
    dispatch(setWaittingVisible(false));
  };

  return (
    <NavWrapper>
      <div onClick={() => startFunc('C00300')}>
        <ul>
          <li>台幣活存</li>
          <li>funcID: C00300</li>
        </ul>
      </div>
      <div onClick={() => startFunc('C00400')}>
        <ul>
          <li>外幣活存</li>
          <li>funcID: C00400</li>
        </ul>
      </div>
      <div onClick={() => goToFunc({ route: '/more', funcID: 'B00600' })}>
        <ul>
          <li>功能：更多</li>
          <li>funcID: B00600</li>
        </ul>
      </div>
      {/* <div onClick={() => goToFunc({ route: '/profile', funcID: 'T00100' })}>
        <ul>
          <li>功能：個人化設定</li>
          <li>route: /profile</li>
          <li>funcID: T00100</li>
        </ul>
      </div>
      <div onClick={() => goToFunc({ route: '/quickLoginSetting', funcID: 'T00200' })}>
        <ul>
          <li>功能：快速登入設定</li>
          <li>route: /quickLoginSetting</li>
          <li>funcID: T00200</li>
        </ul>
      </div>
      <div onClick={() => goToFunc({ route: '/smsOTPactivate', funcID: 'T00400' })}>
        <ul>
          <li>功能：簡訊OTP設定</li>
          <li>route: /smsOTPactivate</li>
          <li>funcID: T00400</li>
        </ul>
      </div>
      <div onClick={() => goToFunc({ route: '/basicInformation', funcID: 'T00700' })}>
        <ul>
          <li>功能：基本資料變更</li>
          <li>route: /basicInformation</li>
          <li>funcID: T00700</li>
        </ul>
      </div>
      <div onClick={() => goToFunc({ route: '/mobileTransfer', funcID: 'T00600' })}>
        <ul>
          <li>功能：手機號碼收款設定</li>
          <li>route: /mobileTransfer</li>
          <li>funcID: T00600</li>
        </ul>
      </div>
      <div onClick={() => goToFunc({ route: '/changeUserName', funcID: 'T00800' })}>
        <ul>
          <li>功能：使用者代號變更</li>
          <li>route: /changeUserName</li>
          <li>funcID: T00800</li>
        </ul>
      </div>
      <div onClick={() => goToFunc({ route: '/pwdModify', funcID: 'T00900' })}>
        <ul>
          <li>功能：網銀密碼變更</li>
          <li>route: /pwdModify</li>
          <li>funcID: T00900</li>
        </ul>
      </div>
      <div onClick={() => goToFunc({ route: '/notice', funcID: 'B00300' })}>
        <ul>
          <li>功能：訊息通知</li>
          <li>route: /notice</li>
          <li>funcID: B00300</li>
        </ul>
      </div>
      <div onClick={() => goToFunc({ route: '/staging', funcID: '' })}>
        <ul>
          <li>功能：消費分期</li>
          <li>route: /staging</li>
          <li>funcID: </li>
        </ul>
      </div> */}

      {/* <Accordion title="驗收單元功能清單 (1)" space="bottom">
        <Link to="/notice">E02 訊息通知</Link>
        <Link to="/noticeSetting">E02-1 訊息通知設定</Link>
        <Link to="/fingerPrintLockSetting">E05-03 生物辨識登入設定</Link>
        <Link to="/patternLockSetting">E05-04 圖形密碼登入設定</Link>
        <Link to="/smsOTPactivate">E05-06 簡訊OTP設定</Link>
        <Link to="/changeUserName">E05-10 使用者代號變更</Link>
        <Link to="/pwdModify">E05-11 網銀密碼變更</Link>
        <Link to="/projectJ">E06-06 Join智慧信貸</Link>
        <Link to="/lossReissue">E06-10 金融卡掛失補發</Link>
      </Accordion>

      <Accordion title="驗收單元功能清單 (2)" space="bottom">
        <Link to="/taiwanDollarAccount">D01 存款卡（母帳戶）</Link>
        <Link to="/billPay">D06-5 信用卡-繳費</Link>
        <Link to="/adjustment">D06-7 信用卡-額度臨調</Link>
        <Link to="/loanInquiry">D07-1 貸款應繳查詢</Link>
        <Link to="/loanInterest">D07-2 貸款繳息紀錄查詢</Link>
        <div onClick={nativeActionWasTriggered} className="shake">D08-1 QR-Code轉帳（搖一搖）</div>
        <Link to="/cardLessATM">E09 無卡提款</Link>
      </Accordion>

      <Accordion title="驗收單元功能清單 (3)" space="bottom">
        <Link to="/depositInquiry">D01-1 帳戶明細</Link>
        <Link to="/QRCodeTransfer">E08 QRCode 轉帳</Link>
      </Accordion>

      <Accordion title="其它功能" space="bottom">
        <Link to="/nicknameSetting">暱稱設定</Link>
        <Link to="/login">登入頁（JWE&JWT&E2EE）</Link>
        <Link to="/qAndA">Q＆A</Link>
        <Link to="/open">開通APP</Link>
        <Link to="/deduct">自動扣繳申請/查詢</Link>
        <Link to="/transfer">轉帳</Link>
      </Accordion> */}
      <FEIBButton onClick={logOut}>登出</FEIBButton>
      <div>
        <div onClick={() => getAllNotices()}>
          <ul>
            <li>到價通知設定 - 取得所有通知設定</li>
            <li>API: getAllNotices</li>
          </ul>
        </div>
        <div onClick={() => addNotice({ currency: 'USD', price: '29.56', exType: 0 })}>
          <ul>
            <li>到價通知設定 - 新增</li>
            <li>API: addNotice</li>
          </ul>
        </div>
        <div onClick={() => removeNotice({ currency: 'USD', price: '29.56', exType: 0 })}>
          <ul>
            <li>到價通知設定 - 刪除</li>
            <li>API: removeNotice</li>
          </ul>
        </div>
        <div onClick={() => updateNotice({ currency: 'USD', price: '29.56', exType: 0 }, { currency: 'JPY', price: '4.02', exType: 1 })}>
          <ul>
            <li>到價通知設定 - 修改</li>
            <li>API: updateNotice</li>
          </ul>
        </div>
      </div>
    </NavWrapper>
  );
};

export default Nav;
