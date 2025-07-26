document.addEventListener('DOMContentLoaded', () => {
  // 初始化页面模块
  const page = document.body.dataset.page;
  
  switch(page) {
    case 'index':
      import('./pages/index.js').then(module => module.init());
      break;
    case 'market':
      import('./pages/market.js').then(module => module.init());
      break;
    case 'trade':
      import('./pages/trade.js').then(module => module.init());
      break;
    case 'wallet':
      import('./pages/wallet.js').then(module => module.init());
      break;
    default:
      import('./pages/index.js').then(module => module.init());
  }
  
  // 初始化主题
  const savedTheme = localStorage.getItem('theme') || CONFIG.DEFAULTS.THEME;
  document.documentElement.setAttribute('data-theme', savedTheme);
});
