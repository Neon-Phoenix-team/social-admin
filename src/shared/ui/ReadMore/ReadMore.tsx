import { useState } from 'react'
import { Button } from '../Button/Button'

export default function ReadMore({ text }: { text: string }) {
  const MAX_LENGTH = 20
  const [isExpanded, setExpanded] = useState(false)
  const isLong = text.length > MAX_LENGTH
  const _text = isExpanded ? text : text.slice(0, MAX_LENGTH)

  return (
    <p>
      {_text}
      {isLong && !isExpanded && '...'}
      {isLong && (
        <Button
          variant="text"
          onClick={() => setExpanded(!isExpanded)}
          style={{ textDecoration: 'underline', padding: '0' }}
        >
          {isExpanded ? 'hide' : 'show more'}
        </Button>
      )}
    </p>
  )
}
