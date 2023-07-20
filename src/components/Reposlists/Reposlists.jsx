import React from "react";

import styles from "./reposlist.module.css";

import {useSelector} from 'react-redux';
import getFavRepos from '../../redux/selectors';

import Reposlist from './Reposlist';



const List = (props) => {
  const favList = useSelector(getFavRepos)

  const whitelist = favList.reduce((acc, cur) => {
    acc[cur.id] = true;
    return acc
  }, {})


  return (
    <ul className={styles.list}>
        {props.data.map((el, i) => <Reposlist whitelist={whitelist} key={i} id={el.id} name={el.name} link={el.html_url}/>)}
    </ul>
  );
};

export default List;
