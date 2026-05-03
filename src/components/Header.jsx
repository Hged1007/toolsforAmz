import { Scale } from 'lucide-react'

export default function Header({ activeTab, onTabChange, tabs }) {
  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-secondary">AMZ Toolbox</h1>
              <p className="text-xs text-gray-500">Amazon 运营工具箱</p>
            </div>
          </div>

          <nav className="flex gap-1 overflow-x-auto pb-1 sm:pb-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'text-primary bg-primary/10'
                    : 'text-gray-600 hover:text-primary hover:bg-gray-100'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}