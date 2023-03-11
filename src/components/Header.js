import React from 'react'
import styles from './Header.module.css'

const Header = () => {
    return(
        <header className={styles.pageHeader}>
            <div id={styles.pageTitleAndLink}>
                <div id={styles.pageTitle}>
                    Cantor-like Set Generator
                </div>
                <div>
                    <a href="https://arxiv.org/pdf/2211.08664.pdf">Read the Paper: A Non-Centered Asymmetric Cantor-like Set</a>
                </div>
            </div>
            <div id={styles.creditContainer}>
                <div id={styles.githubLogo}>
                </div>
                <div id={styles.authorLink}>
                    <div>
                        Lauren Wszolek
                    </div>
                    <div>
                        <a href="https://github.com/bambery/cantor_3-4_react">Project Github</a>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
