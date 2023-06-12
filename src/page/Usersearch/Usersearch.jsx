import React, { useState, useEffect, useRef } from "react";

import Userinfo from '../../components/Userinfo/Userinfo';
import List from "../../components/Reposlists/Reposlists";

import styles from "./usersearch.module.css";

import fetch from "../../api/fetch";
import env from "react-dotenv";

const Usersearch = () => {
  const form_ref = useRef(null)
  const userrepos_container = useRef(null);

  const defaultStates = {
    input: { placeholder: "Введіть нікнейм користувача Github" },
    submit: { color: "rgb(47, 79, 79)", value: "Пошук" },
  };

  const [submit_color, submit_setColor] = useState(
    defaultStates.submit.color || "rgb(0,0,0)"
  );

  const [usereposcontainer_opacity, set_usereposcontainer_opacity] = useState("0");
  const [input_placeholder, set_input_placeholder] = useState(defaultStates.input.placeholder);
  const [showrepos_btn, set_showrepos_btn] = useState(0);
  const [user_repos, set_user_repos] = useState(null);

  const [userdata, setUserdata] = useState();


  useEffect(() => {

  }, []);

  const searchUser = (username) => {
    if (!username) return 'USERNAME ERROR'

    const API = env.API_URL;
    if (!API) return 'API ERROR';

    fetch(`${API}/${username}`).then((result) => setUserdata(result));
  };

  const onUserSearch = (e) => {
    e.preventDefault();

    if (!form_ref) return;

    const form = form_ref.current;
    
    const input = form.elements['controlpanel_input'];
    const input_value = input.value;

    if (!input_value) {
      submit_setColor("rgb(220, 150, 60)");
      set_input_placeholder("Ви повинні вести нікнейм користувача");
      return;
    }

    searchUser(input_value)
    submit_setColor("rgb(0, 250, 154)");
  };

  const onInputActivate = () => {
    submit_setColor(defaultStates.submit.color);
    set_input_placeholder(defaultStates.input.placeholder);
  };

  const getRepos = () => {
    if (!userdata) return;
    if (!userdata.repos_url) return;
    fetch(userdata.repos_url).then((result) => set_user_repos(result));

    showRepos();
  };

  const showRepos = () => {
    if (showrepos_btn) {

      set_usereposcontainer_opacity(0);
      setTimeout(() => {
        set_showrepos_btn(!showrepos_btn);
      }, 500);

    } else {

      set_showrepos_btn(!showrepos_btn);
      set_usereposcontainer_opacity(1);
      
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.main_wrapper}>
        <form className={styles.userfinder_controlpanel} ref={form_ref}>
          <input
            onClick={onInputActivate}
            id="controlpanel_input"
            type="text"
            placeholder={input_placeholder}
          />
          <input
            style={{ backgroundColor: submit_color }}
            onClick={onUserSearch}
            id="controlpanel_submit"
            type="submit"
            value={defaultStates.submit.value}
          />
        </form>

        {userdata ? (
          <div className={styles.userfinder_content}>
            <div className={styles.user_info}>
              <Userinfo name={userdata.name} avatar_url={userdata.avatar_url} followers={userdata.followers} following={userdata.following} company={userdata.company} location={userdata.location} created={userdata.created_at} updated={userdata.updated_at}/>

              <div className={styles.userinfo_control}>
                <p className={styles.userinfo_reposcount}>Знайдено {userdata.public_repos} репозиторіїв...</p>

                {userdata && userdata.public_repos > 0 ? (
                  <button onClick={getRepos} className={styles.userinfo_control_btn}>{showrepos_btn ? 'Згорнути' : 'Розгорнути'}</button>
                ) : (<></>)}
              </div> 
            </div>

            <div
              className={styles.user_repos}
              ref={userrepos_container}
              style={{ opacity: usereposcontainer_opacity, display: `${showrepos_btn ? 'block' : 'none'}` }}
            >
              {user_repos && showrepos_btn ? (
                <List name={userdata.name} data={user_repos}></List>
              ) : (
                <></>
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </main>
  );
};

export default Usersearch;
