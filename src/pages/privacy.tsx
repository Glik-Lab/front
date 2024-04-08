import Navbar from "../components/NavBarLogado"
import { useTranslation } from 'react-i18next'

import '../lib/i18n'

export default function Privacy() {
    const { t } = useTranslation()
    
    return (
        <>
            <Navbar />
            <h1>{t('platform-privacy-policy')}</h1>
        </>
    )

}