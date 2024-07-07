'use client'
import { Card } from '@nextui-org/card'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Button } from '@nextui-org/button'
import { useState } from 'react'

type Invitation = {
  id: string
  name: string
  duration: string
  events: []
}

type InvitationPageProps = {
  params: { id: string }
}

export default function InvitationPage(props: InvitationPageProps) {
  console.log('invitation ID', props)
  const [selected, useSelected] = useState()
  // TODO fetch by ID
  const invitation = {
    id: '123',
    name: 'Test 123',
    duration: '00:30',
    events: [],
  } satisfies Invitation

  return (
    <Card className="m-12 p-12">
      <h1 className="text-xl text-center">Choose delightful time slot</h1>
      <div className="mt-4">
        <p>Event name: {invitation.name}</p>
        <p>Event duration: {invitation.duration}</p>
        <div className="my-4">
          <FullCalendar
            plugins={[timeGridPlugin, interactionPlugin]}
            weekends
            nowIndicator
            editable
            selectable
            // slotDuration={duration} // TODO get it from context
            // select={handleDateSelection}
            events={invitation.events}
          />
        </div>
      </div>
      <Button onClick={() => console.log('confirmed', selected)}>
        Confirm Selection
      </Button>
    </Card>
  )
}
