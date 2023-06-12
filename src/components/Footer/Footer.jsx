import React from 'react'

import styles from './footer.module.css'

import Logo from '../../assets/github_icon.png'

const Footer = () => {
  return (
    <footer className={styles.header}>
        <div className={styles.header_wrapper}>
            <img className={styles.logo} src={Logo} alt="Icon" />
            <p className={styles.title}>Github Finder App</p>
            
        </div>
    </footer>
  )
}

export default Footer