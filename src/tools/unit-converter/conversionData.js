export const lengthUnits = {
  // 公制
  km: { name: '千米(km)', factor: 1000, category: 'metric' },
  m: { name: '米(m)', factor: 1, category: 'metric' },
  dm: { name: '分米(dm)', factor: 0.1, category: 'metric' },
  cm: { name: '厘米(cm)', factor: 0.01, category: 'metric' },
  mm: { name: '毫米(mm)', factor: 0.001, category: 'metric' },
  um: { name: '微米(um)', factor: 0.000001, category: 'metric' },
  nm: { name: '纳米(nm)', factor: 0.000000001, category: 'metric' },
  pm: { name: '皮米(pm)', factor: 0.000000000001, category: 'metric' },
  
  // 英制
  in: { name: '英寸(in)', factor: 0.0254, category: 'imperial' },
  ft: { name: '英尺(ft)', factor: 0.3048, category: 'imperial' },
  yd: { name: '码(yd)', factor: 0.9144, category: 'imperial' },
  mi: { name: '英里(mi)', factor: 1609.344, category: 'imperial' },
  nmi: { name: '海里(nmi)', factor: 1852, category: 'imperial' },
  fm: { name: '英寻(fm)', factor: 1.8288, category: 'imperial' },
  fur: { name: '弗隆(fur)', factor: 201.168, category: 'imperial' },
  mil: { name: '密耳(mil)', factor: 0.0000254, category: 'imperial' },
  
  // 市制
  li: { name: '里', factor: 500, category: 'chinese' },
  zhang: { name: '丈', factor: 3.333, category: 'chinese' },
  chi: { name: '尺', factor: 0.333, category: 'chinese' },
  cun: { name: '寸', factor: 0.0333, category: 'chinese' },
  fen: { name: '分', factor: 0.00333, category: 'chinese' },
  li2: { name: '厘', factor: 0.000333, category: 'chinese' },
}

export const weightUnits = {
  // 公制
  t: { name: '吨(t)', factor: 1000000, category: 'metric' },
  kg: { name: '千克(kg)', factor: 1000, category: 'metric' },
  g: { name: '克(g)', factor: 1, category: 'metric' },
  mg: { name: '毫克(mg)', factor: 0.001, category: 'metric' },
  ug: { name: '微克(ug)', factor: 0.000001, category: 'metric' },
  
  // 英制
  lb: { name: '磅(lb)', factor: 453.592, category: 'imperial' },
  oz: { name: '盎司(oz)', factor: 28.3495, category: 'imperial' },
  st: { name: '英石(st)', factor: 6350.29, category: 'imperial' },
  cwt_uk: { name: '英担(cwt)', factor: 50802.345, category: 'imperial' },
  cwt_us: { name: '美担(cwt)', factor: 45359.237, category: 'imperial' },
  ton_uk: { name: '长吨(ton)', factor: 1016046.088, category: 'imperial' },
  ton_us: { name: '短吨(ton)', factor: 907184.74, category: 'imperial' },
  dr: { name: '打兰(dr)', factor: 1.7718, category: 'imperial' },
  gr: { name: '格令(gr)', factor: 0.0648, category: 'imperial' },
  
  // 市制
  dan: { name: '担', factor: 50000, category: 'chinese' },
  shijin: { name: '斤', factor: 500, category: 'chinese' },
  liang: { name: '两', factor: 50, category: 'chinese' },
  qian: { name: '钱', factor: 5, category: 'chinese' },
  
  // 金衡制
  troy_lb: { name: '金衡磅', factor: 373.242, category: 'troy' },
  troy_oz: { name: '金衡盎司', factor: 31.1035, category: 'troy' },
  dwt: { name: '英钱(dwt)', factor: 1.555, category: 'troy' },
  troy_gr: { name: '金衡格令', factor: 0.0648, category: 'troy' },
}

export const batteryUnits = {
  wh: { name: '瓦时(Wh)', category: 'battery' },
  mwh: { name: '毫瓦时(mWh)', category: 'battery' },
  mah: { name: '毫安时(mAh)', category: 'battery' },
  ah: { name: '安时(Ah)', category: 'battery' },
  kwh: { name: '千瓦时(kWh)', category: 'battery' },
}

export const categories = {
  metric: { name: '公制', color: 'blue' },
  imperial: { name: '英制', color: 'orange' },
  chinese: { name: '市制', color: 'green' },
  troy: { name: '金衡制', color: 'purple' },
  battery: { name: '电池容量', color: 'yellow' },
}

export const convertToAll = (value, baseUnit, units) => {
  if (!value || isNaN(value)) return {}
  if (!units[baseUnit]) return {}
  const baseValue = parseFloat(value) * units[baseUnit].factor
  const results = {}
  Object.keys(units).forEach((key) => {
    const result = baseValue / units[key].factor
    if (result === 0) {
      results[key] = '0'
    } else if (Math.abs(result) < 0.000001 || Math.abs(result) > 999999) {
      results[key] = result.toExponential(6)
    } else {
      results[key] = result.toFixed(8).replace(/\.?0+$/, '')
    }
  })
  return results
}

export const convertBattery = (value, baseUnit, voltage) => {
  if (!value || isNaN(value) || !voltage || isNaN(voltage)) return {}
  const v = parseFloat(voltage)
  const val = parseFloat(value)
  const results = {}
  
  if (baseUnit === 'mah') {
    const wh = (val * v) / 1000
    results.mah = val.toFixed(2).replace(/\.?0+$/, '')
    results.ah = (val / 1000).toFixed(4).replace(/\.?0+$/, '')
    results.wh = wh.toFixed(4).replace(/\.?0+$/, '')
    results.mwh = (wh * 1000).toFixed(2).replace(/\.?0+$/, '')
    results.kwh = (wh / 1000).toFixed(6).replace(/\.?0+$/, '')
  } else if (baseUnit === 'ah') {
    const wh = val * v
    results.mah = (val * 1000).toFixed(2).replace(/\.?0+$/, '')
    results.ah = val.toFixed(4).replace(/\.?0+$/, '')
    results.wh = wh.toFixed(4).replace(/\.?0+$/, '')
    results.mwh = (wh * 1000).toFixed(2).replace(/\.?0+$/, '')
    results.kwh = (wh / 1000).toFixed(6).replace(/\.?0+$/, '')
  } else if (baseUnit === 'wh') {
    results.mah = ((val * 1000) / v).toFixed(2).replace(/\.?0+$/, '')
    results.ah = (val / v).toFixed(4).replace(/\.?0+$/, '')
    results.wh = val.toFixed(4).replace(/\.?0+$/, '')
    results.mwh = (val * 1000).toFixed(2).replace(/\.?0+$/, '')
    results.kwh = (val / 1000).toFixed(6).replace(/\.?0+$/, '')
  } else if (baseUnit === 'mwh') {
    const wh = val / 1000
    results.mah = (val / v).toFixed(2).replace(/\.?0+$/, '')
    results.ah = (val / (v * 1000)).toFixed(4).replace(/\.?0+$/, '')
    results.wh = wh.toFixed(4).replace(/\.?0+$/, '')
    results.mwh = val.toFixed(2).replace(/\.?0+$/, '')
    results.kwh = (wh / 1000).toFixed(6).replace(/\.?0+$/, '')
  } else if (baseUnit === 'kwh') {
    const wh = val * 1000
    results.mah = ((val * 1000000) / v).toFixed(2).replace(/\.?0+$/, '')
    results.ah = ((val * 1000) / v).toFixed(4).replace(/\.?0+$/, '')
    results.wh = wh.toFixed(4).replace(/\.?0+$/, '')
    results.mwh = (wh * 1000).toFixed(2).replace(/\.?0+$/, '')
    results.kwh = val.toFixed(6).replace(/\.?0+$/, '')
  }
  
  return results
}