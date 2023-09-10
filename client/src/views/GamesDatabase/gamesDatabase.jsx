import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";

import { getVideogamesDB, deleteVideogame } from "../../redux/actions";

import styles from "./gamesDatabase.module.css";

const GamesDatabase = () => {
 
  const database = useSelector((state) => state.database);
  console.log(database);
  const dispatch = useDispatch();

//  const id  = useParams();
  

  useEffect(() => {
    dispatch(getVideogamesDB())
  }, [dispatch])

//  const handleOnClick = () => {
//    deleteVideogame(id)
//   }; 

  return (
    <div className={styles.all}>
      <div>
        <h1 className={styles.title}>Created Videogames</h1>
        <div className={styles.cardList}>
          {database &&
            database.map((videogame) => {
              return (
                <div className={styles.cardin}>
                  <div className={styles.in}>
                  <h1 className={styles.name}>Name: {videogame.name}</h1>
                  {/* <h1 className={styles.name}>{videogame.id}</h1> */}
                  <h3 className={styles.genres}>
                    {" "}
                    Genres:<p></p>
                    {videogame.Genres.map((g) => g.name).join(" - ")}
                  </h3>
                  <h3 className={styles.genres}>
                    Platforms: {videogame.platforms}
                  </h3>
                  <h3 className={styles.genres}> Rating: {videogame.rating}  - Rating Top: {videogame.rating_top}</h3>
                  <h3 className={styles.genres}>
                   
                  </h3>
                  <div className={styles.description}>
                    <h5>{videogame.description}</h5>
                  </div>
                  <div className={styles.button}>
                    {/* <button>UPDATE</button> */}
                    <Link to={`/created/${videogame.id}`}>
                      <button className={styles.delete}>X</button>
                    </Link>
                  </div>
                </div>
          </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default GamesDatabase;
