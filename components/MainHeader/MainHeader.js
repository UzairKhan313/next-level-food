import Link from 'next/link'

import logo from '@/assets/logo.png'
import classes from './mainHeader.module.css'
import Image from 'next/image'
import MainHeaderBackground from './MainHeaderBackground'
import Navlink from './Navlink'

// importing logo in next js is always object which hold src property.
const MainHeader = () => {
  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link href={'/'} className={classes.logo}>
          <Image src={logo} alt="a plate with food on it" priority />
          NextLevel Food
        </Link>
        <nav className={classes.nav}>
          <ul>
            <li>
              <Navlink href="/meals">Browse Meal</Navlink>
            </li>
            <li>
              <Navlink href="/community">Foodies Community</Navlink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}

export default MainHeader
