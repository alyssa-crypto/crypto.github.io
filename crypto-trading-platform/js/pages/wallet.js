import { Utils } from '../core/utils.js';

export function init() {
  // 初始化钱包数据
  initWalletData();
  
  // 设置充值/提现按钮
  document.querySelectorAll('.deposit-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const coin = e.target.dataset.coin;
      alert(`准备充值 ${coin}，此功能仅为演示`);
    });
  });
  
  document.querySelectorAll('.withdraw-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const coin = e.target.dataset.coin;
      alert(`准备提现 ${coin}，此功能仅为演示`);
    });
  });
}

function initWalletData() {
  // 模拟钱包数据
  const walletData = {
    USDT: { balance: 5000.00, locked: 0.00 },
    BTC: { balance: 0.1234, locked: 0.0000 },
    ETH: { balance: 1.2345, locked: 0.0000 }
  };
  
  // 计算总资产
  let totalValue = 0;
  
  // 更新资产表格
  const tableBody = document.getElementById('wallet-assets-body');
  tableBody.innerHTML = '';
  
  Object.entries(walletData).forEach(([coin, data]) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <img src="img/coins/${coin.toLowerCase()}.png" alt="${coin}" width="20">
        <span>${coin}</span>
      </td>
      <td>${Utils.formatPrice(data.balance, coin === 'USDT' ? 2 : 6)}</td>
      <td>${Utils.formatPrice(data.locked, coin === 'USDT' ? 2 : 6)}</td>
      <td>
        <button class="btn btn-sm btn-outline-primary deposit-btn" data-coin="${coin}">充值</button>
        <button class="btn btn-sm btn-outline-secondary withdraw-btn" data-coin="${coin}">提现</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
  
  // 更新总资产显示
  document.getElementById('total-value').textContent = 
    `$${Utils.formatPrice(totalValue)}`;
}
