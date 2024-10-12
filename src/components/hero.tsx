interface HeroProps {
  title: string
  description: string
}

export default function Hero({ title, description }: HeroProps) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-lg">{description}</p>
    </div>
  )
}
