import { Link } from "react-router-dom";
// import { useDispatch, } from "react-redux";
// import { getVideogames } from "../../redux/actions";

import styles from "./navbar.module.css"


const NavBar = () => {

  // const dispatch = useDispatch()

  // // const onChangeHome = () => {
  // //   dispatch(getVideogames())
  // // }
  return (
    <div>
      <div className={styles.NavBar}>
        <Link className={styles.link} to="/home">HOME</Link>
        <h1 className={styles.titleHome}>VIDEOGAME´S WORLD</h1>
        <Link className={styles.linkdatabase} to="/created">VIDEOGAMES CREATED</Link>
        <Link className={styles.link} to="/form">CREATE</Link>
      </div>
    </div>
  );
};

export default NavBar;