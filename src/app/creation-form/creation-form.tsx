'use client'
import { useState } from 'react'
import { Button } from '@nextui-org/button'

import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import type { DateSelectArg, EventInput } from '@fullcalendar/core/index.js'
import { NameInput } from './name-input'
import { DurationSelect } from './duration-select'

// import { useForm } from 'react-hook-form'

export const CreationForm = () => {
  const [events, setEvents] = useState<EventInput[]>([])
  console.log('events:', events)

  // const form = useForm()

  const handleDateSelection = (selectedSlot: DateSelectArg) => {
    console.log('arg:', selectedSlot)
    const newEvent: EventInput = {
      id: String(events.length + 1),
      start: selectedSlot.start,
      end: selectedSlot.end,
      overlap: false,
      // TODO add constraint for today -> future only
    }

    setEvents([...events, newEvent])
  }

  return (
    <>
      <div className="my-6">
        <NameInput />
      </div>
      <div className='my-6'>
        <DurationSelect />
      </div>

      <div className="my-4">
        <FullCalendar
          plugins={[timeGridPlugin, interactionPlugin]}
          weekends
          nowIndicator
          editable
          selectable
          // slotDuration={duration} // TODO get it from context
          select={handleDateSelection}
          events={events}
        />
      </div>
      <Button >Generate Link</Button>
    </>
  )
}
