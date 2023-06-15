import React, { useState, useEffect, useRef } from "react";

import Userinfo from '../../components/Userinfo/Userinfo';
import List from "../../components/Reposlists/Reposlists";

import styles from "./usersearch.module.css";

import fetch from "../../api/fetch";
import env from "react-dotenv";

const Usersearch = () => {
  const form_ref = useRef(null)

  const defaultStates = {
    input: { placeholder: "Введіть нікнейм користувача Github" },
    submit: { color: "rgb(47, 79, 79)", value: "Пошук" },
  };

  const [submit_color, submit_setColor] = useState(defaultStates.submit.color || "rgb(0,0,0)");

  const [usereposcontainer_opacity, set_usereposcontainer_opacity] = useState("0");

  const [input_placeholder, set_input_placeholder] = useState(defaultStates.input.placeholder);

  const [showrepos_btn, set_showrepos_btn] = useState(0);

  const [user_repos, set_user_repos] = useState(null);
  const [userdata, set_user_data] = useState(null || JSON.parse(localStorage.getItem('github_user_data')));

  //////Система запобігання флудінню кнопкою пошуку
  const [millis, set_millis] = useState(null);
  const [flood_count, set_flood_count] = useState(0);
  const [is_locked, set_lock] = useState(false);


  useEffect(() => {
    fetchRepos();
  }, [userdata]);

  const searchUser = (username) => {
    if (!username) return 'USERNAME ERROR'

    const API = env.API_URL;
    if (!API) return 'API ERROR';

    fetch(`${API}/${username}`).then((result) => {
      if (result.message && result.message === 'Not Found') {
        show_message('Користувача не було знайдено!', "rgb(220, 55, 60)")
        
        form_ref.current.reset()
        return
      };


      const toJSON = JSON.stringify(result);
      localStorage.setItem('github_user_data', toJSON);

      set_user_data(result)
    });
  };

  const onUserSearch = (e) => {
    e.preventDefault();

    if (is_locked) {
      show_message('Зачекайте хвильку!', 'rgb(220, 55, 60)')
      return
    } else {
      handleFlooding();
    }
    
    if (!form_ref) return;
    const form = form_ref.current;
    
    const input = form.elements['controlpanel_input'];
    const input_value = input.value;

    if (userdata && userdata.login === input_value) {
      show_message("Ви вже отримали дані цього користувача!", "rgb(220, 150, 60)")

      form.reset();
      return;
    }

    if (!input_value) {
      show_message("Ви повинні вести нікнейм користувача", "rgb(220, 150, 60)")

      form.reset();
      return;
    }

    searchUser(input_value)
    submit_change_color("rgb(0, 250, 154)");
  };

  const onInputActivate = () => {
    submit_setColor(defaultStates.submit.color);
    set_input_placeholder(defaultStates.input.placeholder);
  };


  async function fetchRepos() {
    if (!userdata) return;
    if (!userdata.repos_url) return;
    
    await fetch(userdata.repos_url).then((result) => set_user_repos(result));
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


  const submit_change_color = (rgb) => {
    if (!rgb) return;
    if (typeof rgb !== 'string') return;

    submit_setColor(rgb)

    setTimeout(() => {
      submit_setColor(defaultStates.submit.color)
      set_input_placeholder(defaultStates.input.placeholder)
    }, 2000);
  };

  const show_message = (text, rgb) => {
    if (!text) return;
    if (typeof text !== 'string') return;

    if (!rgb) return;
    if (typeof rgb !== 'string') return;


    set_input_placeholder(text);
    submit_change_color(rgb);
  };

  const handleFlooding = () => {
    if (!is_locked && flood_count >= 5) {
      set_lock(true);
      setTimeout(set_lock, 5000, false);
      return;
    };

    if (millis && Date.now() - millis < 1000) set_flood_count(flood_count + 1);

    set_millis(Date.now());
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
              <Userinfo name={userdata.name || userdata.login} avatar_url={userdata.avatar_url} followers={userdata.followers} following={userdata.following} company={userdata.company} location={userdata.location} created={userdata.created_at} updated={userdata.updated_at}/>

              <div className={styles.userinfo_control}>
                <p className={styles.userinfo_reposcount}>Знайдено {userdata.public_repos} репозиторіїв...</p>

                {userdata && userdata.public_repos > 0 ? (
                  <button onClick={showRepos} className={styles.userinfo_control_btn}>{showrepos_btn ? 'Згорнути' : 'Розгорнути'}</button>
                ) : (<></>)}
              </div> 
            </div>

            <div
              className={styles.user_repos}
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
