import Link from 'next/link'
import styles from '../styles/Footer.module.css'


export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContents}>
        <div className={styles.copyright}>
          <p>© 2024 GlickLab. Copyright and rights reserved</p>
        </div>

        <div className={styles.termsAndPrivacy}>
          <Link href="/terms" target="_blank">Terms and Conditions</Link>
          <Link href="/privacy" target="_blank">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  )
}