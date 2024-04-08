import Navbar from "../components/NavBarLogado"
import { useTranslation } from 'react-i18next'

import '../lib/i18n'

export default function Terms() {
    const { t } = useTranslation()

    return (
        <>
            <Navbar />
            <h1>{t('terms-and-conditions-of-use-of-the-platform')}</h1>
        </>
    )
}