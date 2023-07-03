import React from 'react'

import styles from './favrepos.module.css';

import List from '../../components/Reposlists/Reposlists';

import {useSelector} from 'react-redux';

const Favrepos = () => {
  const favList = useSelector(data => data.favlist);

  return (
    <div className={styles.favrepos_content}>
        <div className={styles.favrepos_wrapper}>
            {favList && favList.length > 0 ? (
              <List data={favList}></List>
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