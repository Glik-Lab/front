import Link from 'next/link'
import Swiper from 'swiper';

import styles from '../styles/Main.module.css'

export default function Main() {
    return (
        <main className={styles.main}>
            <div className={styles.about}>
                <h2>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</h2>
            </div>
            <div className={styles.contractsButton}>
                <Link href="/contracts" target="_blank" className={styles.viewContracts}>Visualizar os tipos de contratos</Link>
            </div>
            <div className={styles.slider}>
                <div className={styles.sliderTrack}>
                    <div className={styles.slide}><h2>Card1</h2></div>
                    <div className={styles.slide}><h2>Card2</h2></div>
                    <div className={styles.slide}><h2>Card3</h2></div>
                    <div className={styles.slide}><h2>Card4</h2></div>
                    <div className={styles.slide}><h2>Card5</h2></div>
                    <div className={styles.slide}><h2>Card6</h2></div>
                    <div className={styles.slide}><h2>Card7</h2></div>
                    <div className={styles.slide}><h2>Card8</h2></div>
                    <div className={styles.slide}><h2>Card9</h2></div>
                    <div className={styles.slide}><h2>Card10</h2></div>
                    <div className={styles.slide}><h2>Card11</h2></div>
                    <div className={styles.slide}><h2>Card12</h2></div>
                </div>
            </div>
            <div className={styles.containerFeedbacks}>
                <div className={styles.feedbackCard}>
                    <h2 className={styles.textLight}>Fulano de tal</h2>
                    <p className={styles.textLight}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
                </div>
            </div>
        </main>
    )
}