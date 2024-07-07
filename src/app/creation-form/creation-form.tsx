'use client'
import { useState } from 'react'
import { Button } from '@nextui-org/button'

import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import type { DateSelectArg, EventInput } from '@fullcalendar/core/index.js'
import { NameInput } from './name-input'
import { DurationSelect } from './duration-select'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import z from 'zod'

const creationFormSchema = z.object({
  name: z.string().min(3).max(30),
  duration: z.string(), // todo should match DurationOption values
  timeSlots: z.object({
    start: z.date(), // todo check if start date is before end date
    end: z.date(), // todo check if start date is before end date
  }),
})

export const CreationForm = () => {
  const [events, setEvents] = useState<EventInput[]>([])
  console.log('events:', events)

  const form = useForm({
    resolver: zodResolver(creationFormSchema),
  })

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
      <div className="my-6">
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
      <Button>Generate Link</Button>
    </>
  )
}
