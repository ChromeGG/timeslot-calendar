export type DurationOption = {
  value: string
  label: string
}

export const defaultDuration = {
  value: '00:15',
  label: '15 minutes',
} satisfies DurationOption

export const durations: DurationOption[] = [
  defaultDuration,
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
