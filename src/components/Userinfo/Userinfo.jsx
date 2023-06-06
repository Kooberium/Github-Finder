import styles from './userinfo.module.css'

const Userinfo = (props) => {
    const name = props.name;
    const avatar = props.avatar_url;
    const followers = props.followers;
    const following = props.following;
    const created_at = props.created;
    const updated_at = props.updated
    const company = props.company;
    const location = props.location;

  return (
        <div className={styles.userinfo_window}>
            <ul className={styles.userinfo_list}>
                <li className={styles.userinfo_listitem}>
                    <img src="" alt="Name" />
                    <p>{name}</p>
                </li>
                <li className={styles.userinfo_listitem}>

                </li>
                <li className={styles.userinfo_listitem}>

                </li> 
            </ul>
        </div>
  )
}

export default Userinfo



    {/* <div className={styles.userinfo_row}>
                <img
                  className={styles.userinfo_avatar}
                  src={userdata.avatar_url}
                  alt="Avatar"
                />
                <p className={styles.userinfo_name}>{userdata.name}</p>
              </div>
              <span className={styles.userinfo_line}></span>
              <div className={styles.userinfo_row_2}>
                <p>Підприщиків:{userdata.followers}</p>
                <p>Підписок:{userdata.following}</p>
              </div>
              <span className={styles.userinfo_line}></span>

              <div className={styles.userinfo_row_2}>
                <p>
                  Створено: {new Date(userdata.created_at).toLocaleDateString()}
                </p>
                <p>
                  Оновлено: {new Date(userdata.updated_at).toLocaleDateString()}
                </p>
              </div>

              <span className={styles.userinfo_line}></span>

              <div className={styles.userinfo_row_2}>
                <p>Компанія: {userdata.company}</p>
                <p>Проживання: {userdata.location}</p>
              </div>

              <span className={styles.userinfo_line}></span>
              */}