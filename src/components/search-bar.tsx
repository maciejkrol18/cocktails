import { Input } from './ui/input'

export default function SearchBar({ placeholder }: React.ComponentProps<typeof Input>) {
  return <Input placeholder={placeholder} className="w-full" />
}
