import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { enUS } from 'date-fns/locale'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { NextUIProvider } from '@nextui-org/react'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'

export default function Home() {
  // const locales = {
  //   'en-US': enUS,
  // }
  // const localizer = dateFnsLocalizer({
  //   format: () => {},
  //   parse : () => {},
  //   startOfWeek : () => {},
  //   getDay: () => {},
  //   locales,
  // })
  return (
    <NextUIProvider>
      <main>
        <h1 className="text-lg text-red-500">Hello, world!</h1>
        <Button>Click me</Button>
        <Input label="Name of event" />
        {/* <Calendar
          localizer={localizer}
          events={[]}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        /> */}
      </main>
    </NextUIProvider>
  )
}
