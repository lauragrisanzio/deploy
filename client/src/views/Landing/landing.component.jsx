import { Link } from "react-router-dom";

import styles from "./landing.module.css";


const Landing = () => {
   
  return (
    <div>
      <div className={styles.landing}>
        <div className={styles.explore}>
          <Link to={"/home"}style={{ textDecoration: 'none' }}>
            <button className={styles.textLanding }>¡play now!</button>
          </Link>
        </div>
      </div>

    </div>
  );
}

export default Landing