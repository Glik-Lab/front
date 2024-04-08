import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AiOutlineMenu } from 'react-icons/ai'
import { Link as ScrollLink } from 'react-scroll'
import LogoGlick from '../assets/logo-glick/Glik 1.svg'

import styles from '../styles/Navbar.module.css'

import '../lib/i18n'

const Navbar: React.FC = () => {
 
  const [openMenu, setOpenMenu] = useState(false)

  const { t } = useTranslation()

  function closeMenu() {
    setOpenMenu(false)
  }

  

  return (
    <>
      <div className={styles.navbar}>
        <Link href="/">
          <Image src={LogoGlick} alt="Logo Glick" width={70} height={70}/>
        </Link>
        <nav>
          <input
            type="checkbox"
            id="check"
            className={styles.check}
            checked={openMenu}
          />
          <label
            className={styles.menuIcon}
            onClick={() => setOpenMenu(!openMenu)}
            htmlFor="check"
          >
            <AiOutlineMenu />
          </label>
          <ul>
            <li>
              <Link className={styles.links} href="/" onClick={closeMenu}>
                Home
              </Link>
            </li>

            <li>
              <ScrollLink
                className={styles.links}
                to="plataforma"
                duration={100}
                hashSpy={true}
                onClick={() => setOpenMenu(false)}
              >
                {t('plataform')}
              </ScrollLink>
            </li>

            <li>
              <ScrollLink
                className={styles.links}
                to="solucoes"
                duration={100}
                hashSpy={true}
                onClick={closeMenu}
              >
                {t('solutions')}
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                className={styles.links}
                to="blog"
                hashSpy={true}
                duration={100}
                onClick={closeMenu}
              >
                Blog
              </ScrollLink>
            </li>
            <li>
              <Link className={styles.btn} href="/login">
                {t('restricted-area')}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}

export default Navbar
