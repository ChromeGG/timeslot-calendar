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
import { defaultDuration } from '../duration/duration-options'

const creationFormSchema = z.object({
  name: z.string().min(3).max(30),
  duration: z.string(), // todo should match DurationOption values
  timeSlots: z
    .array(
      z.object({
        start: z.date(), // todo start should be before end
        end: z.date(), // todo end should be after start
      })
    )
    .nonempty(),
})

export type CreationFormValues = z.infer<typeof creationFormSchema>

export const CreationForm = () => {
  const [events, setEvents] = useState<EventInput[]>([])
  console.log('events:', events)

  const { handleSubmit, control, setValue, getValues } =
    useForm<CreationFormValues>({
      resolver: zodResolver(creationFormSchema),
      defaultValues: {
        name: '',
        duration: defaultDuration.value,
        timeSlots: [],
      },
    })

  const handleDateSelection = (selectedSlot: DateSelectArg) => {
    console.log('arg:', selectedSlot)
    // todo add merging of events in case of being close to other event
    const newEvent: EventInput = {
      id: String(events.length + 1),
      start: selectedSlot.start,
      end: selectedSlot.end,
      overlap: false,
      // TODO add constraint for today -> future only
    }

    const oldFormEvents = getValues('timeSlots') || []
    console.log('oldFormEvents:', oldFormEvents)

    setValue('timeSlots', [
      ...oldFormEvents,
      {
        start: selectedSlot.start,
        end: selectedSlot.end,
      },
    ])
    setEvents([...events, newEvent])
  }

  const onSubmit = (data: any) => {
    console.log('data:', data)
  }

  const onError = (errors: any) => {
    console.log('errors:', errors)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div className="my-6">
        <NameInput control={control} />
      </div>
      <div className="my-6">
        <DurationSelect control={control} />
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
      <Button type="submit">Generate Link</Button>
    </form>
  )
}
