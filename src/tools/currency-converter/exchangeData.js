export const currencies = {
  CNY: { name: '人民币', symbol: '¥', flag: '🇨🇳' },
  USD: { name: '美元', symbol: '$', flag: '🇺🇸' },
  EUR: { name: '欧元', symbol: '€', flag: '🇪🇺' },
  GBP: { name: '英镑', symbol: '£', flag: '🇬🇧' },
  JPY: { name: '日元', symbol: '¥', flag: '🇯🇵' },
  HKD: { name: '港币', symbol: 'HK$', flag: '🇭🇰' },
  AUD: { name: '澳元', symbol: 'A$', flag: '🇦🇺' },
  CAD: { name: '加元', symbol: 'C$', flag: '🇨🇦' },
  SGD: { name: '新加坡元', symbol: 'S$', flag: '🇸🇬' },
  CHF: { name: '瑞士法郎', symbol: 'Fr', flag: '🇨🇭' },
  SEK: { name: '瑞典克朗', symbol: 'kr', flag: '🇸🇪' },
  MXN: { name: '墨西哥比索', symbol: '$', flag: '🇲🇽' },
}

export const exchangeRates = {
  base: 'CNY',
  rates: {
    CNY: 1,
    USD: 0.14,
    EUR: 0.13,
    GBP: 0.11,
    JPY: 21,
    HKD: 1.10,
    AUD: 0.21,
    CAD: 0.19,
    SGD: 0.19,
    CHF: 0.13,
    SEK: 1.5,
    MXN: 2.3,
  },
  lastUpdated: new Date().toISOString(),
}

export const convertCurrency = (value, from, to, rates) => {
  if (!value || isNaN(value)) return ''
  const fromRate = rates.rates[from] || 1
  const toRate = rates.rates[to] || 1
  const result = (parseFloat(value) / fromRate) * toRate
  
  if (result === 0) return '0'
  if (Math.abs(result) < 0.0001 || Math.abs(result) > 999999) {
    return result.toExponential(4)
  }
  return result.toFixed(4).replace(/\.?0+$/, '')
}

export const getAllConversions = (value, from, rates) => {
  if (!value || isNaN(value)) return {}
  const result = {}
  Object.keys(rates.rates).forEach((key) => {
    result[key] = convertCurrency(value, from, key, rates)
  })
  return result
}