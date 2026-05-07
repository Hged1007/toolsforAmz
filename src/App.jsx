import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import UnitConverter from './tools/unit-converter/UnitConverter'
import CurrencyConverter from './tools/currency-converter/CurrencyConverter'
import LogisticsTracker from './tools/logistics-tracker/LogisticsTracker'
import TextProcessor from './tools/text-processor/TextProcessor'
import ProfitCalculator from './tools/profit-calculator/ProfitCalculator'
import toolsConfig from './config/tools.json'

const toolComponents = {
  'unit-converter': UnitConverter,
  'currency-converter': CurrencyConverter,
  'logistics-tracker': LogisticsTracker,
  'text-processor': TextProcessor,
  'profit-calculator': ProfitCalculator,
}

const tabs = toolsConfig.tools.filter((tool) => tool.enabled)

export default function App() {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || 'unit-converter')

  const ActiveTool = toolComponents[activeTab]

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={tabs}
      />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8">
        {ActiveTool && <ActiveTool />}
      </main>

      <Footer />
    </div>
  )
}