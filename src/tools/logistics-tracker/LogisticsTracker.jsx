import { useState } from 'react'
import { ExternalLink, Package, Truck, Search, Maximize2, Minimize2, Globe } from 'lucide-react'
import ToolCard from '../../components/ToolCard'

const logisticsServices = [
  {
    id: '17track',
    name: '17TRACK',
    description: '全球180+快递公司',
    color: 'orange',
    logo: '17',
    website: 'https://www.17track.net',
    type: 'input',
    url: (nums) => `https://www.17track.net/zh-cn?nums=${encodeURIComponent(nums)}`
  },
  {
    id: 'tyht56',
    name: '天纵物流 (TYHT56)',
    description: '跨境物流查询',
    color: 'blue',
    logo: 'TY',
    website: 'https://track.tyht56.com',
    type: 'iframe',
    src: 'https://track.tyht56.com/#/?section=home'
  },
  {
    id: 'jimiex',
    name: '吉米 (JIMIEX)',
    description: '物流查询系统',
    color: 'green',
    logo: 'JM',
    website: 'http://jimiex.nextsls.com/tms/wos/home',
    type: 'iframe',
    src: 'http://jimiex.nextsls.com/tms/wos/home'
  },
  {
    id: 'mancxp',
    name: '迈创 (MANCXP)',
    description: '物流查询系统',
    color: 'purple',
    logo: 'MC',
    website: 'http://mancxp.nextsls.com/tms/wos/home',
    type: 'iframe',
    src: 'http://mancxp.nextsls.com/tms/wos/home'
  },
  {
    id: 'diyash',
    name: '迪亚士 (DIYASH)',
    description: '物流查询系统',
    color: 'red',
    logo: 'DY',
    website: 'http://diyash.nextsls.com/tms/wos/home',
    type: 'iframe',
    src: 'http://diyash.nextsls.com/tms/wos/home'
  },
]

const colorClasses = {
  orange: {
    bg: 'bg-orange-50',
    bgDark: 'bg-orange-100',
    text: 'text-orange-500',
    border: 'border-orange-200',
    button: 'bg-orange-500 hover:bg-orange-600',
    ring: 'focus:border-orange-500 focus:ring-orange-200'
  },
  blue: {
    bg: 'bg-blue-50',
    bgDark: 'bg-blue-100',
    text: 'text-blue-500',
    border: 'border-blue-200',
    button: 'bg-blue-500 hover:bg-blue-600',
    ring: 'focus:border-blue-500 focus:ring-blue-200'
  },
  green: {
    bg: 'bg-green-50',
    bgDark: 'bg-green-100',
    text: 'text-green-500',
    border: 'border-green-200',
    button: 'bg-green-500 hover:bg-green-600',
    ring: 'focus:border-green-500 focus:ring-green-200'
  },
  purple: {
    bg: 'bg-purple-50',
    bgDark: 'bg-purple-100',
    text: 'text-purple-500',
    border: 'border-purple-200',
    button: 'bg-purple-500 hover:bg-purple-600',
    ring: 'focus:border-purple-500 focus:ring-purple-200'
  },
  red: {
    bg: 'bg-red-50',
    bgDark: 'bg-red-100',
    text: 'text-red-500',
    border: 'border-red-200',
    button: 'bg-red-500 hover:bg-red-600',
    ring: 'focus:border-red-500 focus:ring-red-200'
  },
}

export default function LogisticsTracker() {
  const [trackingInputs, setTrackingInputs] = useState({})
  const [fullscreenId, setFullscreenId] = useState(null)

  const handleSubmit = (e, service) => {
    e.preventDefault()
    if (!trackingInputs[service.id]?.trim()) return
    const url = service.url(trackingInputs[service.id])
    window.open(url, '_blank')
  }

  const toggleFullscreen = (id) => {
    setFullscreenId(fullscreenId === id ? null : id)
  }

  const handleInputChange = (id, value) => {
    setTrackingInputs(prev => ({ ...prev, [id]: value }))
  }

  return (
    <ToolCard title="物流查询">
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {logisticsServices.map((service) => {
            const colors = colorClasses[service.color]
            return (
              <div key={service.id} className={`flex items-center gap-2 p-3 ${colors.bg} rounded-lg`}>
                <div className={`w-10 h-10 ${colors.bgDark} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <span className={`text-xs font-bold ${colors.text}`}>{service.logo}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-800 text-sm truncate">{service.name}</h3>
                  <p className="text-xs text-gray-500 truncate">{service.description}</p>
                </div>
                <a 
                  href={service.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`${colors.text} hover:opacity-70`}
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )
          })}
        </div>

        {logisticsServices.filter(s => s.type === 'input').map((service) => {
          const colors = colorClasses[service.color]
          return (
            <div key={service.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-700">{service.name}</h3>
              </div>
              <div className={`border-2 ${colors.border} rounded-lg p-4`}>
                <form onSubmit={(e) => handleSubmit(e, service)} className="flex gap-3">
                  <input
                    type="text"
                    value={trackingInputs[service.id] || ''}
                    onChange={(e) => handleInputChange(service.id, e.target.value)}
                    placeholder="请输入运单号，支持多个单号用英文逗号分隔"
                    className={`flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:${colors.ring} focus:ring-2 transition-all text-gray-700`}
                  />
                  <button
                    type="submit"
                    disabled={!trackingInputs[service.id]?.trim()}
                    className={`flex items-center gap-2 px-6 py-3 ${colors.button} text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <Search className="w-5 h-5" />
                    查询
                  </button>
                </form>
              </div>
            </div>
          )
        })}

        {logisticsServices.filter(s => s.type === 'iframe').map((service) => {
          const colors = colorClasses[service.color]
          const isFullscreen = fullscreenId === service.id
          return (
            <div key={service.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-700">{service.name}</h3>
                <button
                  onClick={() => toggleFullscreen(service.id)}
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
              <div className={`border-2 ${colors.border} rounded-lg overflow-hidden transition-all ${isFullscreen ? 'fixed inset-0 z-50 bg-white' : ''}`}>
                <iframe 
                  src={service.src} 
                  className={`w-full bg-white border-0 transition-all ${isFullscreen ? 'h-screen' : 'h-[500px]'}`}
                  title={service.name}
                  allowFullScreen
                />
              </div>
            </div>
          )
        })}

        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-2">使用说明</h4>
          <ul className="text-sm text-gray-500 space-y-1">
            <li>• 17TRACK 支持全球180+快递公司，输入运单号后点击查询将在新窗口打开结果</li>
            <li>• 其他物流系统已直接嵌入页面，可直接使用其查询功能</li>
            <li>• 如需更好的查询体验，可点击右上角图标在新窗口打开官网</li>
            <li>• 吉米、迈创、迪亚士为内部物流系统，需要账号登录后使用</li>
          </ul>
        </div>
      </div>
    </ToolCard>
  )
}