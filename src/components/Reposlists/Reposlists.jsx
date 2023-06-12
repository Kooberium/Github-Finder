import React from "react";

import styles from "./reposlist.module.css";

import {useSelector, useDispatch} from 'react-redux';

import Reposlist from './Reposlist';



const List = (props) => {
  const fav_list = useSelector(data => data.favlist)

  const whitelist = fav_list.reduce((acc, cur) => {
    acc[cur.id] = true;
    return acc
  }, {})


  return (
    <ul className={styles.list}>
        {props.data.map((el, i) => <Reposlist whitelist={whitelist} key={i} id={el.id} name={el.name}/>)}
    </ul>
  );
};

export default List;
