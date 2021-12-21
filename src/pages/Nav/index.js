/* eslint-disable arrow-body-style */
// import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { goToFunc } from 'utilities/BankeePlus';
// import { useDispatch } from 'react-redux';
// import Accordion from 'components/Accordion';
// import { setIsShake } from 'pages/ShakeShake/stores/actions';
import { FEIBButton } from 'components/elements';

import NavWrapper from './nav.style';

const Nav = () => {
  const history = useHistory();
  // const dispatch = useDispatch();

  // const nativeActionWasTriggered = () => {
  //   dispatch(setIsShake(true));
  // };

  const goToFunction = (route, funcID) => {
    goToFunc({ route, funcID });
  };

  // 登出
  const logOut = () => {
    const url = 'https://appbankee-t.feib.com.tw/ords/db1/netdb/logoutUser';
    const data = {
      id_number: localStorage.getItem('custId'),
    };
    const callLogout = () => fetch(url, {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
    }).then((response) => response.json());

    callLogout()
      .then(({ code }) => {
        if (code === '00') {
          history.push('/login');
        }
      });
  };

  return (
    <NavWrapper>
      <FEIBButton onClick={logOut}>登出</FEIBButton>
      <div onClick={() => goToFunction('/more', 104100)}>
        <ul>
          <li>功能：更多</li>
          <li>route: /more</li>
          <li>funcID: 104100</li>
        </ul>
      </div>
      <div onClick={() => goToFunction('/profile', 111100)}>
        <ul>
          <li>功能：個人化設定</li>
          <li>route: /profile</li>
          <li>funcID: 111100</li>
        </ul>
      </div>
      <div onClick={() => goToFunction('/quickLoginSetting', 112100)}>
        <ul>
          <li>功能：快速登入設定</li>
          <li>route: /quickLoginSetting</li>
          <li>funcID: 112100</li>
        </ul>
      </div>
      <div onClick={() => goToFunction('/smsOTPactivate', 113100)}>
        <ul>
          <li>功能：簡訊OTP設定</li>
          <li>route: /smsOTPactivate</li>
          <li>funcID: 113100</li>
        </ul>
      </div>
      <div onClick={() => goToFunction('/basicInformation', 114100)}>
        <ul>
          <li>功能：基本資料變更</li>
          <li>route: /basicInformation</li>
          <li>funcID: 114100</li>
        </ul>
      </div>
      <div onClick={() => goToFunction('/mobileTransfer', 115100)}>
        <ul>
          <li>功能：手機號碼收款設定</li>
          <li>route: /mobileTransfer</li>
          <li>funcID: 115100</li>
        </ul>
      </div>
      <div onClick={() => goToFunction('/changeUserName', 116100)}>
        <ul>
          <li>功能：使用者代號變更</li>
          <li>route: /changeUserName</li>
          <li>funcID: 116100</li>
        </ul>
      </div>
      <div onClick={() => goToFunction('/pwdModify', 117100)}>
        <ul>
          <li>功能：網銀密碼變更</li>
          <li>route: /pwdModify</li>
          <li>funcID: 117100</li>
        </ul>
      </div>
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
    </NavWrapper>
  );
};

export default Nav;
