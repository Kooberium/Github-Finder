import React from 'react'

import styles from './favrepos.module.css';

import List from '../../components/Reposlists/Reposlists';

import {useSelector} from 'react-redux';

import getFavRepos from '../../redux/selectors';

import waveBackground from '../../assets/wave.svg'

const Favrepos = () => {
  const favList = useSelector(getFavRepos);

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
        <img className={styles.background_wave} src={waveBackground} alt="Wave" />
    </div>
  )
}

export default Favrepos