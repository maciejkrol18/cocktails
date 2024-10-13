import Image from 'next/image'
import SolvroLogo from '../../public/logo_solvro_mono.png'
import { ThemeSwitch } from './theme-switch'
import Link from 'next/link'
import { Button } from './ui/button'

export default function Header() {
  return (
    <div className="flex items-center justify-between p-4 container mx-auto">
      <Image
        src={SolvroLogo}
        width={50}
        height={50}
        alt="logo"
        className="invert dark:filter-none"
      />
      <div className="flex gap-4 items-center">
        <Button asChild variant={'ghost'}>
          <Link href="/">Cocktails</Link>
        </Button>
        <Button asChild variant={'ghost'}>
          <Link href="/ingredients">Ingredients</Link>
        </Button>
      </div>
      <ThemeSwitch />
    </div>
  )
}
