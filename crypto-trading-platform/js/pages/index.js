import { wsManager } from '../core/websocket.js';
import { Utils } from '../core/utils.js';

export function init() {
  // 初始化热门币种表格
  initTopCoinsTable();
  
  // 设置主题切换按钮
  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
}

function initTopCoinsTable() {
  const tableBody = document.getElementById('top-coins-body');
  
  // 只显示前5个币种
  const topCoins = CONFIG.SYMBOLS.slice(0, 5);
  
  topCoins.forEach((coin) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <img src="img/coins/${coin.logo}" alt="${coin.symbol}" width="20">
        <span>${coin.name}</span>
        <small class="text-muted">${coin.symbol}</small>
      </td>
      <td id="home-price-${coin.symbol}">--</td>
      <td id="home-change-${coin.symbol}">--</td>
      <td id="home-volume-${coin.symbol}">--</td>
      <td>
        <a href="trade.html?symbol=${coin.symbol}" class="btn btn-sm btn-primary">交易</a>
      </td>
    `;
    
    tableBody.appendChild(row);
    
    // 订阅该币种的数据
    wsManager.subscribe(`${coin.symbol.toLowerCase()}usdt`, `home-price-${coin.symbol}`, 
      (data) => `$${Utils.formatPrice(data.c)}`);
      
    wsManager.subscribe(`${coin.symbol.toLowerCase()}usdt`, `home-change-${coin.symbol}`, 
      (data) => Utils.formatChange(data.P));
      
    wsManager.subscribe(`${coin.symbol.toLowerCase()}usdt`, `home-volume-${coin.symbol}`, 
      (data) => Utils.formatVolume(data.v));
  });
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}
