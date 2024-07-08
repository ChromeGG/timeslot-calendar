import { Select, SelectItem } from '@nextui-org/select'
import { defaultDuration, durations } from '../duration/duration-options'
import { Control, Controller } from 'react-hook-form'
import { CreationFormValues } from './creation-form'

type Props = {
  control: Control<CreationFormValues>
}

export const DurationSelect = (props: Props) => {
  return (
    <Controller
      name="duration"
      control={props.control}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error, invalid },
      }) => (
        <Select
          isRequired
          label="Event duration"
          value={value}
          defaultSelectedKeys={[defaultDuration.value]}
          onChange={onChange}
          onBlur={onBlur}
          isInvalid={!!invalid}
          errorMessage={error?.message}
        >
          {durations.map((duration) => (
            <SelectItem key={duration.value} value={duration.value}>
              {duration.label}
            </SelectItem>
          ))}
        </Select>
      )}
    />
  )
}
