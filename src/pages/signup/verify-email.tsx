import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

import '../../lib/i18n'

import LogoArara from '../../assets/arara.png'
import Navbar from '../../components/NavBarLogado'

export default function VerifyEmail() {
  const { t } = useTranslation()

  return (
    <>
      <Navbar />
      <div className="verification-code-container">
        <div className="background-brickto">
          <Image
            className="image-brickto"
            src={LogoArara}
            alt="Logo Brickto"
          />
        </div>
        <div className="verification-code-form">
          <h1>{t('check-your-email')}</h1>
          <p>{t('confirm-your-registration')}</p>
          <Link href="/login">
            <button className="button-validate-code" type="button">
              {t('return-to-login')}
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}
