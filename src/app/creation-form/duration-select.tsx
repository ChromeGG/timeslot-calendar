import { useState } from 'react'
import { Select, SelectItem } from '@nextui-org/select'

type DurationOption = {
  value: string
  label: string
}

const durations: DurationOption[] = [
  {
    value: '00:15',
    label: '15 minutes',
  },
  {
    value: '00:30',
    label: '30 minutes',
  },
  {
    value: '01:00',
    label: '1 hour',
  },
  {
    value: '02:00',
    label: '2 hours',
  },
  {
    value: '03:00',
    label: '3 hours',
  },
]

export const DurationSelect = () => {
  const [duration, setDuration] = useState(durations[0].value)

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
