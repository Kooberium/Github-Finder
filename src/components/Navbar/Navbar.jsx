import React from 'react'

import styles from './navbar.module.css'

import { pagesData } from '../../router/router'


const Navbar = () => {

  const current_url = window.origin
  const current_fullurl = window.navigation.currentEntry.url;

  const isURLMatch = (route) => {
    return `${current_url}${route}` === current_fullurl;
  };


  return (
    <div className={styles.navbar_wrapper}>
        <nav className={styles.navbar_navigation}>
            <ul className={styles.navbar_list}>
                {pagesData.map((el, i) => <li key={i}>
                    <a className={isURLMatch(el.path) ? styles.navbar_link_current : styles.navbar_link_default} href={`${current_url}${el.path}`}>{el.name}</a>
                </li>)}
            </ul>
        </nav>
    </div>
  )
}

export default Navbar