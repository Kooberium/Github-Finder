import React, { useState, useEffect, useRef } from "react";

import Userinfo from "../../components/Userinfo/Userinfo";
import List from "../../components/Reposlists/Reposlists";

import styles from "./usersearch.module.css";

import fetch from "../../api/fetch";
import env from "react-dotenv";

const Usersearch = () => {
  const formRef = useRef(null);

  const defaultStates = {
    input: { placeholder: "Введіть нікнейм користувача Github" },
    submit: { color: "rgb(47, 79, 79)", value: "Пошук" },
  };
  
  const [submitColor, submitSetColor] = useState(
    defaultStates.submit.color || "rgb(0,0,0)"
  );

  const [useReposContainerOpacity, setUserReposContainerOpacity] =
    useState("0");

  const [inputPlaceholder, setInputPlaceholder] = useState(
    defaultStates.input.placeholder
  );
  const [inputValue, setInputValue] = useState("");

  const [showreposBtn, setShowreposBtn] = useState(0);

  const [userRepos, setUserRepos] = useState(null);
  const [userdata, setUserData] = useState(
    null || JSON.parse(localStorage.getItem("github_user_data"))
  );

  //////Система запобігання флудінню кнопкою пошуку
  const [millis, setMillis] = useState(null);
  const [floodCount, setFloodCount] = useState(0);
  const [isLocked, setLock] = useState(false);
  const [showingAlert, setShowingAlert] = useState(false);

  useEffect(() => {
    fetchRepos();
  }, [userdata]);

  const searchUser = async (username) => {
    if (!username) return;
    const API = env.API_URL;
    if (!API) return "API ERROR";

    await fetch(`${API}/${username}`).then((res) => {
      if (res.message && res.message === "Not Found") {
        showMessage("Користувача не було знайдено!", "rgb(220, 55, 60)");
        setInputValue("");
        formRef.current.reset();
        return;
      }

      const toJSON = JSON.stringify(res);
      localStorage.setItem("github_user_data", toJSON);

      setUserData(res);
    }).catch(err => showMessage('Помилка отриминная даних!', "rgb(220, 55, 60)"))
  };

  const onUserSearch = (e) => {
    e.preventDefault();
    if (isLocked) {
      showMessage("Зачекайте хвильку!", "rgb(220, 55, 60)");
      inputResetToDefault(5000);
      setInputValue("");
      return;
    } else {
      handleFlooding();
    }

    if (!formRef) return;
    const form = formRef.current;

    const userName = inputValue;

    if (userdata && userdata.login === userName) {
      showMessage(
        "Ви вже отримали дані цього користувача!",
        "rgb(220, 150, 60)"
      );
      setInputValue("");

      form.reset();
      return;
    }

    if (!userName) {
      showMessage("Ви повинні вести нікнейм користувача", "rgb(220, 150, 60)");
      form.reset();
      return;
    }

    searchUser(userName);
    submitChangeColor("rgb(0, 250, 154)");
  };

  const onInputActivate = () => {
    submitSetColor(defaultStates.submit.color);
    setInputPlaceholder(defaultStates.input.placeholder);
  };

  async function fetchRepos() {
    if (!userdata) return;
    if (!userdata.repos_url) return;

    await fetch(userdata.repos_url)
      .then((result) => setUserRepos(result))
      .catch(err => console.error(err))
  }

  const showRepos = () => {
    if (showreposBtn) {
      setUserReposContainerOpacity(0);
      setTimeout(() => {
        setShowreposBtn(!showreposBtn);
      }, 500);
    } else {
      setShowreposBtn(!showreposBtn);
      setUserReposContainerOpacity(1);
    }
  };

  const submitChangeColor = (rgb) => {
    if (!rgb) return;
    if (typeof rgb !== "string") return;
    submitSetColor(rgb);
  };

  const showMessage = (text, rgb) => {
    if (showingAlert) return;
    if (!text) return;
    if (typeof text !== "string") return;

    if (!rgb) return;
    if (typeof rgb !== "string") return;

    setInputPlaceholder(text);
    submitChangeColor(rgb);
    // setShowingAlert(true)
  };

  const inputResetToDefault = (time = 2000) => {
    if (typeof time !== "number") time = 2000;

    setTimeout(() => {
      submitSetColor(defaultStates.submit.color);
      setInputPlaceholder(defaultStates.input.placeholder);
      setShowingAlert(false);
    }, time);
  };

  const handleFlooding = () => {
    if (!isLocked && floodCount >= 5) {
      setLock(true);
      setTimeout(handleUnlock, 5000);
      return;
    }

    if (millis && Date.now() - millis < 1000) setFloodCount(floodCount + 1);

    setMillis(Date.now());
  };

  const handleUnlock = () => {
    setFloodCount(0);
    setLock(false);
  };

  const clearSearchData = () => {
    setUserData(null);
    setInputValue("");

    if (JSON.parse(localStorage.getItem("github_user_data"))) {
      localStorage.removeItem("github_user_data");
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.main_wrapper}>
        <form className={styles.userfinder_controlpanel} ref={formRef}>
          <input
            onClick={onInputActivate}
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            id="controlpanel_input"
            type="text"
            placeholder={inputPlaceholder}
          />
          <input
            style={{ backgroundColor: submitColor }}
            onClick={onUserSearch}
            id="controlpanel_submit"
            type="submit"
            value={defaultStates.submit.value}
          />
        </form>

        {userdata ? (
          <div className={styles.userfinder_content}>
            <div className={styles.user_info}>
              <Userinfo
                clearData={clearSearchData}
                name={userdata.name || userdata.login}
                avatar_url={userdata.avatar_url}
                followers={userdata.followers}
                following={userdata.following}
                company={userdata.company}
                location={userdata.location}
                created={userdata.created_at}
                updated={userdata.updated_at}
                github_profile={userdata.html_url}
              />

              <div className={styles.userinfo_control}>
                <p className={styles.userinfo_reposcount}>
                  Знайдено {userdata.public_repos} репозиторіїв...
                </p>

                {userdata && userdata.public_repos > 0 ? (
                  <button
                    onClick={showRepos}
                    className={styles.userinfo_control_btn}
                  >
                    {showreposBtn ? "Згорнути" : "Розгорнути"}
                  </button>
                ) : null}
              </div>
            </div>

            <div
              className={styles.userRepos}
              style={{
                opacity: useReposContainerOpacity,
                display: `${showreposBtn ? "block" : "none"}`,
              }}
            >
              {userRepos && showreposBtn ? (
                <List name={userdata.name} data={userRepos}></List>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default Usersearch;
