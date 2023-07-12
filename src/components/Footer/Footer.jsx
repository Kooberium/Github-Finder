import React from 'react'

import styles from './footer.module.css'

import Logo from '../../assets/github_icon.png'

const Footer = () => {
  return (
    <footer className={styles.footer}>
        <div className={styles.footer_wrapper}>
            <p className={styles.footer_author}>©Kooberium</p>
            <a href='https://github.com/Kooberium/Github-Finder' target='_blank' rel='noreferrer' className={styles.link}><img className={styles.git_icon} src={Logo} alt="Github Icon" /></a>
        </div>
    </footer>
  )
}

export default Footer