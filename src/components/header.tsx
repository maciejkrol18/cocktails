import Image from 'next/image'
import SolvroLogo from '../../public/logo_solvro_mono.png'
import { ThemeSwitch } from './theme-switch'
import Link from 'next/link'
import { Button } from './ui/button'

export default function Header() {
  return (
    <div className="flex items-center justify-between p-4 container mx-auto">
      <Link href="/" className="flex gap-4 items-center">
        <Image
          src={SolvroLogo}
          width={50}
          height={50}
          alt="logo"
          className="invert dark:filter-none"
        />
        <div className="text-xl font-mono tracking-widest uppercase">Cocktails</div>
      </Link>
      <ThemeSwitch />
    </div>
  )
}
