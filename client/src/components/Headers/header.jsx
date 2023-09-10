import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { orderByAz, orderByRating, filterByDB, filterGenres, getVideogames, getGenres} from "../../redux/actions";

import styles from "./header.module.css";



const Header = () => {
  // const [aux, setAux] = useState(false);

  const dispatch = useDispatch();
 
  
  // const allVideogames = useSelector((state) => state.allVideogames);
  const genres = useSelector((state) => state.genres);
// console.log(genres);

  const handleOrder = (event) => {
    // setAux(!aux);
    //  if (event.target.value === "all") dispatch(getVideogames());
    dispatch(orderByAz(event.target.value));
  };

  const handleOrderRating = (event) => {
    // setAux(!aux);
    // if (event.target.value === "all") dispatch(getVideogames());
    dispatch(orderByRating(event.target.value));
  };
  
  // useEffect(() => {
  //   dispatch(getGenres());
  //   // dispatch(getVideogames())
  // }, [dispatch]);
  
  const handleFilterGenres = (event) => {
    event.preventDefault();
    if (event.target.value === "All") {
      dispatch(getVideogames());
    }
    dispatch(filterGenres(event.target.value));
  };

  const handleFilterDb = (event) => {
    event.preventDefault();
    dispatch(filterByDB(event.target.value))
  };
  
  const handleReset =  () => {
  dispatch(getVideogames());
  }
  
 
  
    return (
      <div>
        {/* <button onClick={(e) => handleClick(e)}>ALL VIDEOGAMES</button> */}
        <div className={styles.container}>
          <div className={styles.containerFilters}>
            <select name="order" autoFocus onChange={(e) => handleOrder(e)}>
              <option selected>Alphabetical Order:</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
            </select>

            <select
              name="orderRating"
              autoFocus
              onChange={(e) => handleOrderRating(e)}
            >
              <option selected>Rating Order:</option>
              <option value="Lower Rating">Lower Rating</option>
              <option value="Higher Rating">Higher Rating</option>
            </select>

            {/* Para mí all no es una opcion en los generos */}
            <select name="filter" onChange={(e) => handleFilterGenres(e)}>
              <option selected htmlFor="filter" value="All">
                Filter by Genre:
              </option>
              {genres.map((g) => (
                <option value={g.name}>{g.name}</option>
              ))}
            </select>

            {/* *ver traduciopn con la Vico  */}
            <select name="filterDB" onChange={handleFilterDb}>
              <option selected>Filter by Videogames Created:</option>
              <option value="db"> Created </option>
              <option value="api"> Not created </option>
            </select>
            <button className={styles.reset} onClick={handleReset}>RESET FILTER</button>
          </div>
        </div>
      </div>
    );
  };


export default Header