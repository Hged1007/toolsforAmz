# AMZ Toolbox - Amazon 运营工具箱

## 1. Concept & Vision

AMZ Toolbox 是一款专为亚马逊运营人员设计的效率工具网站，提供单位换算、翻译助手、文字处理三大核心功能。整体风格干净专业，以 Amazon 品牌橙色 (#FF9900) 作为强调色，界面如同专业工具般简洁高效，让运营人员能够在 1-2 步内完成常用操作。

## 2. Design Language

### 2.1 Aesthetic Direction
商务工具型风格，借鉴 Amazon 后台管理界面的简洁感，采用白色背景搭配浅灰卡片，圆角设计营造现代感。

### 2.2 Color Palette
| 用途 | 颜色 | Hex |
|------|------|-----|
| Primary (强调色) | Amazon Orange | #FF9900 |
| Primary Hover | Deep Orange | #E68A00 |
| Secondary | Dark Blue | #232F3E |
| Background | Light Gray | #F5F5F5 |
| Card Background | White | #FFFFFF |
| Text Primary | Dark Gray | #333333 |
| Text Secondary | Medium Gray | #666666 |
| Border | Light Border | #E0E0E0 |
| Success | Green | #28A745 |
| Error | Red | #DC3545 |

### 2.3 Typography
- **主字体**: Inter (Google Fonts), -apple-system, BlinkMacSystemFont, sans-serif
- **标题字号**: 24px (h1), 20px (h2), 16px (h3)
- **正文字号**: 14px
- **行高**: 1.5

### 2.4 Spatial System
- 基础间距单位: 8px
- 卡片内边距: 24px
- 卡片间距: 16px
- 圆角: 12px (卡片), 8px (按钮/输入框)

### 2.5 Motion Philosophy
- 过渡时长: 200ms ease
- 悬停效果: 轻微上浮 (translateY -2px) + 阴影加深
- 按钮点击: scale(0.98)
- 复制成功提示: fade in/out 2秒

### 2.6 Visual Assets
- **图标库**: Lucide React (轻量、现代)
- **装饰元素**: 工具卡片顶部使用左侧橙色条带作为品牌标识

## 3. Layout & Structure

### 3.1 Page Structure
```
┌─────────────────────────────────────────────────┐
│  Header (Logo + 工具导航标签)                      │
├─────────────────────────────────────────────────┤
│                                                 │
│  Main Content Area                              │
│  ┌─────────────────────────────────────────┐    │
│  │  工具卡片 (根据选中标签显示对应工具)           │    │
│  │  - 单位换算器 / 翻译助手 / 文字处理器         │    │
│  └─────────────────────────────────────────┘    │
│                                                 │
│  即将推出 (预留扩展位)                            │
│                                                 │
├─────────────────────────────────────────────────┤
│  Footer (简洁版权信息)                           │
└─────────────────────────────────────────────────┘
```

### 3.2 Responsive Strategy
- **桌面端 (>1024px)**: 工具卡片最大宽度 800px，居中显示
- **平板端 (768-1024px)**: 卡片宽度 90%
- **移动端 (<768px)**: 单列布局，全宽卡片，按钮堆叠排列

### 3.3 Navigation
- 顶部横向标签导航 (Tabs)
- 当前选中标签下方有橙色下划线指示
- 移动端可横向滚动

## 4. Features & Interactions

### 4.1 单位换算器 (Unit Converter)

#### 功能描述
支持长度和重量单位的实时换算，纯前端计算。

#### 换算类别
| 类别 | 支持单位 | 换算公式 |
|------|----------|----------|
| 长度 | mm, cm, m, in, ft | 基准: 米 |
| 重量 | g, kg, lb, oz | 基准: 克 |

#### 交互流程
1. 用户在左侧输入框输入数值
2. 选择"从"单位 (源单位)
3. 选择"到"单位 (目标单位)
4. 实时显示换算结果 (保留两位小数)
5. 点击复制按钮，结果复制到剪贴板
6. 显示"已复制"Toast提示，2秒后消失

#### 详细交互
- **输入验证**: 仅允许数字和一个小数点
- **交换功能**: 点击交换按钮可调换源单位和目标单位
- **清空**: 点击清空按钮重置输入和输出

### 4.2 翻译助手 (Translator)

#### 功能描述
调用 Google Translate API 实现多语言文本翻译。

#### 语言支持
- 源语言: 简体中文、English、Deutsch、Español、Français、日语 (自动检测)
- 目标语言: English、Deutsch、Español、Français、Italiano、日语

#### 交互流程
1. 选择源语言 (或选择自动检测)
2. 选择目标语言
3. 在文本框输入要翻译的内容 (最多 5000 字符)
4. 点击"翻译"按钮或自动触发
5. 显示翻译结果
6. 提供"复制结果"和"清空"按钮

#### 特殊交互
- **交换语言**: 点击交换按钮调换源语言和目标语言
- **字符计数**: 实时显示已输入字符数
- **加载状态**: 翻译时显示加载动画
- **错误处理**: API 不可用时显示友好提示

### 4.3 文字处理器 (Text Processor)

#### 功能描述
对多行文本进行大小写转换和格式调整。

#### 支持操作
| 操作 | 快捷键 | 说明 |
|------|--------|------|
| 全大写 | UPPERCASE | 所有字母转为大写 |
| 全小写 | lowercase | 所有字母转为小写 |
| 首字母大写 | Capitalize | 每个单词首字母大写 |
| 句子大小写 | Sentence | 仅首字母大写 |
| 切换大小写 | tOgGlE | 反转原有大小写 |

#### 交互流程
1. 在左侧文本框输入或粘贴文本
2. 点击操作按钮
3. 结果实时显示在右侧文本框
4. 点击复制按钮复制结果

#### 详细交互
- **实时预览**: 按钮悬停时可预览转换效果
- **同步滚动**: 左右文本框同步滚动
- **快捷按钮**: 常用操作 (全大写/全小写) 突出显示

### 4.4 即将推出 (Coming Soon)
- 底部预留扩展位，展示未来工具预告
- 显示"敬请期待"占位卡片

## 5. Component Inventory

### 5.1 Header
- **外观**: 白色背景，底部 1px 边框
- **内容**: Logo 文字 + 导航标签
- **状态**: 固定顶部 (可选)

### 5.2 ToolCard
- **外观**: 白色卡片，圆角 12px，阴影 (0 2px 8px rgba(0,0,0,0.08))
- **内容**: 标题 + 工具内容区
- **状态**: 默认、悬停 (阴影加深)

### 5.3 Tab Navigation
- **外观**: 水平标签排列
- **状态**:
  - 默认: 灰色文字
  - 选中: Amazon Orange 文字 + 橙色下划线
  - 悬停: 橙色文字

### 5.4 Input / Textarea
- **外观**: 白色背景，灰色边框，圆角 8px
- **尺寸**: 高度 40px (输入框)，最小高度 120px (文本框)
- **状态**:
  - 默认: #E0E0E0 边框
  - 聚焦: #FF9900 边框
  - 禁用: #F5F5F5 背景

### 5.5 Button
- **Primary**: Amazon Orange 背景，白色文字
- **Secondary**: 白色背景，灰色边框
- **状态**:
  - 默认: 标准样式
  - 悬停: 上浮 + 阴影加深
  - 点击: scale(0.98)
  - 禁用: #CCCCCC 背景，不可点击
  - 加载: 显示 spinner

### 5.6 Select Dropdown
- **外观**: 与 Input 样式一致
- **状态**: 同 Input

### 5.7 Toast Notification
- **外观**: 固定显示在页面底部中央
- **类型**: 成功 (绿色)、错误 (红色)、信息 (灰色)
- **动画**: fade in，2秒后 fade out

### 5.8 Swap Button
- **外观**: 圆形按钮，两箭头图标
- **位置**: 单位选择器中间
- **交互**: 点击时旋转 180°

## 6. Technical Approach

### 6.1 Technology Stack
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: fetch (for translation API)
- **State**: React useState/useContext (no external state library needed)

### 6.2 Project Structure
```
/src
  /components
    Header.jsx
    ToolCard.jsx
    TabNav.jsx
    Toast.jsx
  /tools
    /unit-converter
      UnitConverter.jsx
      conversionData.js
    /translator
      Translator.jsx
    /text-processor
      TextProcessor.jsx
  /hooks
    useClipboard.js
  /utils
    formatters.js
  /config
    tools.json
  App.jsx
  main.jsx
  index.css
```

### 6.3 API Design (Translation)
- **端点**: Google Cloud Translation API (v2)
- **请求**: POST https://translation.googleapis.com/language/translate/v2
- **参数**: q (文本), source (源语言), target (目标语言), key (API密钥)
- **代理**: 通过后端代理转发，避免前端暴露 API 密钥

### 6.4 Data Flow
1. 用户操作 → 组件 state 更新
2. 组件计算/调用 API
3. 结果更新 UI
4. Toast 通知反馈

### 6.5 Extension Mechanism
- `tools.json` 定义工具元数据 (名称、图标、组件路径、启用状态)
- 动态导入工具组件
- 主导航根据 tools.json 自动生成
