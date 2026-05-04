import { useState } from 'react'
import { Copy, Trash2 } from 'lucide-react'
import ToolCard from '../../components/ToolCard'
import Toast from '../../components/Toast'
import useClipboard from '../../hooks/useClipboard'
import { currencies, exchangeRates, getAllConversions } from './exchangeData'

export default function CurrencyConverter() {
  const [inputValue, setInputValue] = useState('1')
  const [inputCurrency, setInputCurrency] = useState('CNY')
  const { copy, toast, clearToast } = useClipboard()

  const results = getAllConversions(inputValue, inputCurrency, exchangeRates)

  const handleInputChange = (currency, value) => {
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setInputValue(value)
      setInputCurrency(currency)
    }
  }

  const handleClear = () => {
    setInputValue('')
  }

  const copyAllResults = () => {
    const text = Object.entries(results)
      .filter(([_, value]) => value)
      .map(([key, value]) => `${currencies[key].flag} ${currencies[key].name} (${key}) = ${currencies[key].symbol}${value}`)
      .join('\n')
    copy(text)
  }

  return (
    <>
      <ToolCard title="汇率转换器">
        <div className="space-y-4">
          <div className="text-xs text-gray-400 text-right">
            基准汇率更新时间: {new Date(exchangeRates.lastUpdated).toLocaleDateString()}
          </div>

          <div className="space-y-3">
            {Object.entries(currencies).map(([key, { name, symbol, flag }]) => (
              <div
                key={key}
                className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="text-3xl">{flag}</div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">{name}</div>
                  <div className="text-sm text-gray-500">{key}</div>
                </div>
                {key !== inputCurrency && exchangeRates.rates[key] && (
                  <div className="text-sm text-primary">
                    汇率: {(exchangeRates.rates[key] / exchangeRates.rates[inputCurrency]).toFixed(4)}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">{symbol}</span>
                  <input
                    type="text"
                    value={key === inputCurrency ? inputValue : (results[key] || '')}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    className={`w-40 px-3 py-2 text-right text-lg border-b-2 rounded-t transition-all ${
                      key === inputCurrency
                        ? 'border-primary bg-white focus:border-primary focus:ring-0'
                        : 'border-transparent bg-transparent focus:border-primary focus:ring-0'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>

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
      {toast && <Toast {...toast} onClose={clearToast} />}
    </>
  )
}