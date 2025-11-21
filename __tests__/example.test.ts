import { describe, it, expect } from 'vitest'
import { formatDate, truncateText } from '@/lib/utils'

describe('Utils', () => {
  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2024-01-15')
      const formatted = formatDate(date)
      expect(formatted).toBe('Jan 15, 2024')
    })
  })

  describe('truncateText', () => {
    it('should truncate long text', () => {
      const text = 'This is a very long text that should be truncated'
      const truncated = truncateText(text, 20)
      expect(truncated).toBe('This is a very long ...')
    })

    it('should not truncate short text', () => {
      const text = 'Short text'
      const truncated = truncateText(text, 20)
      expect(truncated).toBe('Short text')
    })
  })
})

