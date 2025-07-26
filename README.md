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
