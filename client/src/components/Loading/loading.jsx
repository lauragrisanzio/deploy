import styles from "./loading.module.css";

function Loading() {
  return (
    <div>
      <div className={styles.loading}>
        {/* <h1>Loading ...</h1> */}
        <img className={styles.gif } src="https://i.gifer.com/5IPe.gif" alt="" />
      </div>
    </div>
  );
}
export default Loading;
