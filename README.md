# crypto.github.io
<!DOCTYPE html>
<html>
<head>
    <title>Crypto Price Tracker</title>
    <!-- 引入 CoinGecko 的免费行情小部件 -->
    <script src="https://widgets.coingecko.com/coingecko-coin-price-chart-widget.js"></script>
</head>
<body>
    <h1>实时加密货币行情</h1>
    
    <!-- 比特币价格图表 -->
    <coingecko-coin-price-chart-widget 
        coin-id="bitcoin" 
        currency="usd" 
        height="300"
        locale="zh">
    </coingecko-coin-price-chart-widget>

    <!-- 以太坊价格 -->
    <coingecko-coin-price-chart-widget 
        coin-id="ethereum" 
        currency="usd" 
        height="300"
        locale="zh">
    </coingecko-coin-price-chart-widget>
</body>
</html>

<div class="tradingview-widget-container">
    <div id="tradingview_btc"></div>
    <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
    <script>
        new TradingView.widget({
            "autosize": true,
            "symbol": "BINANCE:BTCUSDT",
            "interval": "D",
            "timezone": "Asia/Shanghai",
            "theme": "light",
            "style": "1",
            "locale": "zh_CN",
            "toolbar_bg": "#f1f3f6",
            "hide_side_toolbar": false,
            "allow_symbol_change": true
        });
    </script>
</div>
<h2>模拟交易</h2>
<div>
    <select id="coin-select">
        <option value="bitcoin">比特币 (BTC)</option>
        <option value="ethereum">以太坊 (ETH)</option>
    </select>
    <input type="number" id="amount" placeholder="数量">
    <button onclick="alert('模拟交易成功！')">买入</button>
</div>
