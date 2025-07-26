const CONFIG = {
  // 支持的交易对
  SYMBOLS: [
    { name: '比特币', symbol: 'BTC', logo: 'btc.png' },
    { name: '以太坊', symbol: 'ETH', logo: 'eth.png' },
    { name: '泰达币', symbol: 'USDT', logo: 'usdt.png' },
    { name: '币安币', symbol: 'BNB', logo: 'bnb.png' },
    { name: '瑞波币', symbol: 'XRP', logo: 'xrp.png' },
    { name: '索拉纳', symbol: 'SOL', logo: 'sol.png' },
    { name: '卡尔达诺', symbol: 'ADA', logo: 'ada.png' },
    { name: '狗狗币', symbol: 'DOGE', logo: 'doge.png' }
  ],
  
  // WebSocket配置
  WS: {
    BASE_URL: 'wss://stream.binance.com:9443/ws',
    RECONNECT_DELAY: 3000,
    MAX_RECONNECT_ATTEMPTS: 5
  },
  
  // 默认设置
  DEFAULTS: {
    THEME: 'light',
    LANGUAGE: 'zh-CN',
    DEFAULT_SYMBOL: 'BTCUSDT'
  }
};
