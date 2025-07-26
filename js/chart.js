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
            high: Math.max(open
