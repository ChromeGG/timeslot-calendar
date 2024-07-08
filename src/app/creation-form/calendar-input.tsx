'use client'

import { useState } from 'react'

import { Control, Controller, useFormContext, useWatch } from 'react-hook-form'
import { CreationForm } from './creation-form'

import { EventInput, DateSelectArg } from '@fullcalendar/core/index.js'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import { defaultDuration } from '../duration/duration-options'

type Props = {
  control: Control<CreationForm>
}

export const CalendarInput = (props: Props) => {
  const [events, setEvents] = useState<EventInput[]>([])
  const durationField = useWatch<CreationForm>({
    name: 'duration',
    defaultValue: defaultDuration.value,
  }) as string // todo check why it's not inferred as string
  const { setValue, getValues } = useFormContext<CreationForm>()

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

    const oldFormEvents = getValues('timeSlots')

    setValue('timeSlots', [
      ...oldFormEvents,
      {
        start: selectedSlot.start,
        end: selectedSlot.end,
      },
    ])
    setEvents([...events, newEvent])
  }

  console.log('durationField:', durationField)

  return (
    <Controller
      name="timeSlots"
      control={props.control}
      render={({ fieldState: { error, invalid } }) => (
        <>
          <FullCalendar
            plugins={[timeGridPlugin, interactionPlugin]}
            weekends
            nowIndicator
            editable
            selectable
            slotDuration={durationField} // TODO get it from context
            select={handleDateSelection}
            events={events}
          />
          {invalid && (
            <div
              data-slot="helper-wrapper"
              className="p-1 relative flex-col gap-1.5"
            >
              <div data-slot="error-message" className="text-tiny text-danger">
                {error?.message}
              </div>
            </div>
          )}
        </>
      )}
    />
  )
}
