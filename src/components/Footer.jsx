import { Package } from 'lucide-react'
import toolsConfig from '../config/tools.json'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border mt-12">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-secondary mb-4">即将推出</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {toolsConfig.comingSoon.map((tool) => (
              <div
                key={tool.nameEn}
                className="p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300 opacity-60"
              >
                <Package className="w-6 h-6 text-gray-400 mb-2" />
                <h4 className="text-sm font-medium text-gray-500">{tool.name}</h4>
                <p className="text-xs text-gray-400 mt-1">{tool.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center text-sm text-gray-400">
          <p>AMZ Toolbox - Amazon 运营工具箱</p>
          <p className="mt-1">提高运营效率，从这里开始</p>
        </div>
      </div>
    </footer>
  )
}