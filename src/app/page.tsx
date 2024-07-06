'use client'
import { NextUIProvider } from '@nextui-org/react'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { Card } from '@nextui-org/card'

import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

import { useState } from 'react'
import { DateSelectArg } from '@fullcalendar/core/index.js'

export default function Home() {
  const [events, setEvents] = useState<any>([])
  console.log('events:', events)

  const handleDateSelection = (arg: DateSelectArg) => {
    console.log('arg:', arg)
    const newEvent = {
      id: events.length + 1,
      start: arg.start,
      end: arg.end,
    }

    setEvents([...events, newEvent])
  }

  return (
    <NextUIProvider>
      <main>
        <Card className="m-12 p-12">
          <h1 className="text-xl text-center px-4">Simple Time Slot</h1>
          <Input className="my-4" label="Name of event" />
          <div>Select time slots</div>

          <div className="my-4">
            <FullCalendar
              plugins={[timeGridPlugin, interactionPlugin]}
              weekends
              nowIndicator
              editable
              selectable
              slotDuration="00:30"
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
