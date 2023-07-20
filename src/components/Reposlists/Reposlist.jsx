import React from "react";

import styles from "./reposlist.module.css";

import { useDispatch } from "react-redux";

import { removeRepository, addRepository } from "../../redux/store";

const Reposlist = (props) => {
    const dispatch = useDispatch();

    const markRepose = (id, name, url) => {
        dispatch(addRepository({
            name: name,
            id: id,
            html_url: url, 
        }))
    };

    const unmarkRepose = (id) => {
            if (!id) return 'Error';
            dispatch(removeRepository(id))
    };

    const isFavoriteExist = props.whitelist[props.id];


  return (
    <>
        {props.whitelist ? (
        <li className={`${styles.list_item} , ${isFavoriteExist ? styles.list_item_marked : styles.list_item_unmarked}`}>
          <a className={styles.list_item_link} href={props.link} target="_blank">
            <p className={styles.list_item_title}>{props.name}</p>
          </a>
          
          {isFavoriteExist ? (
            <button onClick={()=> {unmarkRepose(props.id)}} className={styles.claim_btn}>Unmark</button>
          ) : (
            <button onClick={()=> {markRepose(props.id, props.name, props.link)}} className={styles.claim_btn}>Mark</button>
          )}
        </li>
        ) : null
        }
    </>
  );
};

export default Reposlist;