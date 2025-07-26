let chart = null;
let candleSeries = null;

// 初始化图表
function initChart() {
    chart = LightweightCharts.createChart(document.getElementById('kline-chart'), {
        layout: {
            background: { color: '#131a2d' },
            textColor: '#eaecef',
        },
        grid: {
            vertLines: { color: '#252f48' },
            horzLines: { color: '#252f48' },
        },
        timeScale: {
            timeVisible: true,
            secondsVisible: false,
            borderColor: '#252f48',
        },
        crosshair: {
            mode: LightweightCharts.CrosshairMode.Normal,
        },
    });

    candleSeries = chart.addCandlestickSeries({
        upColor: '#16c784',
        downColor: '#ea3943',
        borderDownColor: '#ea3943',
        borderUpColor: '#16c784',
        wickDownColor: '#ea3943',
        wickUpColor: '#16c784',
    });
}

// 更新图表数据
function updateChart(symbol) {
    // 模拟根据symbol获取不同的K线数据
    const basePrice = marketData.find(item => item.symbol.startsWith(symbol))?.price || 50000;
    const now = Math.floor(Date.now() / 1000);
    let data = [];
    let price = basePrice;
    
    for (let i = 100; i >= 0; i--) {
        const time = now - i * 900; // 15分钟间隔
        const open = price;
        const close = price + (Math.random() - 0.5) * basePrice * 0.01;
        data.push({
            time,
            open,
            high: Math.max(open, close) + Math.random() * basePrice * 0.005,
            low: Math.min(open, close) - Math.random() * basePrice * 0.005,
            close
        });
        price = close;
    }
    
    candleSeries.setData(data);
    
    // 模拟实时更新
    if (window.updateInterval) clearInterval(window.updateInterval);
    window.updateInterval = setInterval(() => {
        const lastCandle = data[data.length - 1];
        const newTime = lastCandle.time + 900;
        const newClose = lastCandle.close + (Math.random() - 0.5) * basePrice * 0.002;
        
        const newCandle = {
            time: newTime,
            open: lastCandle.close,
            high: Math.max(lastCandle.close, newClose) + Math.random() * basePrice * 0.001,
            low: Math.min(lastCandle.close, newClose) - Math.random() * basePrice * 0.001,
            close: newClose
        };
        
        data.push(newCandle);
        if (data.length > 200) data.shift();
        
        candleSeries.update(newCandle);
    }, 15000);
}

// 时间周期切换
document.querySelectorAll('.time-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // 实际应用中这里应该重新获取对应周期的K线数据
        console.log(`切换到 ${this.dataset.tf} 周期`);
    });
});

// 初始化图表
initChart();
