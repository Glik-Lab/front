import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineRight } from 'react-icons/ai';
import Footer from '../components/Footer';
import Navbar from '../components/NavBarLogado';
import styles from '../styles/Card.module.css';
import styles1 from '../styles/Contrato.module.css';


const ErrorPage: React.FC = () => {
 
 const { t } = useTranslation();





 return (
    <>
      <Navbar />
      <div className={styles1.newDocumentContainer}>
            <Link href="/">{t('home-page')}</Link>
            <div className={styles.icon}>
              <AiOutlineRight />
            </div>
            <Link href="/login">{t('my-documents')}</Link>
            <div className={styles.icon}>
              <AiOutlineRight />
            </div>
           
          </div>
      <div className={styles1.background}>
        <h1>Erro ao criar a Campanha</h1>
      
      </div>
      <Footer />
    </>
 );
};

export default ErrorPage;
