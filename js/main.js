
// 模拟市场数据
const marketData = [
    { symbol: 'BTC/USDT', price: 62345.78, change: 2.34, volume: 28456, high: 63500, low: 61000 },
    { symbol: 'ETH/USDT', price: 3421.56, change: -1.02, volume: 189456, high: 3500, low: 3400 },
    { symbol: 'SOL/USDT', price: 145.89, change: 5.67, volume: 2345678, high: 150, low: 140 },
    { symbol: 'BNB/USDT', price: 580.34, change: 0.89, volume: 345678, high: 590, low: 575 },
    { symbol: 'XRP/USDT', price: 0.5234, change: -3.45, volume: 45678901, high: 0.53, low: 0.52 },
    { symbol: 'ADA/USDT', price: 0.4567, change: 1.23, volume: 56789012, high: 0.46, low: 0.45 },
    { symbol: 'DOGE/USDT', price: 0.1234, change: -2.34, volume: 67890123, high: 0.125, low: 0.122 },
    { symbol: 'DOT/USDT', price: 6.789, change: 0.56, volume: 7890123, high: 6.8, low: 6.7 }
];

// 初始化市场表格
function initMarketTable() {
    const tbody = document.getElementById('market-data');
    tbody.innerHTML = '';
    
    marketData.forEach(item => {
        const row = document.createElement('tr');
        row.dataset.symbol = item.symbol.split('/')[0];
        row.innerHTML = `
            <td><strong>${item.symbol}</strong></td>
            <td>${item.price.toLocaleString()}</td>
            <td class="${item.change >= 0 ? 'price-up' : 'price-down'}">
                ${item.change >= 0 ? '+' : ''}${item.change.toFixed(2)}%
            </td>
            <td>${item.volume.toLocaleString()}</td>
        `;
        tbody.appendChild(row);
        
        // 点击行事件
        row.addEventListener('click', function() {
            const symbol = this.dataset.symbol;
            document.getElementById('current-symbol').textContent = `${symbol}/USDT`;
            document.getElementById('ob-symbol').textContent = `${symbol}/USDT`;
            document.getElementById('mid-price').textContent = `$${item.price.toFixed(2)}`;
            
            // 更新当前价格显示
            const priceElement = document.getElementById('current-price');
            priceElement.textContent = `$${item.price.toLocaleString()}`;
            priceElement.className = item.change >= 0 ? 'price-up' : 'price-down';
            
            // 这里应该调用更新K线图和订单簿的函数
            updateChart(symbol);
            updateOrderBook(symbol);
        });
    });
}

// 更新订单簿数据
function updateOrderBook(symbol) {
    const basePrice = marketData.find(item => item.symbol.startsWith(symbol))?.price || 50000;
    
    // 清空现有数据
    document.querySelectorAll('#ask-table tbody, #bid-table tbody').forEach(tbody => {
        tbody.innerHTML = '';
    });
    
    // 生成卖盘数据
    let askTotal = 0;
    for (let i = 0; i < 10; i++) {
        const price = basePrice * (1 + 0.001 * (i + 1));
        const amount = (Math.random() * 5).toFixed(4);
        askTotal += parseFloat(amount);
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${price.toFixed(2)}</td>
            <td>${amount}</td>
            <td>${askTotal.toFixed(4)}</td>
        `;
        document.querySelector('#ask-table tbody').appendChild(row);
    }
    
    // 生成买盘数据
    let bidTotal = 0;
    for (let i = 0; i < 10; i++) {
        const price = basePrice * (1 - 0.001 * (i + 1));
        const amount = (Math.random() * 5).toFixed(4);
        bidTotal += parseFloat(amount);
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${price.toFixed(2)}</td>
            <td>${amount}</td>
            <td>${bidTotal.toFixed(4)}</td>
        `;
        document.querySelector('#bid-table tbody').appendChild(row);
    }
}

// 更新时间显示
function updateTime() {
    document.getElementById('update-time').textContent = new Date().toLocaleTimeString();
}

// 搜索功能
document.getElementById('market-search').addEventListener('input', function(e) {
    const term = e.target.value.toLowerCase();
    document.querySelectorAll('#market-data tr').forEach(row => {
        const symbol = row.textContent.toLowerCase();
        row.style.display = symbol.includes(term) ? '' : 'none';
    });
});

// 初始化
window.addEventListener('load', function() {
    initMarketTable();
    updateOrderBook('BTC');
    updateTime();
    setInterval(updateTime, 1000);
    
    // 默认点击第一行
    document.querySelector('#market-data tr')?.click();
});
