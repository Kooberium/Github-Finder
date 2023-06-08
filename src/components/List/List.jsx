import React from "react";

import styles from "./list.module.css";

const List = (props) => {
  const fake = []
  for (let i = 0; i < 50; i++) {
    fake.push({name: `name - ${i}`});
  };
  return (
    <ul className={styles.list}>
        {/* {props.data.map((el, i) => <li className={styles.list_item} key={i}>
          <p>{el.name}</p>
          <div>
            <p>*</p>

          </div>
        </li>)} */}
        {fake.map((el, i) => <li className={styles.list_item} key={i}>{el.name}</li>)}
    </ul>
  );
};

export default List;
