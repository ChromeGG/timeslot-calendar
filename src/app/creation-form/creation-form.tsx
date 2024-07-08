'use client'
import { Button } from '@nextui-org/button'

import { NameInput } from './name-input'
import { DurationSelect } from './duration-select'

import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import z from 'zod'
import { defaultDuration } from '../duration/duration-options'
import { CalendarInput } from './calendar-input'

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
    .nonempty({ message: 'Please select at least one time slot' }),
})

export type CreationForm = z.infer<typeof creationFormSchema>

export const CreationForm = () => {
  const methods = useForm<CreationForm>({
    resolver: zodResolver(creationFormSchema),
    defaultValues: {
      name: '',
      duration: defaultDuration.value,
      timeSlots: [],
    },
  })
  const { handleSubmit, control } = methods

  const onSubmit = (data: any) => {
    console.log('data:', data)
  }

  const onError = (errors: any) => {
    console.log('errors:', errors)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="my-6">
          <NameInput control={control} />
        </div>
        <div className="my-6">
          <DurationSelect control={control} />
        </div>

        <div className="my-4">
          <CalendarInput control={control} />
        </div>
        <Button type="submit">Generate Link</Button>
      </form>
    </FormProvider>
  )
}
