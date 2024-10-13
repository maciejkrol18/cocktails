import type { DebouncedState } from 'use-debounce'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'

interface TextFilterProps extends React.ComponentProps<typeof Input> {
  componentType: 'input' | 'textarea'
  stateValue: string
  stateSetter: (value: string) => void
  filterName: string
  filterSetter: DebouncedState<(filter: string, value: string) => void>
}

export default function TextFilter({
  componentType,
  placeholder,
  stateValue,
  stateSetter,
  filterName,
  filterSetter,
  className,
}: TextFilterProps) {
  const componentProps = {
    placeholder: placeholder,
    value: stateValue,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      stateSetter(e.target.value)
      filterSetter(filterName, e.target.value)
    },
    className: className,
  }
  return componentType === 'input' ? (
    <Input {...componentProps} />
  ) : (
    <Textarea {...componentProps} />
  )
}
