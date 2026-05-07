import { useState } from 'react'
import { Calculator, Copy, Trash2, ArrowUpDown, Info } from 'lucide-react'
import ToolCard from '../../components/ToolCard'
import Toast from '../../components/Toast'
import useClipboard from '../../hooks/useClipboard'

const COMMISSION_RATE = 0.15

export default function ProfitCalculator() {
  const [formData, setFormData] = useState({
    country: 'uk',
    productName: '',
    asin: '',
    sku: '',
    costRMB: '',
    sellingPriceGBP: '',
    adFee: '',
    fbaFee: '',
    weight: '',
    shippingFee: '',
    returnFee: '',
    vatRate: 0.17,
    exchangeRate: 9.1,
  })
  
  const [results, setResults] = useState(null)
  const [history, setHistory] = useState([])
  const { copy, toast, clearToast } = useClipboard()

  const calculateCostGBP = () => {
    const costRMB = parseFloat(formData.costRMB) || 0
    const rate = parseFloat(formData.exchangeRate) || 1
    return (costRMB / rate).toFixed(2)
  }

  const calculateCommission = () => {
    const price = parseFloat(formData.sellingPriceGBP) || 0
    return (price * COMMISSION_RATE).toFixed(2)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const calculateProfit = () => {
    const {
      sellingPriceGBP,
      adFee,
      fbaFee,
      shippingFee,
      returnFee,
      vatRate,
      exchangeRate
    } = formData

    const costGBP = parseFloat(calculateCostGBP()) || 0
    const price = parseFloat(sellingPriceGBP) || 0
    const ads = parseFloat(adFee) || 0
    const fba = parseFloat(fbaFee) || 0
    const platform = parseFloat(calculateCommission()) || 0
    const shipping = parseFloat(shippingFee) || 0
    const returns = parseFloat(returnFee) || 0
    const vat = price * vatRate

    const totalCosts = costGBP + ads + fba + platform + shipping + returns + vat
    const profit = price - totalCosts
    const profitMargin = price > 0 ? (profit / price) * 100 : 0
    const profitRMB = profit * exchangeRate
    const costRMB = parseFloat(formData.costRMB) || 0
    const shippingRMB = shipping * exchangeRate

    const result = {
      costGBP: costGBP.toFixed(2),
      costRMB: costRMB.toFixed(2),
      sellingPriceGBP: price.toFixed(2),
      ads: ads.toFixed(2),
      fba: fba.toFixed(2),
      platform: platform.toFixed(2),
      shipping: shipping.toFixed(2),
      shippingRMB: shippingRMB.toFixed(2),
      returns: returns.toFixed(2),
      vat: vat.toFixed(2),
      totalCosts: totalCosts.toFixed(2),
      profit: profit.toFixed(2),
      profitMargin: profitMargin.toFixed(1),
      profitRMB: profitRMB.toFixed(2),
      vatRate: (VAT_RATE * 100).toFixed(0),
      exchangeRate: exchangeRate.toFixed(2)
    }

    setResults(result)
    
    setHistory(prev => [{
      ...result,
      productName: formData.productName || '未命名产品',
      asin: formData.asin,
      sku: formData.sku,
      timestamp: new Date().toLocaleString()
    }, ...prev].slice(0, 10))
  }

  const handleCopyResults = () => {
    if (!results) return
    const text = `产品信息：
国家：英国
产品名称：${formData.productName || '-'}
ASIN：${formData.asin || '-'}
SKU：${formData.sku || '-'}

成本明细（英镑）：
产品成本：£${results.costGBP} (¥${results.costRMB})
站内广告费：£${results.ads}
FBA配送费：£${results.fba}
平台佣金：£${results.platform} (15%)
头程费用：£${results.shipping} (¥${results.shippingRMB})
退货费用：£${results.returns}
VAT (${results.vatRate}%)：£${results.vat}
总成本：£${results.totalCosts}

销售价格：£${results.sellingPriceGBP}
利润：£${results.profit} (¥${results.profitRMB})
利润率：${results.profitMargin}%`
    
    copy(text)
  }

  const handleClear = () => {
    setFormData({
      country: 'uk',
      productName: '',
      asin: '',
      sku: '',
      costRMB: '',
      sellingPriceGBP: '',
      adFee: '',
      fbaFee: '',
      weight: '',
      shippingFee: '',
      returnFee: '',
      exchangeRate: 9.1,
    })
    setResults(null)
  }

  const removeFromHistory = (index) => {
    setHistory(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <ToolCard title="利润计算器">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              基本信息
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">国家/站点</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary/20"
                >
                  <option value="uk">英国 (GBP)</option>
                  <option value="de">德国 (EUR)</option>
                  <option value="us">美国 (USD)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">汇率 (GBP/RMB)</label>
                <input
                  type="number"
                  name="exchangeRate"
                  value={formData.exchangeRate}
                  onChange={handleInputChange}
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              placeholder="产品名称"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary/20"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="asin"
                value={formData.asin}
                onChange={handleInputChange}
                placeholder="ASIN"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleInputChange}
                placeholder="SKU"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4" />
              成本与定价
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">产品成本 (RMB)</label>
                <input
                  type="number"
                  name="costRMB"
                  value={formData.costRMB}
                  onChange={handleInputChange}
                  step="0.01"
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">产品成本 (GBP) <span className="text-gray-400">(自动计算)</span></label>
                <input
                  type="text"
                  value={`£${calculateCostGBP()}`}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">销售单价 (GBP)</label>
              <input
                type="number"
                name="sellingPriceGBP"
                value={formData.sellingPriceGBP}
                onChange={handleInputChange}
                step="0.01"
                placeholder="0.00"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">产品重量 (Kg)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                step="0.01"
                placeholder="0.00"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">站内广告费 (GBP)</label>
            <input
              type="number"
              name="adFee"
              value={formData.adFee}
              onChange={handleInputChange}
              step="0.01"
              placeholder="0.00"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">FBA配送费 (GBP)</label>
            <input
              type="number"
              name="fbaFee"
              value={formData.fbaFee}
              onChange={handleInputChange}
              step="0.01"
              placeholder="0.00"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">平台佣金 (GBP) <span className="text-gray-400">(售价15%)</span></label>
            <input
              type="text"
              value={`£${calculateCommission()}`}
              readOnly
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-700"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">头程费用 (GBP)</label>
            <input
              type="number"
              name="shippingFee"
              value={formData.shippingFee}
              onChange={handleInputChange}
              step="0.01"
              placeholder="0.00"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">退货费用 (GBP)</label>
            <input
              type="number"
              name="returnFee"
              value={formData.returnFee}
              onChange={handleInputChange}
              step="0.01"
              placeholder="0.00"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">VAT税率 (%)</label>
            <input
              type="number"
              name="vatRate"
              value={(formData.vatRate * 100).toFixed(1)}
              onChange={(e) => setFormData(prev => ({ ...prev, vatRate: parseFloat(e.target.value) / 100 || 0 }))}
              step="0.1"
              placeholder="17.0"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="md:col-span-2"></div>
        </div>

        <div className="flex items-start gap-4 p-3 bg-blue-50 rounded-lg">
          <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-blue-700 space-y-1">
            <p><strong>自动计算规则：</strong></p>
            <p>- GBP成本 = RMB成本 ÷ 汇率</p>
            <p>- 平台佣金 = 销售单价 × 15%</p>
            <p>- VAT税率可自行调整（默认17%）</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={calculateProfit}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-all"
          >
            <Calculator className="w-5 h-5" />
            计算利润
          </button>
          <button
            onClick={handleClear}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-600 font-medium rounded-lg hover:bg-gray-200 transition-all"
          >
            <Trash2 className="w-5 h-5" />
            清空
          </button>
        </div>

        {results && (
          <div className="border-2 border-orange-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-700">计算结果</h3>
              <button
                onClick={handleCopyResults}
                className="flex items-center gap-1 text-sm text-primary hover:underline"
              >
                <Copy className="w-4 h-4" />
                复制结果
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <div className="text-xs text-gray-500 mb-1">利润 (GBP)</div>
                <div className={`text-xl font-bold ${parseFloat(results.profit) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  £{results.profit}
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <div className="text-xs text-gray-500 mb-1">利润 (RMB)</div>
                <div className={`text-xl font-bold ${parseFloat(results.profitRMB) >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                  ¥{results.profitRMB}
                </div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg text-center">
                <div className="text-xs text-gray-500 mb-1">利润率</div>
                <div className={`text-xl font-bold ${parseFloat(results.profitMargin) >= 0 ? 'text-purple-600' : 'text-red-600'}`}>
                  {results.profitMargin}%
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <div className="text-xs text-gray-500 mb-1">销售单价</div>
                <div className="text-xl font-bold text-gray-700">£{results.sellingPriceGBP}</div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-3 text-gray-500 font-medium">费用项目</th>
                    <th className="text-right py-2 px-3 text-gray-500 font-medium">金额 (GBP)</th>
                    <th className="text-right py-2 px-3 text-gray-500 font-medium">金额 (RMB)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-3">产品成本</td>
                    <td className="text-right py-2 px-3">£{results.costGBP}</td>
                    <td className="text-right py-2 px-3">¥{results.costRMB}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-3">站内广告费</td>
                    <td className="text-right py-2 px-3">£{results.ads}</td>
                    <td className="text-right py-2 px-3">-</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-3">FBA配送费</td>
                    <td className="text-right py-2 px-3">£{results.fba}</td>
                    <td className="text-right py-2 px-3">-</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-3">平台佣金 (15%)</td>
                    <td className="text-right py-2 px-3">£{results.platform}</td>
                    <td className="text-right py-2 px-3">-</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-3">头程费用</td>
                    <td className="text-right py-2 px-3">£{results.shipping}</td>
                    <td className="text-right py-2 px-3">¥{results.shippingRMB}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-3">退货费用</td>
                    <td className="text-right py-2 px-3">£{results.returns}</td>
                    <td className="text-right py-2 px-3">-</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-3">VAT ({results.vatRate}%)</td>
                    <td className="text-right py-2 px-3">£{results.vat}</td>
                    <td className="text-right py-2 px-3">-</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-2 px-3 font-medium">总成本</td>
                    <td className="text-right py-2 px-3 font-medium">£{results.totalCosts}</td>
                    <td className="text-right py-2 px-3 font-medium">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {history.length > 0 && (
          <div className="border-2 border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">计算历史</h3>
            <div className="space-y-2">
              {history.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="text-sm font-medium text-gray-800">{item.productName}</div>
                      {item.asin && <div className="text-xs text-gray-500">{item.asin}</div>}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-bold ${parseFloat(item.profit) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      £{item.profit}
                    </div>
                    <div className="text-xs text-gray-500">{item.profitMargin}%</div>
                  </div>
                  <button
                    onClick={() => removeFromHistory(index)}
                    className="ml-4 text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {toast && <Toast {...toast} onClose={clearToast} />}
    </ToolCard>
  )
}