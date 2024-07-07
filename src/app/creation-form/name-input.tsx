import { Input } from '@nextui-org/input'
import { useState } from 'react'

export const NameInput = () => {
  const [name, setName] = useState('')

  return (
    <Input
      label="Name of event"
      isRequired
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  )
}
