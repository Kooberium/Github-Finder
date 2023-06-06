import React, { useState, useEffect, useRef } from "react";

import Userinfo from '../Userinfo/Userinfo';
import List from "../List/List";

import styles from "./usersearch.module.css";

import fetch from "../../api/fetch";

const Usersearch = () => {
  const form_ref = useRef(null)
  const userrepos_container = useRef(null);

  const defaultStates = {
    input: { placeholder: "Введіть нікнейм користувача Github" },
    submit: { color: "rgb(47, 79, 79)", value: "Пошук" },
    showrepos_btn: { color: "rgb(0, 204, 255)", value: "Відобразити" },
  };

  const [submit_color, submit_setColor] = useState(
    defaultStates.submit.color || "rgb(0,0,0"
  );

  const [usereposcontainer_opacity, set_usereposcontainer_opacity] = useState("0");
  const [usereposcontainer_display, set_usereposcontainer_display] = useState("none");

  const [input_placeholder, input_setPlaceholder] = useState(defaultStates.input.placeholder);

  const [userdata, setUserdata] = useState({
    login: "torvalds",
    id: 1024025,
    node_id: "MDQ6VXNlcjEwMjQwMjU=",
    avatar_url: "https://avatars.githubusercontent.com/u/1024025?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/torvalds",
    html_url: "https://github.com/torvalds",
    followers_url: "https://api.github.com/users/torvalds/followers",
    following_url:
      "https://api.github.com/users/torvalds/following{/other_user}",
    gists_url: "https://api.github.com/users/torvalds/gists{/gist_id}",
    starred_url: "https://api.github.com/users/torvalds/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/torvalds/subscriptions",
    organizations_url: "https://api.github.com/users/torvalds/orgs",
    repos_url: "https://api.github.com/users/torvalds/repos",
    events_url: "https://api.github.com/users/torvalds/events{/privacy}",
    received_events_url:
      "https://api.github.com/users/torvalds/received_events",
    type: "User",
    site_admin: false,
    name: "Linus Torvalds",
    company: "Linux Foundation",
    blog: "",
    location: "Portland, OR",
    email: null,
    hireable: null,
    bio: null,
    twitter_username: null,
    public_repos: 7,
    public_gists: 0,
    followers: 184391,
    following: 0,
    created_at: "2011-09-03T15:26:22Z",
    updated_at: "2023-05-27T22:53:46Z",
  });

  const [userrepos, setUserRepos] = useState(null);
  const [repos_show, set_reposShow] = useState(false);
  const [showrepos_btn, set_showrepos_btn] = useState({value: defaultStates.showrepos_btn.value, color: defaultStates.showrepos_btn.color});

  useEffect(() => {
    // github_userdata()
  }, []);

  const searchUser = (username) => {
    console.log('Треба знайти - '+username);
    // fetch(userdata.repos_url).then((result) => setUserRepos(result));
  };

  const onUserSearch = (e) => {
    e.preventDefault();

    if (!form_ref) return;

    const form = form_ref.current;
    
    const input = form.elements['controlpanel_input'];
    const submit_btn = form.elements['controlpanel_submit'];


    const input_value = input.value;

    if (!input_value) {
      submit_setColor("rgb(220, 150, 60)");
      input_setPlaceholder("Ви повинні вести нікнейм користувача");
      return;
    }

    searchUser(input_value)
    submit_setColor("rgb(0, 250, 154)");
  };

  const onInputActivate = () => {
    submit_setColor(defaultStates.submit.color);
    input_setPlaceholder(defaultStates.input.placeholder);
  };

  const showRepos = () => {
    if (repos_show) {
      set_usereposcontainer_opacity(0);
      set_showrepos_btn(defaultStates.showrepos_btn);
      setTimeout(() => {
        set_reposShow(!repos_show);
        set_usereposcontainer_display('none')
      }, 500);
    } else {
      set_reposShow(!repos_show);
      set_showrepos_btn({
        ...showrepos_btn,
        value: "Згорнути",
      });
      set_usereposcontainer_opacity(1);
      set_usereposcontainer_display('block')
    }
  };

  const getRepos = () => {
    if (!userdata) return;
    if (!userdata.repos_url) return;

    fetch(userdata.repos_url).then((result) => setUserRepos(result));

    showRepos();
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
              <Userinfo name={userdata.name}/>

              <div className={styles.userinfo_control}>
                <p>Знайдено {userdata.public_repos} репозиторіїв...</p>

                {userdata && userdata.public_repos > 0 ? (
                  <button onClick={getRepos} className={styles.userinfo_control_btn}>{showrepos_btn.value}</button>
                ) : (<></>)}
              </div> 
            </div>

            <div
              className={styles.user_repos}
              ref={userrepos_container}
              style={{ opacity: usereposcontainer_opacity, display: `${usereposcontainer_display}` }}
            >
              {userrepos && repos_show ? (
                <List name={userdata.name} data={userrepos}></List>
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
