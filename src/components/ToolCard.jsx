export default function ToolCard({ title, children, className = '' }) {
  return (
    <div className={`bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-shadow duration-200 ${className}`}>
      <div className="h-1 bg-primary" />
      <div className="p-6">
        <h2 className="text-lg font-semibold text-secondary mb-4">{title}</h2>
        {children}
      </div>
    </div>
  )
}