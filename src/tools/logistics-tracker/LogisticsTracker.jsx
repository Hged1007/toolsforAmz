import { useState } from 'react'
import { Search, ExternalLink, Package } from 'lucide-react'
import ToolCard from '../../components/ToolCard'

export default function LogisticsTracker() {
  const [trackingNumbers, setTrackingNumbers] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!trackingNumbers.trim()) return
    
    const numbers = trackingNumbers
      .split('\n')
      .map(n => n.trim())
      .filter(n => n.length > 0)
      .slice(0, 40)
    
    if (numbers.length === 0) return
    
    const url = `https://www.17track.net/zh-cn?nums=${encodeURIComponent(numbers.join(','))}`
    window.open(url, '_blank')
  }

  const handleClear = () => {
    setTrackingNumbers('')
  }

  const count = trackingNumbers
    .split('\n')
    .map(n => n.trim())
    .filter(n => n.length > 0).length

  return (
    <ToolCard title="物流查询">
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
            <Package className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <h3 className="font-medium text-gray-800">17TRACK 物流查询</h3>
            <p className="text-sm text-gray-500">支持全球180+快递公司的物流追踪</p>
          </div>
          <a 
            href="https://www.17track.net" 
            target="_blank" 
            rel="noopener noreferrer"
            className="ml-auto flex items-center gap-1 text-sm text-primary hover:text-primary/80"
          >
            前往官网 <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="flex items-center justify-between text-sm">
              <span className="text-gray-600">运单号</span>
              <span className="text-xs text-gray-400">已输入 {count} 个单号（最多40个）</span>
            </label>
            <textarea
              value={trackingNumbers}
              onChange={(e) => setTrackingNumbers(e.target.value)}
              placeholder="请输入运单号，每行一个"
              className="w-full h-40 p-4 border border-gray-200 rounded-lg resize-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-gray-700"
              maxLength={2000}
            />
            <p className="text-xs text-gray-400">
              每行输入一个单号，最多允许提交40个单号，支持自动识别快递公司
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={count === 0}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Search className="w-5 h-5" />
              查询物流
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="px-6 py-3 text-gray-600 bg-gray-100 font-medium rounded-lg hover:bg-gray-200 transition-all"
            >
              清空
            </button>
          </div>
        </form>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-2">支持的快递公司</h4>
          <div className="flex flex-wrap gap-2">
            {['DHL', 'UPS', 'FedEx', 'TNT', 'EMS', '顺丰', '圆通', '中通', '申通', '韵达', '京东物流', '亚马逊物流'].map((company) => (
              <span 
                key={company}
                className="px-3 py-1 text-xs bg-white border border-gray-200 rounded-full text-gray-600"
              >
                {company}
              </span>
            ))}
            <span className="px-3 py-1 text-xs text-gray-400">+ 更多</span>
          </div>
        </div>
      </div>
    </ToolCard>
  )
}