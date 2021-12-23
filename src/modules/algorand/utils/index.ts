import Numeral from 'numeral'

export const formatNumber = (_volume) => {
  let volume = _volume;
  if (typeof _volume === 'string') volume = parseFloat(volume);
  if (volume >= 1e+6) return '$' + (volume / 1e+6).toFixed(2) + 'M';
  if (volume >= 1e+3) return '$' + (volume / 1e+3).toFixed(2) + 'K';
  return '$' + volume.toFixed(2);
};

export const formatPercent = (_volume) => {
  let volume = _volume;
  if (typeof _volume === 'string') volume = parseFloat(volume);
  if (volume == 0) return '-';
  return volume.toFixed(2) + '%';
};

export const toK = num => {
  return Numeral(num).format('0.[00]a')
}

var priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

export const formattedNum = (number, usd = false, acceptNegatives = false) => {
  if (isNaN(number) || number === '' || number === undefined) {
    return usd ? '$0' : 0
  }
  let num = parseFloat(number)

  if (num > 500000000) {
    return (usd ? '$' : '') + toK(num.toFixed(0))
  }

  if (num === 0) {
    if (usd) {
      return '$0'
    }
    return 0
  }

  if (num < 0.0001 && num > 0) {
    return usd ? '< $0.0001' : '< 0.0001'
  }

  if (num > 1000) {
    return usd
      ? '$' + Number(parseFloat(num.toString()).toFixed(0)).toLocaleString()
      : '' + Number(parseFloat(num.toString()).toFixed(0)).toLocaleString()
  }

  if (usd) {
    if (num < 0.1) {
      return '$' + Number(parseFloat(num.toString()).toFixed(4))
    } else {
      let usdString = priceFormatter.format(num)
      return '$' + usdString.slice(1, usdString.length)
    }
  }

  return Number(parseFloat(num.toString()).toFixed(5))
}
