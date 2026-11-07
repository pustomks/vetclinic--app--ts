import EditUserInfo from "../../components/EditUserInfo";
import EditUserPassword from "../../components/EditUserPassword";
import styles from "./MyProfilePage.module.css";

export default function MyProfilePage() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.editUserInfo}>
        <EditUserInfo />
      </div>
      <div className={styles.editUserInfo}>
        <EditUserPassword />
      </div>
    </div>
  );
}
