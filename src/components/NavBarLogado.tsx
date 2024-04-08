import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineMenu } from 'react-icons/ai';
import LogoGlick from '../assets/logo-glick/Glik 1.svg';

import styles from '../styles/Navbar.module.css';

import '../lib/i18n';

interface NavBarLogadoProps {
  onLogout: () => any; // Define o tipo da função onLogout
 }

const Navbar: React.FC<NavBarLogadoProps> = ({ onLogout }) => {
 const [openMenu, setOpenMenu] = useState(false);
 const [userName, setUserName] = useState('');

 const { t } = useTranslation();

 useEffect(() => {
    const name = localStorage.getItem('userName');
    if (name) {
      setUserName(name);
    }
 }, []);
console.log(userName)
 function closeMenu() {
    setOpenMenu(false);
 }

 function handleLogout() {

    localStorage.removeItem('userName');
    window.location.href = '/login';
 }

 // Adicionando o manipulador de eventos onChange
 function handleMenuChange(event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) {
    setOpenMenu(event.target.checked);
 }

 return (
    <>
      <div className={styles.navbar}>
        <Link href="/">
          <Image src={LogoGlick} alt="Logo Glik" width={70} height={70} />
        </Link>

        <nav>
          <input
            type="checkbox"
            id="check"
            className={styles.check}
            checked={openMenu}
            onChange={handleMenuChange} // Adicionando o onChange aqui
          />
          <label
            className={styles.menuIcon}
            onClick={() => setOpenMenu(!openMenu)}
            htmlFor="check"
          >
            <AiOutlineMenu />
          </label>
          <ul>
            {userName ? (
              <>
                <li>
                 <span style={{ color: "white", fontSize: '15px' }}>
                    {t('hello')}, {userName}, {''}
                 </span>
                 <Link
                    className={styles.btn}
                    onClick={() => {
                      onLogout();
                      handleLogout();
                   }}
                    href="/login"
                 >
                    Logout
                 </Link>
                </li>
              </>
            ) : (
              <></>
            )}
          </ul>
        </nav>
      </div>
    </>
 );
};

export default Navbar;
