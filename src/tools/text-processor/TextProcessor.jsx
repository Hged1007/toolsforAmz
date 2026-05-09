import { useState } from 'react'
import { Copy, Trash2, Scissors } from 'lucide-react'
import ToolCard from '../../components/ToolCard'
import Toast from '../../components/Toast'
import useClipboard from '../../hooks/useClipboard'

const minorWords = new Set(['a', 'an', 'the', 'and', 'but', 'or', 'for', 'nor', 'on', 'at', 'to', 'by', 'in', 'of', 'up', 'as', 'so', 'yet', 'off', 'if', 'per', 'via', 'out'])

const operations = [
  {
    id: 'uppercase',
    label: '全大写',
    hint: 'AB',
    handler: (text) => text.toUpperCase(),
    description: '所有字母转为大写'
  },
  {
    id: 'lowercase',
    label: '全小写',
    hint: 'ab',
    handler: (text) => text.toLowerCase(),
    description: '所有字母转为小写'
  },
  {
    id: 'capitalize',
    label: '首字母大写',
    hint: 'Aa Bb',
    handler: (text) => text.replace(/\b\w/g, (c) => c.toUpperCase()),
    description: '每个单词首字母大写'
  },
  {
    id: 'uncapitalize',
    label: '首字母小写',
    hint: 'aA bB',
    handler: (text) => text.replace(/\b\w/g, (c) => c.toLowerCase()),
    description: '每个单词首字母小写'
  },
  {
    id: 'sentence',
    label: '句子首字母大写',
    hint: 'Aa bb',
    handler: (text) => {
      return text.replace(/(^|[.!?]\s+)([a-z])/g, (_, prefix, letter) => prefix + letter.toUpperCase())
    },
    description: '句子首字母大写'
  },
  {
    id: 'title',
    label: '标题大小写',
    hint: 'Title Case',
    handler: (text) => {
      const words = text.split(/\s+/)
      return words.map((word, index) => {
        const lower = word.toLowerCase()
        const isFirstOrLast = index === 0 || index === words.length - 1
        if (isFirstOrLast || !minorWords.has(lower)) {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        }
        return word.toLowerCase()
      }).join(' ')
    },
    description: 'APA标题格式'
  },
]

const formatOperations = [
  {
    id: 'spaceToUnderscore',
    label: '空格→下划线',
    handler: (text) => text.replace(/\s+/g, '_')
  },
  {
    id: 'spaceUnderscoreToCamel',
    label: '下划线&空格→驼峰',
    handler: (text) => text.replace(/[_\s]+(\w)/g, (_, c) => c.toUpperCase()).replace(/^[a-z]/, (c) => c.toLowerCase())
  },
  {
    id: 'camelToUnderscore',
    label: '驼峰→下划线',
    handler: (text) => text.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase()
  },
  {
    id: 'camelToSpace',
    label: '驼峰→空格',
    handler: (text) => text.replace(/([a-z])([A-Z])/g, '$1 $2')
  },
  {
    id: 'spaceToDash',
    label: '空格→中横线',
    handler: (text) => text.replace(/\s+/g, '-')
  },
  {
    id: 'underscoreToDash',
    label: '下划线→中横线',
    handler: (text) => text.replace(/_/g, '-')
  },
  {
    id: 'dashToUnderscore',
    label: '中横线→下划线',
    handler: (text) => text.replace(/-/g, '_')
  },
  {
    id: 'underscoreToSpace',
    label: '下划线→空格',
    handler: (text) => text.replace(/_/g, ' ')
  },
  {
    id: 'underscoreToDot',
    label: '下划线→小数点',
    handler: (text) => text.replace(/_/g, '.')
  },
  {
    id: 'dotToUnderscore',
    label: '小数点→下划线',
    handler: (text) => text.replace(/\./g, '_')
  },
  {
    id: 'spaceToNewline',
    label: '空格→换行',
    handler: (text) => text.replace(/\s+/g, '\n')
  },
  {
    id: 'newlineToSpace',
    label: '换行→空格',
    handler: (text) => text.replace(/\r?\n/g, ' ')
  },
  {
    id: 'removeSymbols',
    label: '清除符号',
    handler: (text) => text.replace(/[^\w\s]/g, '')
  },
  {
    id: 'removeSpaces',
    label: '清除空格',
    handler: (text) => text.replace(/\s+/g, '')
  },
  {
    id: 'removeNewlines',
    label: '清除换行',
    handler: (text) => text.replace(/\r?\n/g, '')
  },
  {
    id: 'spaceToComma',
    label: '空格→逗号',
    handler: (text) => text.replace(/\s+/g, ',')
  },
]

export default function TextProcessor() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [copied, setCopied] = useState(false)
  const { copy, toast, clearToast } = useClipboard()

  const charCount = inputText.length
  const maxChars = 5000

  const handleTransform = (handler) => {
    setOutputText(handler(inputText))
    setCopied(false)
  }

  const handleCopy = async () => {
    if (outputText) {
      await copy(outputText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleCut = async () => {
    if (inputText) {
      await copy(inputText)
      setInputText('')
      setOutputText('')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleClear = () => {
    setInputText('')
    setOutputText('')
    setCopied(false)
  }

  return (
    <>
      <ToolCard title="文字处理工具">
        <div className="space-y-4">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value.slice(0, maxChars))}
            placeholder="请把你需要转换的内容粘贴在这里"
            className="w-full h-48 p-4 border border-gray-200 rounded-lg resize-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-gray-700 bg-gray-50"
          />
          
          <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
            <span>{charCount} / {maxChars}</span>
            {copied && <span className="text-green-600">已复制！</span>}
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {operations.map((op) => (
              <button
                key={op.id}
                onClick={() => handleTransform(op.handler)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200"
                title={op.description}
              >
                {op.label} {op.hint}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {formatOperations.map((op) => (
              <button
                key={op.id}
                onClick={() => handleTransform(op.handler)}
                className="px-3 py-2 text-sm font-medium text-gray-700 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200"
              >
                {op.label}
              </button>
            ))}
          </div>

          <div className="p-4 bg-gray-100 rounded-lg">
            <textarea
              value={outputText}
              readOnly
              placeholder="转换结果将显示在这里..."
              className="w-full h-32 p-3 border border-gray-200 rounded-lg resize-none bg-white"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              disabled={!outputText}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Copy className="w-4 h-4" />
              复制
            </button>
            <button
              onClick={handleCut}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all"
            >
              <Scissors className="w-4 h-4" />
              剪切
            </button>
            <button
              onClick={handleClear}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all"
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