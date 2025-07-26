const Utils = {
  formatPrice: (price, decimals = 2) => {
    return parseFloat(price).toFixed(decimals);
  },
  
  formatChange: (change, withSymbol = true) => {
    const value = parseFloat(change);
    const symbol = value >= 0 ? '+' : '';
    return `${withSymbol ? symbol : ''}${value.toFixed(2)}%`;
  },
  
  formatVolume: (volume) => {
    if (volume >= 1000000000) {
      return `$${(volume / 1000000000).toFixed(2)}B`;
    }
    if (volume >= 1000000) {
      return `$${(volume / 1000000).toFixed(2)}M`;
    }
    if (volume >= 1000) {
      return `$${(volume / 1000).toFixed(2)}K`;
    }
    return `$${volume}`;
  },
  
  animateValueChange: (element, newValue, oldValue) => {
    if (!element || newValue === oldValue) return;
    
    const isIncrease = parseFloat(newValue) > parseFloat(oldValue);
    element.classList.add(isIncrease ? 'price-up' : 'price-down');
    
    setTimeout(() => {
      element.classList.remove('price-up', 'price-down');
    }, 1000);
  }
};
