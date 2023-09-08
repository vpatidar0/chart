import styles from "../styles.module.css";
const Header = ({ pointData }) => {
  return (
    <div>
      <div className={styles.title}>
        {(pointData || []).map((point) => {
          return (
            <div className={styles.value} key={point}>
              {point.toUpperCase()}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Header;
