class CryptoWebSocket {
  constructor() {
    this.connections = new Map();
    this.subscriptions = new Map();
    this.reconnectAttempts = new Map();
  }

  connect(symbol, callback) {
    const normalizedSymbol = symbol.toLowerCase();
    
    // 如果已有连接，直接返回
    if (this.connections.has(normalizedSymbol)) {
      return;
    }

    const wsUrl = `${CONFIG.WS.BASE_URL}/${normalizedSymbol}@ticker`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log(`WebSocket连接已建立: ${normalizedSymbol}`);
      this.reconnectAttempts.set(normalizedSymbol, 0);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      callback(data);
    };

    ws.onclose = () => {
      console.log(`WebSocket连接断开: ${normalizedSymbol}`);
      this.handleReconnect(normalizedSymbol, callback);
    };

    ws.onerror = (error) => {
      console.error(`WebSocket错误: ${normalizedSymbol}`, error);
    };

    this.connections.set(normalizedSymbol, ws);
  }

  handleReconnect(symbol, callback) {
    const attempts = this.reconnectAttempts.get(symbol) || 0;
    
    if (attempts >= CONFIG.WS.MAX_RECONNECT_ATTEMPTS) {
      console.error(`达到最大重连次数: ${symbol}`);
      return;
    }

    this.reconnectAttempts.set(symbol, attempts + 1);
    
    setTimeout(() => {
      console.log(`尝试重新连接(${attempts + 1}): ${symbol}`);
      this.connect(symbol, callback);
    }, CONFIG.WS.RECONNECT_DELAY);
  }

  subscribe(symbol, elementId, formatter = (val) => val) {
    const subscription = {
      symbol: symbol.toLowerCase(),
      elementId,
      formatter
    };

    this.subscriptions.set(elementId, subscription);
    
    this.connect(subscription.symbol, (data) => {
      const element = document.getElementById(elementId);
      if (element) {
        element.textContent = formatter(data);
      }
    });
  }
}

const wsManager = new CryptoWebSocket();
