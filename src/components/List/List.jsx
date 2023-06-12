import React from "react";

import styles from "./list.module.css";

const List = (props) => {
  return (
    <ul className={styles.list}>
        {props.data.map((el, i) => <li className={styles.list_item} key={i}>
          <a className={styles.list_item_link} href="#" target="_blank">
            <p className={styles.list_item_title}>{el.name}</p>
          </a>
          <button className={styles.claim_btn}>Mark</button>
        </li>)}
    </ul>
  );
};

export default List;
