import styles from './userinfo.module.css'
import company_icon from '../../assets/company_icon.svg';
import location_icon from '../../assets/location_icon.svg';

import util_reducenumber from '../../utils/reducenumber'

const Userinfo = (props) => {
    const name = props.name;
    const avatar = props.avatar_url;
    const followers = props.followers;
    const following = props.following;
    const created_at = props.created;
    const updated_at = props.updated
    const company = props.company;
    const location = props.location;
    const unknown = 'Не вказано';

    const created_date = new Date(created_at).toLocaleDateString();
    const updateddate = new Date(updated_at).toLocaleDateString();

  return (
        <div className={styles.userinfo_window}>
            <ul className={styles.userinfo_list}>
                <li className={styles.userinfo_listitem}>
                    <a target='_blank' href={props.github_profile}><img className={styles.userinfo_avatar} src={avatar}alt="Name" /></a>
                    <p>{name}</p>
                </li>
                <li className={styles.userinfo_listitem}>
                    <img title='Компанія' className={styles.userinfo_icon} src={company_icon}alt="Icon" />
                    <p>{company || unknown}</p>
                </li> 
                <li className={styles.userinfo_listitem}>
                    <img title='Локація' className={styles.userinfo_icon} src={location_icon}alt="Icon" />
                    <p>{location || unknown}</p>
                </li> 
                <li className={styles.userinfo_listitem}>
                    <div className={styles.userinfo_timewrapper}>
                      <p title='Дата створення аккаунту'>{created_date || unknown}</p>
                      <span>|</span>
                      <p title='Дата останнього оновлення'>{updateddate || unknown}</p>
                    </div>
                </li> 
                <li className={styles.userinfo_listitem}>
                    <div className={styles.userinfo_subs}>
                      {/* {Цей метод знизу це мій власний метод який скорочує великі числа і робить їм приставку "k" щоб займали менше простору} */}
                      <p>Підписники  {util_reducenumber(followers)}</p>
                      <p>Підписок {util_reducenumber(following)}</p>
                    </div>
                </li>
            </ul>
        </div>
  )
}

export default Userinfo