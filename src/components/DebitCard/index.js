import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Icon } from '@material-ui/core';
import {
  Visibility, VisibilityOff, FileCopyOutlined, MoreVert,
  Euro, LibraryAdd, SystemUpdate, Edit, PlaylistAdd,
} from '@material-ui/icons';
import BottomDrawer from 'components/BottomDrawer';
import { FEIBIconButton } from 'components/elements';
import theme from 'themes/theme';
import { toCurrency } from 'utilities/Generator';
import DebitCardBackground from 'assets/images/debitCardBackground.png';
import DebitCardWrapper from './debitCard.style';

/*
* ==================== DebitCard 組件說明 ====================
* 存款卡組件
* ==================== DebitCard 可傳參數 ====================
* 1. type -> 卡片類型，決定卡片顯示簡易內容或完整內容
*    預設不傳為顯示簡易內容，傳入 "original" 字串會顯示完整內容
* 2. branch -> 分行名稱，組件 type 為 original 的卡片 (完整內容) 才需要傳入
* 3. cardName -> 卡片名稱
* 4. account -> 卡片帳號
* 5. balance -> 卡片餘額，輸入純數字即可，顯示時會自動加上貨幣符號及千分位逗點
* 6. hideIcon -> 此組件預設會在餘額前顯示眼睛圖示的 Icon Button
*    點擊 Icon 後可隱藏餘額，倘若不需要此功能請在組件加上 hideIcon 屬性
* 7. functionList -> 卡片功能清單，型別為陣列，組件 type 為 original 的卡片 (完整內容) 才需要傳入
* 8. moreList -> 點擊更多圖標後彈出的更多功能清單，型別為陣列，組件 type 為 original 的卡片 (完整內容) 才需要傳入
* */

const DebitCard = ({
  type,
  branch,
  cardName,
  account,
  balance,
  hideIcon,
  functionList,
  moreList,
}) => {
  const [showBalance, setShowBalance] = useState(true);
  const [copyAccount, setCopyAccount] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleClickShowBalance = () => {
    setShowBalance(!showBalance);
  };

  const handleClickCopyAccount = () => {
    setCopyAccount(true);
    // 1.5 秒後將 copyAccount 的值重置
    setTimeout(() => setCopyAccount(false), 1500);
  };

  // 判斷卡片類型是否為 original
  const originalType = () => type === 'original';

  // 渲染卡片餘額左側的 "眼睛" 圖標 (顯示/隱藏)
  const renderEyeIconButton = () => (
    <FEIBIconButton
      $fontSize={1.6}
      $iconColor={theme.colors.text.darkGray}
      onClick={handleClickShowBalance}
    >
      {showBalance ? <Visibility /> : <VisibilityOff />}
    </FEIBIconButton>
  );

  // 渲染卡片帳號右側的 "複製" 圖標
  const renderCopyIconButton = () => (
    <div>
      <CopyToClipboard
        text={account}
        onCopy={handleClickCopyAccount}
      >
        <FEIBIconButton
          $iconColor={theme.colors.text.lightGray}
          $fontSize={1.6}
        >
          <FileCopyOutlined />
        </FEIBIconButton>
      </CopyToClipboard>
      <span className={`copiedMessage ${copyAccount && 'showMessage'}`}>已複製</span>
    </div>
  );

  // 渲染卡片右上角的 "更多" 圖標
  const renderMoreIconButton = () => (
    <div className="moreIconButton">
      <FEIBIconButton
        $iconColor={theme.colors.text.lightGray}
        $fontSize={2}
        onClick={() => setOpenDrawer(true)}
      >
        <MoreVert />
      </FEIBIconButton>
    </div>
  );

  // 目前無 api，暫用假資料
  // eslint-disable-next-line no-unused-vars
  const mockFunctionList = [
    { title: '轉帳', path: '/', other: null },
    { title: '無卡提款', path: '/cardLessATM', other: null },
  ];
  // eslint-disable-next-line no-unused-vars
  const mockMoreList = [
    { title: '換匯', path: '/', icon: <Euro /> },
    { title: '設為速查帳戶', path: '/cardLessATM', icon: <PlaylistAdd /> },
    { title: '增加子帳戶', path: '/cardLessATM', icon: <LibraryAdd /> },
    { title: '存摺封面下載', path: '/cardLessATM', icon: <SystemUpdate /> },
    { title: '編輯帳戶別名', path: '/cardLessATM', icon: <Edit /> },
  ];

  // render 功能列表
  const renderFunctionList = (list) => (
    <ul className="functionList">
      { list.map((item) => (
        <li key={item.path}>
          <Link to={item.path}>{item.title}</Link>
        </li>
      )) }
    </ul>
  );

  // render 點擊更多圖標後的功能列表
  const renderMoreList = (list) => (
    <ul className="moreList">
      { list.map((item) => (
        <li key={item.title}>
          <Link to={item.path}>
            <Icon>{item.icon}</Icon>
            {item.title}
          </Link>
        </li>
      )) }
    </ul>
  );

  const renderBottomDrawer = (list) => (
    <BottomDrawer
      className="debitCardDrawer"
      isOpen={openDrawer}
      onClose={() => setOpenDrawer(!openDrawer)}
      content={renderMoreList(list)}
    />
  );

  return (
    <DebitCardWrapper className="debitCard">
      <img src={DebitCardBackground} alt="background" className="backgroundImage" />
      <div className="cardTitle">
        <h2 className="cardName">{cardName}</h2>
        <div className="accountInfo">
          { originalType() && <p className="branch">{branch}</p> }
          <p className="account">{account}</p>
          { renderCopyIconButton() }
        </div>
      </div>
      <div className={`cardBalance ${originalType() && 'grow'}`}>
        { !hideIcon && renderEyeIconButton() }
        <h3 className="balance">
          {showBalance ? `$${toCurrency(balance)}` : '＊＊＊＊＊'}
        </h3>
      </div>
      { originalType() && renderFunctionList(functionList) }
      { originalType() && renderMoreIconButton() }
      { originalType() && renderBottomDrawer(moreList) }
    </DebitCardWrapper>
  );
};

export default DebitCard;
