'use client'
import { Card } from '@nextui-org/card'

type Invitation = {
  id: string
  events: []
}

type InvitationPageProps = {
  id: string
}

export default function InvitationPage({ id }: InvitationPageProps) {
  console.log('invitation ID', id)
  // TODO fetch by ID
  return (
    <Card className="m-12 p-12">
      <h1 className="text-xl text-center px-4">Invitation page</h1>
    </Card>
  )
}
