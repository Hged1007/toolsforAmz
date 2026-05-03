import { useState, useEffect } from 'react'
import { Copy, Trash2 } from 'lucide-react'
import ToolCard from '../../components/ToolCard'
import Toast from '../../components/Toast'
import useClipboard from '../../hooks/useClipboard'
import { lengthUnits, weightUnits, batteryUnits, categories, convertToAll, convertBattery } from './conversionData'

export default function UnitConverter() {
  const [category, setCategory] = useState('length')
  const [inputValue, setInputValue] = useState('')
  const [inputUnit, setInputUnit] = useState('cm')
  const [voltage, setVoltage] = useState('3.7')
  const { copy, toast, clearToast } = useClipboard()

  const units = category === 'length' ? lengthUnits : category === 'weight' ? weightUnits : batteryUnits

  useEffect(() => {
    setInputUnit(Object.keys(units)[0])
    setInputValue('')
  }, [category, units])

  const results = category === 'battery' 
    ? convertBattery(inputValue, inputUnit, voltage)
    : convertToAll(inputValue, inputUnit, units)

  const groupedUnits = {}
  if (category !== 'battery') {
    Object.keys(categories).forEach((catKey) => {
      groupedUnits[catKey] = Object.entries(units).filter(([_, u]) => u.category === catKey)
    })
  }

  const handleInputChange = (key, value) => {
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setInputValue(value)
      setInputUnit(key)
    }
  }

  const handleClear = () => {
    setInputValue('')
  }

  const copyAllResults = () => {
    const text = Object.entries(results)
      .map(([key, value]) => `${units[key].name} = ${value}`)
      .join('\n')
    copy(text)
  }

  const handleVoltageChange = (value) => {
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setVoltage(value)
    }
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex gap-2">
          <button
            onClick={() => setCategory('length')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              category === 'length'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            长度单位换算
          </button>
          <button
            onClick={() => setCategory('weight')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              category === 'weight'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            重量单位换算
          </button>
          <button
            onClick={() => setCategory('battery')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              category === 'battery'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            电池容量换算
          </button>
        </div>

        <ToolCard title={`${category === 'length' ? '长度' : category === 'weight' ? '重量' : '电池容量'}单位换算器`}>
          <div className="space-y-4">
            {category === 'battery' && (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">电压:</span>
                <input
                  type="text"
                  value={voltage}
                  onChange={(e) => handleVoltageChange(e.target.value)}
                  placeholder="输入电压"
                  className="w-24 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <span className="text-sm text-gray-500">V (伏特)</span>
                <span className="text-xs text-gray-400 ml-auto">常用电压: 3.7V(锂电池), 12V(铅酸), 1.5V(AA电池)</span>
              </div>
            )}

            {category !== 'battery' ? (
              Object.entries(groupedUnits).map(([catKey, unitList]) => {
                if (unitList.length === 0) return null
                return (
                  <div key={catKey} className="space-y-2">
                    <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700 text-sm">{categories[catKey].name}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {unitList.map(([key, { name }]) => (
                        <div key={key} className="space-y-1">
                          <label className="text-gray-500 text-xs block">{name}</label>
                          <input
                            type="text"
                            value={key === inputUnit ? inputValue : (results[key] || '')}
                            onChange={(e) => handleInputChange(key, e.target.value)}
                            className={`w-full px-3 py-2 border rounded text-sm transition-all ${
                              key === inputUnit
                                ? 'border-primary bg-primary/5 focus:border-primary focus:ring-2 focus:ring-primary/20'
                                : 'border-gray-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20'
                            }`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(batteryUnits).map(([key, { name }]) => (
                  <div key={key} className="space-y-1">
                    <label className="text-gray-500 text-sm block">{name}</label>
                    <input
                      type="text"
                      value={key === inputUnit ? inputValue : (results[key] || '')}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                      className={`w-full px-3 py-2 border rounded text-sm transition-all ${
                        key === inputUnit
                          ? 'border-primary bg-primary/5 focus:border-primary focus:ring-2 focus:ring-primary/20'
                          : 'border-gray-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20'
                      }`}
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <button
                onClick={copyAllResults}
                disabled={!inputValue}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Copy className="w-4 h-4" />
                复制全部结果
              </button>
              <button
                onClick={handleClear}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all"
              >
                <Trash2 className="w-4 h-4" />
                清空
              </button>
            </div>
          </div>
        </ToolCard>
      </div>
      {toast && <Toast {...toast} onClose={clearToast} />}
    </>
  )
}