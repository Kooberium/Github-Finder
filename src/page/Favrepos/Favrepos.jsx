import React from 'react'

import styles from './favrepos.module.css';

import List from '../../components/Reposlists/Reposlists';

import {useSelector} from 'react-redux';

const Favrepos = () => {
  const fav_list = useSelector(data => data.favlist);

  return (
    <div className={styles.favrepos_content}>
        <div className={styles.favrepos_wrapper}>
            {fav_list && fav_list.length > 0 ? (
              <List data={fav_list}></List>
            ) : (
              <div className={styles.favrepos_empty_container}>
                  <h1 className={styles.favrepos_empty_title}>
                    Тут поки пусто:)
                  </h1>
              </div>
            )} 
           
        </div>
    </div>
  )
}

export default Favrepos