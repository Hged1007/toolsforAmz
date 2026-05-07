import { useState } from 'react'
import { ExternalLink, Package, Truck, Search, Maximize2, Minimize2 } from 'lucide-react'
import ToolCard from '../../components/ToolCard'

export default function LogisticsTracker() {
  const [track17Number, setTrack17Number] = useState('')
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handle17TrackSubmit = (e) => {
    e.preventDefault()
    if (!track17Number.trim()) return
    const url = `https://www.17track.net/zh-cn?nums=${encodeURIComponent(track17Number)}`
    window.open(url, '_blank')
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <ToolCard title="物流查询">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Package className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">17TRACK</h3>
              <p className="text-sm text-gray-500">全球180+快递公司</p>
            </div>
            <a 
              href="https://www.17track.net" 
              target="_blank" 
              rel="noopener noreferrer"
              className="ml-auto flex items-center gap-1 text-sm text-primary"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Truck className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">天纵物流 (TYHT56)</h3>
              <p className="text-sm text-gray-500">跨境物流查询</p>
            </div>
            <a 
              href="https://track.tyht56.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="ml-auto flex items-center gap-1 text-sm text-primary"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-700">17TRACK 全球物流查询</h3>
            <a 
              href="https://www.17track.net/zh-cn" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline"
            >
              前往官网
            </a>
          </div>
          <div className="border-2 border-orange-200 rounded-lg p-4">
            <form onSubmit={handle17TrackSubmit} className="flex gap-3">
              <input
                type="text"
                value={track17Number}
                onChange={(e) => setTrack17Number(e.target.value)}
                placeholder="请输入运单号，支持多个单号用英文逗号分隔"
                className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all text-gray-700"
              />
              <button
                type="submit"
                disabled={!track17Number.trim()}
                className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Search className="w-5 h-5" />
                查询
              </button>
            </form>
            <p className="text-xs text-gray-400 mt-2">
              支持 DHL、UPS、FedEx、TNT、EMS、顺丰、圆通、中通、申通、韵达等全球180+快递公司
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-700">天纵物流 (TYHT56) 查询</h3>
            <button
              onClick={toggleFullscreen}
              className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-800"
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-3 h-3" />
                  退出全屏
                </>
              ) : (
                <>
                  <Maximize2 className="w-3 h-3" />
                  全屏查看
                </>
              )}
            </button>
          </div>
          <div className={`border-2 border-blue-200 rounded-lg overflow-hidden transition-all ${isFullscreen ? 'fixed inset-0 z-50 bg-white' : ''}`}>
            <iframe 
              src="https://track.tyht56.com/#/?section=home" 
              className={`w-full bg-white border-0 transition-all ${isFullscreen ? 'h-screen' : 'h-[500px]'}`}
              title="TYHT56 物流查询"
              allowFullScreen
            />
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-2">使用说明</h4>
          <ul className="text-sm text-gray-500 space-y-1">
            <li>• 在 17TRACK 输入框中输入运单号，点击查询将在新窗口打开结果</li>
            <li>• 天纵物流 (TYHT56) 已直接嵌入页面，可直接使用其查询功能</li>
            <li>• 如需更好的查询体验，可点击右上角图标在新窗口打开官网</li>
          </ul>
        </div>
      </div>
    </ToolCard>
  )
}