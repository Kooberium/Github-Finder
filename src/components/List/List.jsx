import React from "react";

import styles from "./list.module.css";

const List = (props) => {
  return (
    <ul className={styles.list}>
        {props.data.map((el, i) => <li className={styles.list_item} key={i}>{el.name}</li>)}
    </ul>
  );
};

export default List;
