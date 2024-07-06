'use client'
import { NextUIProvider } from '@nextui-org/react'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { Select, SelectItem } from '@nextui-org/select'
import { Card } from '@nextui-org/card'

import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

import { useState } from 'react'
import { DateSelectArg, EventInput } from '@fullcalendar/core/index.js'

const durations = [
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

export default function Home() {
  const [name, setName] = useState('')
  const [duration, setDuration] = useState(durations[0].value)
  const [events, setEvents] = useState<EventInput[]>([])
  console.log('events:', events)

  const handleDateSelection = (arg: DateSelectArg) => {
    console.log('arg:', arg)
    const newEvent: EventInput = {
      id: String(events.length + 1),
      start: arg.start,
      end: arg.end,
      overlap: false,
      // TODO add constraint for today -> future only
    }

    setEvents([...events, newEvent])
  }

  return (
    <NextUIProvider>
      <main>
        <Card className="m-12 p-12">
          <h1 className="text-xl text-center px-4">Simple Time Slost</h1>
          <Input
            className="my-4"
            label="Name of event"
            isRequired
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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

          <div>Select time slots</div>
          <div className="my-4">
            <FullCalendar
              plugins={[timeGridPlugin, interactionPlugin]}
              weekends
              nowIndicator
              editable
              selectable
              slotDuration={duration}
              select={handleDateSelection}
              events={events}
            />
          </div>
          <Button>Generate Link</Button>
        </Card>
      </main>
    </NextUIProvider>
  )
}
