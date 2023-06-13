import React from 'react'

import styles from './header.module.css'

import Logo from '../../assets/github_icon.png'
import Navbar from '../Navbar/Navbar'

const Header = () => {
  return (
    <header className={styles.header}>
        <div className={styles.header_wrapper}>
            <div className={styles.header_logo_wrapper}>
                <img className={styles.logo} src={Logo} alt="Icon" />
                <p className={styles.title}>Github Finder App</p>
            </div>
            <Navbar/>
        </div>
    </header>
  )
}

export default Header