import { Input } from '@nextui-org/input'
import { Control, Controller } from 'react-hook-form'
import { CreationForm } from './creation-form'

type Props = {
  control: Control<CreationForm>
}

export const NameInput = (props: Props) => {
  return (
    <Controller
      name="name"
      control={props.control}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error, invalid },
      }) => (
        <>
          <Input
            label="Event name"
            isRequired
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            isInvalid={!!invalid}
            errorMessage={error?.message}
          />
        </>
      )}
    />
  )
}
