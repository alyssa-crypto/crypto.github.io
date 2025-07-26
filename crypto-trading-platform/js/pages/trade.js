import { wsManager } from '../core/websocket.js';
import { CryptoChart } from '../core/chart.js';
import { Utils } from '../core/utils.js';

let priceChart;

export function init() {
  // 初始化图表
  priceChart = new CryptoChart('priceChart', 'BTCUSDT');
  
  // 订阅实时数据
  wsManager.subscribe('btcusdt', 'current-price', (data) => {
    const formattedPrice = `$${Utils.formatPrice(data.c)}`;
    const oldPrice = document.getElementById('current-price').textContent;
    
    document.getElementById('current-price').textContent = formattedPrice;
    document.getElementById('price-change').textContent = 
      `${Utils.formatChange(data.P)} ($${Utils.formatPrice(data.p)})`;
    
    Utils.animateValueChange(
      document.getElementById('current-price'), 
      formattedPrice, 
      oldPrice
    );
    
    priceChart.update(parseFloat(data.c));
  });
  
  // 初始化交易表单
  initTradeForms();
}

function initTradeForms() {
  // 买入表单
  document.getElementById('buyForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const amount = parseFloat(e.target.elements.amount.value);
    const price = parseFloat(e.target.elements.price.value);
    
    if (isNaN(amount) || isNaN(price)) {
      alert('请输入有效的数量和价格');
      return;
    }
    
    const total = amount * price;
    alert(`买入订单已提交: ${amount} BTC @ $${price} (总计: $${total.toFixed(2)})`);
    e.target.reset();
  });
  
  // 卖出表单
  document.getElementById('sellForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const amount = parseFloat(e.target.elements.amount.value);
    const price = parseFloat(e.target.elements.price.value);
    
    if (isNaN(amount) || isNaN(price)) {
      alert('请输入有效的数量和价格');
      return;
    }
    
    const total = amount * price;
    alert(`卖出订单已提交: ${amount} BTC @ $${price} (总计: $${total.toFixed(2)})`);
    e.target.reset();
  });
}
