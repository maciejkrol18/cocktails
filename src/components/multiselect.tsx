import { Button } from './ui/button'
import { Label } from './ui/label'

interface MultiSelectProps {
  title: string
  description: string
  source: string[]
  active: string[]
  activeSetter: (value: string[]) => void
}

function LabelDescription({ content }: { content: string }) {
  return <span className="text-xs text-gray-500">{content}</span>
}

export default function MultiSelect({
  title,
  description,
  source,
  active,
  activeSetter,
}: MultiSelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label>
        {title}
        <br />
        <LabelDescription content={description} />
      </Label>
      <div className="flex flex-wrap justify-end gap-2">
        {source.length > 0 ? (
          source.map((element) => (
            <Button
              key={element}
              variant={'outline'}
              className={`px-2 py-1 text-xs ${active.includes(element) ? 'bg-primary text-primary-foreground' : ''}`}
              onClick={() => {
                if (active.includes(element)) {
                  activeSetter(active.filter((el) => el !== element))
                } else {
                  activeSetter([...active, element])
                }
              }}
            >
              {element}
            </Button>
          ))
        ) : (
          <p>Loading available options...</p>
        )}
      </div>
    </div>
  )
}
