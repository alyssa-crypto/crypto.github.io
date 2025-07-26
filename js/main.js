// 初始化函数
document.addEventListener('DOMContentLoaded', function() {
    // 主题切换
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });

    // 初始化主题
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';

    // 加载市场数据
    loadMarketData();
    
    // 初始化图表
    initChart();
    
    // 更新时间显示
    updateTime();
    setInterval(updateTime, 1000);
});

// 加载市场数据
function loadMarketData() {
    const tbody = document.getElementById('market-data');
    tbody.innerHTML = '';
    
    // 使用模拟数据
    marketData.forEach(coin => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${coin.rank}</td>
            <td>
                <div class="coin-info">
                    <img src="${coin.icon}" alt="${coin.name}" width="20" height="20">
                    <span class="coin-name">${coin.name}</span>
                    <span class="coin-symbol">${coin.symbol}</span>
                </div>
            </td>
            <td class="price ${coin.change >= 0 ? 'up' : 'down'}">$${coin.price.toLocaleString()}</td>
            <td class="${coin.change >= 0 ? 'up' : 'down'}">${coin.change >= 0 ? '+' : ''}${coin.change.toFixed(2)}%</td>
            <td>$${(coin.volume / 1000000).toFixed(1)}M</td>
            <td>$${(coin.marketCap / 1000000000).toFixed(2)}B</td>
            <td>
                <button class="star-btn" data-id="${coin.id}">
                    <i class="far fa-star"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    // 绑定收藏按钮事件
    document.querySelectorAll('.star-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.querySelector('i').classList.toggle('far');
            this.querySelector('i').classList.toggle('fas');
        });
    });
    
    // 绑定搜索功能
    document.getElementById('search-coins').addEventListener('input', function(e) {
        const term = e.target.value.toLowerCase();
        document.querySelectorAll('#market-data tr').forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(term) ? '' : 'none';
        });
    });
}

// 初始化图表
function initChart() {
    const chart = LightweightCharts.createChart(document.getElementById('trading-chart'), {
        layout: {
            background: { color: 'transparent' },
            textColor: getComputedStyle(document.documentElement).getPropertyValue('--text-primary'),
        },
        grid: {
            vertLines: { color: getComputedStyle(document.documentElement).getPropertyValue('--border-color') },
            horzLines: { color: getComputedStyle(document.documentElement).getPropertyValue('--border-color') },
        },
        timeScale: {
            timeVisible: true,
            secondsVisible: false,
        },
    });

    const candleSeries = chart.addCandlestickSeries({
        upColor: '#16c784',
        downColor: '#ea3943',
        borderDownColor: '#ea3943',
        borderUpColor: '#16c784',
        wickDownColor: '#ea3943',
        wickUpColor: '#16c784',
    });

    // 加载K线数据
    loadChartData(candleSeries);
    
    // 绑定时间帧切换
    document.querySelectorAll('.timeframe-tabs button').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.timeframe-tabs button').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            loadChartData(candleSeries, this.dataset.tf);
        });
    });
}

// 加载图表数据
function loadChartData(series, timeframe = '15m') {
    // 这里应该根据timeframe获取不同的数据
    // 使用模拟数据
    const now = Math.floor(Date.now() / 1000);
    let data = [];
    let price = 62000;
    
    for (let i = 100; i >= 0; i--) {
        const time = now - i * 900; // 15分钟间隔
        const open = price;
        const close = price + (Math.random() - 0.5) * 1000;
        data.push({
            time,
            open,
            high: Math.max(open, close) + Math.random() * 500,
            low: Math.min(open, close) - Math.random() * 500,
            close
        });
        price = close;
    }
    
    series.setData(data);
}

// 更新时间显示
function updateTime() {
    document.getElementById('update-time').textContent = new Date().toLocaleString();
}

// 模拟数据
const marketData = [
    {
        id: 'bitcoin',
        rank: 1,
        name: 'Bitcoin',
        symbol: 'BTC',
        icon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
        price: 62345.78,
        change: 2.34,
        volume: 2845678901,
        marketCap: 1210567890123
    },
    // 更多币种数据...
];
