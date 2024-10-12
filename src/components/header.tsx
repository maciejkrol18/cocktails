import Image from 'next/image'
import SolvroLogo from '../../public/logo_solvro_mono.png'
import { ThemeSwitch } from './theme-switch'

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
      <ThemeSwitch />
    </div>
  )
}
