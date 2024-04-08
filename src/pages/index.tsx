// import Main from '../components/Main'


import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import Apps from '../assets/apps.svg'
import NewReleases from '../assets/new_releases.svg'
import Security from '../assets/security.svg'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import styles from '../styles/Main.module.css'

// export default function Home() {
const Home = () => {
 
  const {
    t,
    i18n: { changeLanguage, language }
  } = useTranslation()


  return (
    <>
     <Navbar />
  <div className={styles.divMain}>
    <div className={styles.left}>
   <h1>Glik Lab </h1>
   </div>
   <div className={styles.left1}>
   <div className={styles.advantages} id="plataforma">
          <div className={styles.leftAdvantages}>
            <h1>Venda <br /> Web3</h1>
            <h2>{t('the-power-of-blockchain')}</h2>
          </div>
          <div className={styles.rightAdvantages}>
            <div className={styles.containerAdvantages}>
              <Image src={Apps} alt="Apps" />
              <div className={styles.informationsAdvantages}>
                <h4>{t('decentralization')}</h4>
                <p>{t('decentralization-description')}</p>
              </div>
            </div>
            <div className={styles.containerAdvantages}>
              <Image src={Security} alt="NewReleases" />
              <div className={styles.informationsAdvantages}>
                <h4>{t('security')}</h4>
                <p>Suas vendas são  efetuadas  e armazenadas na Blockchain. Permanece intactas e à prova de violação. Cada venda é irrefutável e imutável.</p>
              </div>
            </div>
            <div className={styles.containerAdvantages}>
              <Image src={NewReleases} alt="Security" />
              <div className={styles.informationsAdvantages}>
                <h4>{t('validation')}</h4>
                <p>A certeza de vendas seguras e confiáveis. Verificação da autenticidade Web3 de todas as partes envolvidas.</p>
              </div>
            </div>
          </div>
        </div>
   </div>
   <div className={styles.left2}></div>
  </div>
   <Footer />
    </>
  )
}

export default Home