'use client'

interface ScoreBarProps {
  score: number // 0-100
  label?: string
}

export function ScoreBar({ score, label }: ScoreBarProps) {
  // TODO: Add color gradient based on score
  // TODO: Add animation on mount
  // TODO: Add medal icons for top scores

  const getColor = (score: number) => {
    if (score >= 80) return 'bg-green-500'
    if (score >= 60) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex justify-between text-sm">
          <span>{label}</span>
          <span className="font-semibold">{score}/100</span>
        </div>
      )}
      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
        <div
          className={`h-full ${getColor(score)} transition-all duration-500`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  )
}

