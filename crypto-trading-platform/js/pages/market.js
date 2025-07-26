import { wsManager } from '../core/websocket.js';
import { Utils } from '../core/utils.js';

export function init() {
  // 初始化市场数据表格
  initMarketTable();
  
  // 设置搜索功能
  document.getElementById('market-search').addEventListener('input', (e) => {
    filterMarketTable(e.target.value);
  });
}

function initMarketTable() {
  const tableBody = document.getElementById('market-table-body');
  
  CONFIG.SYMBOLS.forEach((coin) => {
    const row = document.createElement('tr');
    row.id = `market-row-${coin.symbol}`;
    row.innerHTML = `
      <td>
        <img src="img/coins/${coin.logo}" alt="${coin.symbol}" width="20">
        <span>${coin.name}</span>
        <small class="text-muted">${coin.symbol}/USDT</small>
      </td>
      <td id="price-${coin.symbol}">--</td>
      <td id="change-${coin.symbol}">--</td>
      <td id="high-${coin.symbol}">--</td>
      <td id="low-${coin.symbol}">--</td>
      <td id="volume-${coin.symbol}">--</td>
      <td>
        <a href="trade.html?symbol=${coin.symbol}" class="btn btn-sm btn-primary">交易</a>
      </td>
    `;
    
    tableBody.appendChild(row);
    
    // 订阅该币种的数据
    wsManager.subscribe(`${coin.symbol.toLowerCase()}usdt`, `price-${coin.symbol}`, 
      (data) => `$${Utils.formatPrice(data.c)}`);
      
    wsManager.subscribe(`${coin.symbol.toLowerCase()}usdt`, `change-${coin.symbol}`, 
      (data) => Utils.formatChange(data.P));
      
    wsManager.subscribe(`${coin.symbol.toLowerCase()}usdt`, `high-${coin.symbol}`, 
      (data) => `$${Utils.formatPrice(data.h)}`);
      
    wsManager.subscribe(`${coin.symbol.toLowerCase()}usdt`, `low-${coin.symbol}`, 
      (data) => `$${Utils.formatPrice(data.l)}`);
      
    wsManager.subscribe(`${coin.symbol.toLowerCase()}usdt`, `volume-${coin.symbol}`, 
      (data) => Utils.formatVolume(data.v));
  });
}

function filterMarketTable(searchTerm) {
  const rows = document.querySelectorAll('#market-table-body tr');
  const term = searchTerm.toLowerCase();
  
  rows.forEach(row => {
    const coinName = row.querySelector('td span').textContent.toLowerCase();
    const coinSymbol = row.querySelector('td small').textContent.toLowerCase();
    
    if (coinName.includes(term) || coinSymbol.includes(term)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}
