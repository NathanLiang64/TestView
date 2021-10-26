const mockData = {
  getForeignCurrencyAccounts: [
    {
      id: '1',
      acctBranch: '信義分行',
      acctName: '英鎊',
      acctId: '04300499312641',
      acctType: '004',
      acctBalx: 5340.56,
      ccyCd: 'GBP',
      functionList: [
        { title: '轉帳', path: '/foreignCurrencyTransfer', icon: null },
        { title: '換匯', path: '/exchange', icon: null },
      ],
      moreList: [
        { title: 'MasterCard Send Cross Border', path: '/', icon: 'temp' },
        { title: '設定為主要外幣帳戶', path: '/', icon: 'temp' },
      ],
    },
    {
      id: '2',
      acctBranch: '中山分行',
      acctName: '日幣',
      acctId: '04300490004059',
      acctType: '004',
      acctBalx: 53640.56,
      ccyCd: 'JPY',
      functionList: [
        { title: '轉帳', path: '/foreignCurrencyTransfer', icon: null },
        { title: '換匯', path: '/exchange', icon: null },
      ],
      moreList: [
        { title: 'MasterCard Send Cross Border', path: '/', icon: 'temp' },
        { title: '設定為主要外幣帳戶', path: '/', icon: 'temp' },
      ],
    },
    {
      id: '3',
      acctBranch: '松江分行',
      acctName: '歐元',
      acctId: '00100100063106',
      acctType: '004',
      acctBalx: 836.13,
      ccyCd: 'EUR',
      functionList: [
        { title: '轉帳', path: '/foreignCurrencyTransfer', icon: null },
        { title: '換匯', path: '/exchange', icon: null },
      ],
      moreList: [
        { title: 'MasterCard Send Cross Border', path: '/', icon: 'temp' },
        { title: '設定為主要外幣帳戶', path: '/', icon: 'temp' },
      ],
    },
  ],

  getTransactionDetails: {
    startIndex: 1,
    dataDirect: 0,
    minIndex: 1,
    maxIndex: 50,
    monthly: ['202103', '202104', '202105', '202106', '202107', '202108'],
    acctDetails: [
      {
        index: 1,
        bizDate: '20210809',
        txnDate: '20210808',
        txnTime: 235962,
        description: '網路連動轉入',
        targetMbrID: null,
        targetBank: '000',
        targetAcct: null,
        amount: 1,
        balance: 997,
        cdType: 'd',
        currency: 'TWD',
      },
      {
        index: 2,
        bizDate: '20210809',
        txnDate: '20210808',
        txnTime: 229742,
        description: '網路連動轉入',
        targetMbrID: null,
        targetBank: '000',
        targetAcct: null,
        amount: 1,
        balance: 996,
        cdType: 'd',
        currency: 'TWD',
      },
      {
        index: 3,
        bizDate: '20210809',
        txnDate: '20210808',
        txnTime: 214841,
        description: '網路連動轉出',
        targetMbrID: null,
        targetBank: '000',
        targetAcct: null,
        amount: 1,
        balance: 995,
        cdType: 'c',
        currency: 'TWD',
      },
      {
        index: 4,
        bizDate: '20210809',
        txnDate: '20210808',
        txnTime: 205086,
        description: '轉帳',
        targetMbrID: null,
        targetBank: '000',
        targetAcct: null,
        amount: 1,
        balance: 996,
        cdType: 'c',
        currency: 'TWD',
      },
      {
        index: 5,
        bizDate: '20210809',
        txnDate: '20210808',
        txnTime: 199048,
        description: '網路連動轉出',
        targetMbrID: null,
        targetBank: '000',
        targetAcct: null,
        amount: 1,
        balance: 997,
        cdType: 'c',
        currency: 'TWD',
      },
      {
        index: 6,
        bizDate: '20210809',
        txnDate: '20210808',
        txnTime: 185125,
        description: '轉帳',
        targetMbrID: null,
        targetBank: '000',
        targetAcct: null,
        amount: 1,
        balance: 998,
        cdType: 'd',
        currency: 'TWD',
      },
      {
        index: 7,
        bizDate: '20210809',
        txnDate: '20210808',
        txnTime: 180591,
        description: '轉帳',
        targetMbrID: null,
        targetBank: '000',
        targetAcct: null,
        amount: 1,
        balance: 997,
        cdType: 'c',
        currency: 'TWD',
      },
      {
        index: 8,
        bizDate: '20210809',
        txnDate: '20210808',
        txnTime: 169349,
        description: '轉帳',
        targetMbrID: null,
        targetBank: '000',
        targetAcct: null,
        amount: 1,
        balance: 998,
        cdType: 'd',
        currency: 'TWD',
      },
      {
        index: 9,
        bizDate: '20210809',
        txnDate: '20210808',
        txnTime: 154472,
        description: '轉帳',
        targetMbrID: null,
        targetBank: '000',
        targetAcct: null,
        amount: 1,
        balance: 997,
        cdType: 'd',
        currency: 'TWD',
      },
      {
        index: 10,
        bizDate: '20210808',
        txnDate: '20210808',
        txnTime: 146694,
        description: '網路連動轉出',
        targetMbrID: null,
        targetBank: '000',
        targetAcct: null,
        amount: 1,
        balance: 996,
        cdType: 'c',
        currency: 'TWD',
      },
      {
        index: 11,
        bizDate: '20210808',
        txnDate: '20210808',
        txnTime: 139313,
        description: '轉帳',
        targetMbrID: null,
        targetBank: '000',
        targetAcct: null,
        amount: 1,
        balance: 997,
        cdType: 'c',
        currency: 'TWD',
      },
      {
        index: 12,
        bizDate: '20210808',
        txnDate: '20210808',
        txnTime: 127999,
        description: '網路連動轉出',
        targetMbrID: null,
        targetBank: '000',
        targetAcct: null,
        amount: 1,
        balance: 998,
        cdType: 'c',
        currency: 'TWD',
      },
      {
        index: 13,
        bizDate: '20210808',
        txnDate: '20210808',
        txnTime: 118693,
        description: '網路連動轉入',
        targetMbrID: null,
        targetBank: '000',
        targetAcct: null,
        amount: 1,
        balance: 999,
        cdType: 'd',
        currency: 'TWD',
      },
      {
        index: 14,
        bizDate: '20210808',
        txnDate: '20210808',
        txnTime: 111538,
        description: '轉帳',
        targetMbrID: null,
        targetBank: '000',
        targetAcct: null,
        amount: 1,
        balance: 998,
        cdType: 'c',
        currency: 'TWD',
      },
      {
        index: 15,
        bizDate: '20210808',
        txnDate: '20210808',
        txnTime: 103638,
        description: '網路連動轉出',
        targetMbrID: null,
        targetBank: '000',
        targetAcct: null,
        amount: 1,
        balance: 999,
        cdType: 'c',
        currency: 'TWD',
      },
      {
        index: 16,
        bizDate: '20210808',
        txnDate: '20210808',
        txnTime: 93018,
        description: '轉帳',
        targetMbrID: null,
        targetBank: '000',
        targetAcct: null,
        amount: 1,
        balance: 1000,
        cdType: 'd',
        currency: 'TWD',
      },
      {
        index: 17,
        bizDate: '20210808',
        txnDate: '20210808',
        txnTime: 80639,
        description: '網路連動轉出',
        targetMbrID: null,
        targetBank: '000',
        targetAcct: null,
        amount: 1,
        balance: 999,
        cdType: 'c',
        currency: 'TWD',
      },
      {
        index: 18,
        bizDate: '20210808',
        txnDate: '20210808',
        txnTime: 76372,
        description: '轉帳',
        targetMbrID: null,
        targetBank: '000',
        targetAcct: null,
        amount: 1,
        balance: 1000,
        cdType: 'c',
        currency: 'TWD',
      },
      {
        index: 19,
        bizDate: '20210808',
        txnDate: '20210808',
        txnTime: 62015,
        description: '網路連動轉入',
        targetMbrID: null,
        targetBank: '000',
        targetAcct: null,
        amount: 1,
        balance: 1001,
        cdType: 'd',
        currency: 'TWD',
      },
      {
        index: 20,
        bizDate: '20210808',
        txnDate: '20210808',
        txnTime: 51903,
        description: '網路連動轉入',
        targetMbrID: null,
        targetBank: '000',
        targetAcct: null,
        amount: 1,
        balance: 1000,
        cdType: 'd',
        currency: 'TWD',
      },
      {
        index: 21,
        bizDate: '20210808',
        txnDate: '20210808',
        txnTime: 45515,
        description: '轉帳',
        targetMbrID: null,
        targetBank: '000',
        targetAcct: null,
        amount: 1,
        balance: 999,
        cdType: 'd',
        currency: 'TWD',
      },
      {
        index: 22,
        bizDate: '20210808',
        txnDate: '20210808',
        txnTime: 33167,
        description: '轉帳',
        targetMbrID: null,
        targetBank: '000',
        targetAcct: null,
        amount: 1,
        balance: 998,
        cdType: 'd',
        currency: 'TWD',
      },
      {
        index: 23,
        bizDate: '20210808',
        txnDate: '20210808',
        txnTime: 24281,
        description: '網路連動轉出',
        targetMbrID: null,
        targetBank: '000',
        targetAcct: null,
        amount: 1,
        balance: 997,
        cdType: 'c',
        currency: 'TWD',
      },
      {
        index: 24,
        bizDate: '20210808',
        txnDate: '20210808',
        txnTime: 10768,
        description: '轉帳',
        targetMbrID: null,
        targetBank: '000',
        targetAcct: null,
        amount: 1,
        balance: 998,
        cdType: 'd',
        currency: 'TWD',
      },
      {
        index: 25,
        bizDate: '20210808',
        txnDate: '20210808',
        txnTime: 8341,
        description: '網路連動轉入',
        targetMbrID: null,
        targetBank: '000',
        targetAcct: null,
        amount: 1,
        balance: 997,
        cdType: 'd',
        currency: 'TWD',
      },
      {
        index: 26,
        bizDate: '20210808',
        txnDate: '20210807',
        txnTime: 237984,
        description: '轉帳',
        targetMbrID: null,
        targetBank: '000',
        targetAcct: null,
        amount: 1,
        balance: 996,
        cdType: 'd',
        currency: 'TWD',
      },
      {
        index: 27,
        bizDate: '20210808',
        txnDate: '20210807',
        txnTime: 227487,
        description: '網路連動轉出',
        targetMbrID: null,
        targetBank: '000',
        targetAcct: null,
        amount: 1,
        balance: 995,
        cdType: 'c',
        currency: 'TWD',
      },
      {
        index: 28,
        bizDate: '20210808',
        txnDate: '20210807',
        txnTime: 225368,
        description: '網路連動轉入',
        targetMbrID: null,
        targetBank: '000',
        targetAcct: null,
        amount: 1,
        balance: 996,
        cdType: 'd',
        currency: 'TWD',
      },
      {
        index: 29,
        bizDate: '20210808',
        txnDate: '20210807',
        txnTime: 214933,
        description: '轉帳',
        targetMbrID: null,
        targetBank: '000',
        targetAcct: null,
        amount: 1,
        balance: 995,
        cdType: 'c',
        currency: 'TWD',
      },
      {
        index: 30,
        bizDate: '20210808',
        txnDate: '20210807',
        txnTime: 209335,
        description: '網路連動轉入',
        targetMbrID: null,
        targetBank: '000',
        targetAcct: null,
        amount: 1,
        balance: 996,
        cdType: 'd',
        currency: 'TWD',
      },
      {
        index: 31,
        bizDate: '20210808',
        txnDate: '20210807',
        txnTime: 199539,
        description: '轉帳',
        targetMbrID: null,
        targetBank: '000',
        targetAcct: null,
        amount: 1,
        balance: 995,
        cdType: 'c',
        currency: 'TWD',
      },
      {
        index: 32,
        bizDate: '20210808',
        txnDate: '20210807',
        txnTime: 192152,
        description: '網路連動轉出',
        targetMbrID: null,
        targetBank: '000',
        targetAcct: null,
        amount: 1,
        balance: 996,
        cdType: 'c',
        currency: 'TWD',
      },
      {
        index: 33,
        bizDate: '20210808',
        txnDate: '20210807',
        txnTime: 187586,
        description: '網路連動轉出',
        targetMbrID: null,
        targetBank: '000',
        targetAcct: null,
        amount: 1,
        balance: 997,
        cdType: 'c',
        currency: 'TWD',
      },
      {
        index: 34,
        bizDate: '20210808',
        txnDate: '20210807',
        txnTime: 185019,
        description: '轉帳',
        targetMbrID: null,
        targetBank: '000',
        targetAcct: null,
        amount: 1,
        balance: 998,
        cdType: 'c',
        currency: 'TWD',
      },
      {
        index: 35,
        bizDate: '20210808',
        txnDate: '20210807',
        txnTime: 172962,
        description: '轉帳',
        targetMbrID: null,
        targetBank: '000',
        targetAcct: null,
        amount: 1,
        balance: 999,
        cdType: 'c',
        currency: 'TWD',
      },
      {
        index: 36,
        bizDate: '20210808',
        txnDate: '20210807',
        txnTime: 165176,
        description: '網路連動轉出',
        targetMbrID: null,
        targetBank: '000',
        targetAcct: null,
        amount: 1,
        balance: 1000,
        cdType: 'c',
        currency: 'TWD',
      },
      {
        index: 37,
        bizDate: '20210808',
        txnDate: '20210807',
        txnTime: 158499,
        description: '轉帳',
        targetMbrID: null,
        targetBank: '000',
        targetAcct: null,
        amount: 1,
        balance: 1001,
        cdType: 'c',
        currency: 'TWD',
      },
      {
        index: 38,
        bizDate: '20210808',
        txnDate: '20210807',
        txnTime: 156873,
        description: '網路連動轉出',
        targetMbrID: null,
        targetBank: '000',
        targetAcct: null,
        amount: 1,
        balance: 1002,
        cdType: 'c',
        currency: 'TWD',
      },
      {
        index: 39,
        bizDate: '20210807',
        txnDate: '20210807',
        txnTime: 148393,
        description: '轉帳',
        targetMbrID: null,
        targetBank: '000',
        targetAcct: null,
        amount: 1,
        balance: 1003,
        cdType: 'c',
        currency: 'TWD',
      },
      {
        index: 40,
        bizDate: '20210807',
        txnDate: '20210807',
        txnTime: 140103,
        description: '網路連動轉出',
        targetMbrID: null,
        targetBank: '000',
        targetAcct: null,
        amount: 1,
        balance: 1004,
        cdType: 'c',
        currency: 'TWD',
      },
      {
        index: 41,
        bizDate: '20210807',
        txnDate: '20210807',
        txnTime: 131466,
        description: '轉帳',
        targetMbrID: null,
        targetBank: '000',
        targetAcct: null,
        amount: 1,
        balance: 1005,
        cdType: 'c',
        currency: 'TWD',
      },
      {
        index: 42,
        bizDate: '20210807',
        txnDate: '20210807',
        txnTime: 124380,
        description: '網路連動轉入',
        targetMbrID: null,
        targetBank: '000',
        targetAcct: null,
        amount: 1,
        balance: 1006,
        cdType: 'd',
        currency: 'TWD',
      },
      {
        index: 43,
        bizDate: '20210807',
        txnDate: '20210807',
        txnTime: 120991,
        description: '轉帳',
        targetMbrID: null,
        targetBank: '000',
        targetAcct: null,
        amount: 1,
        balance: 1005,
        cdType: 'd',
        currency: 'TWD',
      },
      {
        index: 44,
        bizDate: '20210807',
        txnDate: '20210807',
        txnTime: 113621,
        description: '網路連動轉入',
        targetMbrID: null,
        targetBank: '000',
        targetAcct: null,
        amount: 1,
        balance: 1004,
        cdType: 'd',
        currency: 'TWD',
      },
      {
        index: 45,
        bizDate: '20210807',
        txnDate: '20210807',
        txnTime: 109389,
        description: '轉帳',
        targetMbrID: null,
        targetBank: '000',
        targetAcct: null,
        amount: 1,
        balance: 1003,
        cdType: 'd',
        currency: 'TWD',
      },
      {
        index: 46,
        bizDate: '20210807',
        txnDate: '20210807',
        txnTime: 102256,
        description: '轉帳',
        targetMbrID: null,
        targetBank: '000',
        targetAcct: null,
        amount: 1,
        balance: 1002,
        cdType: 'd',
        currency: 'TWD',
      },
      {
        index: 47,
        bizDate: '20210807',
        txnDate: '20210807',
        txnTime: 95008,
        description: '網路連動轉出',
        targetMbrID: null,
        targetBank: '000',
        targetAcct: null,
        amount: 1,
        balance: 1001,
        cdType: 'c',
        currency: 'TWD',
      },
      {
        index: 48,
        bizDate: '20210807',
        txnDate: '20210807',
        txnTime: 84238,
        description: '網路連動轉入',
        targetMbrID: null,
        targetBank: '000',
        targetAcct: null,
        amount: 1,
        balance: 1002,
        cdType: 'd',
        currency: 'TWD',
      },
      {
        index: 49,
        bizDate: '20210807',
        txnDate: '20210807',
        txnTime: 77266,
        description: '轉帳',
        targetMbrID: null,
        targetBank: '000',
        targetAcct: null,
        amount: 1,
        balance: 1001,
        cdType: 'c',
        currency: 'TWD',
      },
      {
        index: 50,
        bizDate: '20210807',
        txnDate: '20210807',
        txnTime: 70148,
        description: '轉帳',
        targetMbrID: null,
        targetBank: '000',
        targetAcct: null,
        amount: 1,
        balance: 1002,
        cdType: 'd',
        currency: 'TWD',
      },
    ],
  },
};

export default mockData;
