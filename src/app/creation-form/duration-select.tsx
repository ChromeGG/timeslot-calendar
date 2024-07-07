import { useState } from 'react'
import { Select, SelectItem } from '@nextui-org/select'
import { durations, defaultDuration } from '../duration/duration-options'

export const DurationSelect = () => {
  const [duration, setDuration] = useState(defaultDuration.value)

  return (
    <div>
      <Select
        isRequired
        label="Duration of Event"
        // className="max-w-xs" if we want to limit the width
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      >
        {durations.map((duration) => (
          <SelectItem key={duration.value} value={duration.value}>
            {duration.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  )
}
