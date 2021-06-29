/* eslint-disable */
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import VisibilitySensor from 'react-visibility-sensor';
import { useCheckLocation, usePageInfo } from 'hooks';
import { SearchRounded, CancelRounded, GetAppRounded } from '@material-ui/icons';
import { depositInquiryApi } from 'apis';
import DepositSearchCondition from 'pages/DepositSearchCondition';
import DebitCard from 'components/DebitCard';
import DetailCard from 'components/DetailCard';
import Dialog from 'components/Dialog';
import BottomDrawer from 'components/BottomDrawer';
// import CheckboxButton from 'components/CheckboxButton';
import {
  FEIBIconButton, FEIBTabContext, FEIBTabList, FEIBTab, FEIBButton,
} from 'components/elements';
import theme from 'themes/theme';
import { dateFormatter } from 'utilities/Generator';
import DepositInquiryWrapper from './depositInquiry.style';
import {
  setDetailList, setOpenInquiryDrawer, setDateRange, setKeywords, setCustomKeyword,
} from './stores/actions';

const DepositInquiry = () => {
  const transactionDetailRef = useRef();
  const [tabId, setTabId] = useState('');
  const [openDownloadDrawer, setOpenDownloadDrawer] = useState(false);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [viewerChild, setViewerChild] = useState([]);
  const [inViewChild, setInViewChild] = useState([]);

  const cardInfo = useSelector(({ depositOverview }) => depositOverview.cardInfo);
  const detailList = useSelector(({ depositInquiry }) => depositInquiry.detailList);
  const openInquiryDrawer = useSelector(({ depositInquiry }) => depositInquiry.openInquiryDrawer);
  const dateRange = useSelector(({ depositInquiry }) => depositInquiry.dateRange);
  const keywords = useSelector(({ depositInquiry }) => depositInquiry.keywords);
  // const displayKeywords = useSelector(({ depositInquiry }) => depositInquiry.displayKeywords);
  const { doGetInitData } = depositInquiryApi;
  const dispatch = useDispatch();

  const initKeywords = [
    { title: '繳卡款', name: 'keywordBill', selected: false },
    { title: '轉出', name: 'keywordTransfer', selected: false },
    { title: '轉入', name: 'keywordDepositAccount', selected: false },
    { title: '利息', name: 'keywordInterest', selected: false },
    { title: '付款儲值', name: 'keywordSpend', selected: false },
    { title: '薪轉', name: 'keywordSalary', selected: false },
  ];

  const handleChangeTabList = (event, id) => {
    setTabId(id);
  };

  // 點擊查詢條件篩選 icon (放大鏡)
  const handleClickSearchButton = () => {
    dispatch(setOpenInquiryDrawer(true));
  };

  // 點擊下載交易明細 icon
  const handleClickDownloadDetails = (format) => {
    setOpenDownloadDrawer(false);
    if (format === 'pdf') {
      // TODO: 交易明細下載 (Pdf 格式)
      // window.location.href = 'url';
    } else {
      // TODO: 交易明細下載 (Excel 格式)
      // window.location.href = 'url';
    }
  };

  // 點擊清空條件 icon
  const handleClickClearCondition = () => {
    // 儲存目前的已選關鍵字陣列至 tempSelectedKeywords
    const tempKeywords = Array.from(keywords);
    // 將 tempKeywords 內所有的關鍵字改為未選取
    tempKeywords.forEach((keyword) => {
      keyword.selected = false;
    });
    // 清空日期範圍條件
    dispatch(setDateRange([]));
    // 清空已選關鍵字條件 (將所 tempSelectedKeywords 取代掉現有的 selectedKeywords)
    dispatch(setKeywords(tempKeywords));
    dispatch(setCustomKeyword(''));
    // dispatch(setDisplayKeywords([]));
  };

  const handleClickMonthTabs = async (event) => {
    // 從點擊的 Tab 連結取得 TabId
    const tabId = event.currentTarget.href.split('#').pop();
    const response = await doGetInitData('/api/depositInquiry');
    if (response.november) {
      dispatch(setDetailList(response.november));
      const target = Array.from(transactionDetailRef.current['children']).find((child) => child.id === tabId);
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };


  /* ===================== test ===================== */
  const getNewDetailData = async (scrollDirection) => {
    const newDetailList = [];
    const response = await doGetInitData('/api/depositInquiry');
    if (response.nextCall) {
      if (scrollDirection === 'up') {
        newDetailList.push(...response.nextCall, ...detailList);
      } else if (scrollDirection === 'down') {
        newDetailList.push(...detailList, ...response.nextCall);
      }
      dispatch(setDetailList(newDetailList));
      setIsPending(() => {
        console.log('資料回來了，關閉 isPending');
        return false;
      });
    }
  };

  const visibilitySensorOnChange = (isVisible) => {
    if (transactionDetailRef.current) {
      setViewerChild(Array.from(transactionDetailRef.current['children']));
      const inViewChildren = viewerChild.filter((item) => item.dataset.inview === "y");
      setInViewChild((prev) => {
        if (prev.length > 0 && inViewChildren.length > 0) {
          setTabId(inViewChildren[0].id);

          /* ============ 判斷使用者往上捲動或往下捲動 ========== */
          // 往下捲動
          if (prev[0].dataset.index < inViewChildren[0].dataset.index) {
            const prevLastIndex = parseInt(prev[prev.length - 1].dataset.index, 10);
            const viewerChildLastIndex = parseInt(viewerChild[viewerChild.length - 1].dataset.index, 10);
            // console.info("prev's last index", prevLastIndex);
            // console.info("total's last index", viewerChildLastIndex);
            if (viewerChildLastIndex - prevLastIndex < 5 && viewerChildLastIndex - prevLastIndex > 0) {
              if (!isPending) {
                // console.log(`下方剩餘數量少於 5 張卡片，call api 獲取從索引第 ${viewerChildLastIndex + 1} 到第 ${viewerChildLastIndex + 21} 張`);
                setIsPending(true);
                getNewDetailData('down');
              }
            }
          //  往上捲動
          } else if (prev[0].dataset.index > inViewChildren[0].dataset.index) {
            const prevFirstIndex = parseInt(prev[0].dataset.index, 10);
            const viewerChildFirstIndex = parseInt(viewerChild[0].dataset.index, 10);
            // 往上捲動
            console.info('prevFirstIndex: ', prevFirstIndex);
            console.info('viewerChildFirstIndex: ', viewerChildFirstIndex);
            if (prevFirstIndex - viewerChildFirstIndex < 5 && prevFirstIndex - viewerChildFirstIndex > 0) {
              if (!isPending) {
                // console.log(`上方剩餘數量少於 5 張卡片，call api 獲取從索引第 ${viewerChildFirstIndex - 1} 到第 ${viewerChildFirstIndex - 21} 張`);
                setIsPending(true);
                getNewDetailData('up');
              }
            }
          }
        }
        return inViewChildren;
      });
    }
  };

  const renderCardArea = (card) => {
    const { cardName, cardAccount, cardBalance } = card;
    return (
      <DebitCard
        cardName={cardName}
        account={cardAccount}
        balance={cardBalance}
      />
    );
  };

  const renderSearchBarText = (date) => (
    <div className="searchCondition">
      <p>{`${dateFormatter(new Date(date[0]))} ~ ${dateFormatter(new Date(date[1]))}`}</p>
      <FEIBIconButton
        $fontSize={2}
        $iconColor={theme.colors.primary.light}
        onClick={handleClickClearCondition}
      >
        <CancelRounded />
      </FEIBIconButton>
    </div>
  );

  const renderSearchBarArea = () => (
    <div className="searchBar">
      <FEIBIconButton $fontSize={2.8} onClick={handleClickSearchButton}>
        <SearchRounded />
      </FEIBIconButton>
      {/* { (dateRange.length > 0 || displayKeywords.length > 0) && renderSearchBarText(dateRange, displayKeywords) } */}
      { (dateRange.length > 0) && renderSearchBarText(dateRange) }
      <FEIBIconButton $fontSize={2.8} className="customPosition" onClick={() => setOpenDownloadDrawer(true)}>
        <GetAppRounded />
      </FEIBIconButton>
    </div>
  );

  // 捲動時 tabs 切換
  const renderTabs = () => (
    <div className="tabsArea">
      <FEIBTabContext value={tabId}>
        <FEIBTabList onChange={handleChangeTabList} $size="small" className="tabList">
          {/* <FEIBTab label="12月" value="detailList12" href="#detailList12" onClick={() => handleClickMonthTabs('month12')} /> */}
          <FEIBTab label="12月" value="12" href="#12" onClick={handleClickMonthTabs} />
          <FEIBTab label="11月" value="11" href="#11" onClick={handleClickMonthTabs} />
          <FEIBTab label="10月" value="10" href="#10" onClick={handleClickMonthTabs} />
          <FEIBTab label="09月" value="09" href="#09" onClick={handleClickMonthTabs} />
          <FEIBTab label="08月" value="08" href="#08" onClick={handleClickMonthTabs} />
          <FEIBTab label="07月" value="07" href="#07" onClick={handleClickMonthTabs} />
          <FEIBTab label="06月" value="06" href="#06" onClick={handleClickMonthTabs} />
          <FEIBTab label="05月" value="05" href="#05" onClick={handleClickMonthTabs} />
          <FEIBTab label="04月" value="04" href="#04" onClick={handleClickMonthTabs} />
          <FEIBTab label="03月" value="03" href="#03" onClick={handleClickMonthTabs} />
        </FEIBTabList>
      </FEIBTabContext>
    </div>
  );

  // eslint-disable-next-line no-unused-vars
  const renderDetailCardList = (list) => (
    list.map((card) => (
      <VisibilitySensor
        key={card.id}
        onChange={visibilitySensorOnChange}
        containment={transactionDetailRef.current}
      >
        {({ isVisible }) => (
          <DetailCard
            id={card.date.substr(0, 2)}
            index={card.index}
            inView={isVisible ? 'y' : 'n'}
            avatar={card.avatar}
            title={card.title}
            type={card.type}
            date={card.date}
            sender={card.sender}
            amount={card.amount}
            balance={card.balance}
            noShadow
            onClick={() => setOpenDetailDialog(true)}
          />
        )}
      </VisibilitySensor>
    ))
  );

  // 舊方法 -> 暫不刪除
  // const renderDetailCardList = (list) => (
  //   Object.keys(list).map((month) => (
  //     <section key={month} id={month}>
  //       { list[month].map((card) => (
  //         <DetailCard
  //           id={card.date.substr(0, 2)}
  //           key={card.id}
  //           avatar={card.avatar}
  //           title={card.title}
  //           type={card.type}
  //           date={card.date}
  //           sender={card.sender}
  //           amount={card.amount}
  //           balance={card.balance}
  //           noShadow
  //           onClick={() => setOpenDetailDialog(true)}
  //         />
  //       )) }
  //     </section>
  //   ))
  // );

  const renderSearchDrawer = (element) => (
    <BottomDrawer
      title="明細搜尋"
      titleColor={theme.colors.primary.dark}
      className="debitInquirySearchDrawer"
      isOpen={openInquiryDrawer}
      onClose={() => dispatch(setOpenInquiryDrawer(false))}
      content={element}
    />
  );

  const renderDownloadDrawer = () => (
    <BottomDrawer
      className="debitInquiryDownloadDrawer"
      isOpen={openDownloadDrawer}
      onClose={() => setOpenDownloadDrawer(false)}
      content={(
        <ul>
          <li onClick={() => handleClickDownloadDetails('pdf')}><p>下載 PDF</p></li>
          <li onClick={() => handleClickDownloadDetails('excel')}><p>下載 EXCEL</p></li>
        </ul>
      )}
    />
  );

  // TODO: 交易明細內容傳值
  const renderDetailDialog = () => (
    <Dialog
      isOpen={openDetailDialog}
      onClose={() => setOpenDetailDialog(false)}
      content={<p>交易明細內容</p>}
      action={<FEIBButton onClick={() => setOpenDetailDialog(false)}>確定</FEIBButton>}
    />
  );

  const init = async () => {
    // 清空查詢條件
    dispatch(setDateRange([]));
    dispatch(setCustomKeyword(''));
    dispatch(setKeywords(initKeywords));
    // dispatch(setDisplayKeywords([]));

    // 取得所有存款卡的初始資料
    const response = await doGetInitData('/api/depositInquiry');
    if (response.initData) {
      setTabId(response.initData[0].id.substr(0, 2));
      dispatch(setDetailList(response.initData));
    }
  };

  useEffect(init, [transactionDetailRef]);
  useCheckLocation();
  usePageInfo('/api/depositInquiry');

  return (
    <DepositInquiryWrapper small>
      { cardInfo && renderCardArea(cardInfo) }
      <div className="inquiryArea measuredHeight">
        { renderSearchBarArea() }
        { tabId && renderTabs() }
        <div className="transactionDetail" ref={transactionDetailRef}>
          { detailList && renderDetailCardList(detailList) }
        </div>
      </div>
      { renderDetailDialog() }
      { renderDownloadDrawer() }
      { renderSearchDrawer(<DepositSearchCondition initKeywords={initKeywords} />) }
    </DepositInquiryWrapper>
  );
};

export default DepositInquiry;
