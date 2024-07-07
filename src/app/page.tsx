'use client'
import { NextUIProvider } from '@nextui-org/react'
import { Card } from '@nextui-org/card'

import { CreationForm } from './creation-form/creation-form'

export default function Home() {
  return (
    <NextUIProvider>
      <main>
        <Card className="m-12 p-12">
          <h1 className="text-xl text-center px-4">Simple Time Slots</h1>
          <CreationForm />
        </Card>
      </main>
    </NextUIProvider>
  )
}
