class CryptoChart {
  constructor(canvasId, symbol = 'BTCUSDT') {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.symbol = symbol;
    this.chart = null;
    this.data = {
      labels: [],
      datasets: [{
        label: `${symbol} 价格`,
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 1,
        tension: 0.1
      }]
    };
    
    this.init();
  }

  init() {
    this.chart = new Chart(this.ctx, {
      type: 'line',
      data: this.data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: false
          }
        },
        animation: {
          duration: 0
        }
      }
    });
  }

  update(price) {
    const now = new Date();
    const timeLabel = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    
    // 限制数据点数量
    if (this.data.labels.length > 50) {
      this.data.labels.shift();
      this.data.datasets[0].data.shift();
    }
    
    this.data.labels.push(timeLabel);
    this.data.datasets[0].data.push(price);
    
    this.chart.update();
  }
}
