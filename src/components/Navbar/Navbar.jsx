import React from 'react'

import styles from './navbar.module.css'

import { routesData } from '../../router/router'


const Navbar = () => {

  const currentURL = window.origin
  const currentFullURL = window.navigation.currentEntry.url;

  const isURLMatch = (route) => {
    return `${currentURL}${route}` === currentFullURL;
  };


  return (
    <div className={styles.navbar_wrapper}>
        <nav className={styles.navbar_navigation}>
            <ul className={styles.navbar_list}>
                {routesData.map((el, i) => <li key={i}>
                    <a className={isURLMatch(el.path) ? styles.navbar_link_current : styles.navbar_link_default} href={`${currentURL}${el.path}`}>{el.name}</a>
                </li>)}
            </ul>
        </nav>
    </div>
  )
}

export default Navbar