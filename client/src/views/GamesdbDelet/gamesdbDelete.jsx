import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { deleteVideogame, getVideogamesDB } from "../../redux/actions";

import styles from "./gamesdbDelete.module.css"

const GamesdbDelete = () => {
    
    // const database = useSelector((state) => state.database);
    // console.log(database);

    const back = useNavigate()
    const dispatch = useDispatch();

    const id = useParams();
    const id1 = Object.values(id).toString()
    // console.log(id1);

    
  const handleOnClick = () => {
      dispatch(deleteVideogame(id1));
      back("/created")
      alert("Videogame was removed")
    
  };
  
    useEffect(() => {
          dispatch(getVideogamesDB());
    })
    
    return (
      <div className={styles.container}>
        <h1>Sure Do you want delete this videogame?</h1>
        <div className={styles.buttons}>
          <button onClick={handleOnClick} className={styles.buttonYes}>
            YES
          </button>
          <Link to={"/created"}>
            <button className={styles.buttonNo}>NO</button>
          </Link>
        </div>
      </div>
    );
}

export default GamesdbDelete;