//hook para controlar el ciclo de vida: useEffect
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";


import SearchBar from "../../components/SearchBar/searchBar";
import Loading from "../../components/Loading/loading";
import Cards from "../../components/Cards/cards";
import Header from "../../components/Headers/header";
import Paginate from "../../components/Paginate/paginate";

import { getGenres, getVideogames } from "../../redux/actions";

// import NavBar from "../../components/navbar/navbar.component";
// import Header from "../../components/headers/header.component";
// import Pagination from "../../components/pagination/pagination.component";

import styles from"./home.module.css";


function Home() {
  const dispatch = useDispatch(); //se le envia una action al estado

  //componente quiero que estes suscripto a cualquier cambio que ocurra en el estado allVideogames
  const allVideogames = useSelector((state) => state.allVideogames); //se indica al componente de que estado depende, a que estado quiero estar suscripto
  // console.log(allVideogames);
  
  useEffect(() => {
    dispatch(getVideogames()); //1° parametro lo que queremos ejecutar al momento de hacer el dispatch, cuando se monta
    dispatch(getGenres());
    // return(()=>{}) //=> en esta callback se ejecuta una fx al momento de desmontar
  }, [dispatch]); //2° parametro una array de dependecia



  //PAGINADO!!!!:
  const [currentPage, setCurrentPage] = useState(1); //current page= pagina actual
  const [perPage, setPerPage] = useState(15)
  //const videogamesPerPage = 15;//lo piuse como estado
  const totalVideogames = allVideogames.length;
  const totalPages = Math.ceil(totalVideogames / perPage);  //cantidad de paginas que va a tener la SPA
  const numberStart = (currentPage - 1) * perPage;
  const numberEnd = (currentPage - 1) * perPage + perPage;
  const slicePage = allVideogames.slice(numberStart, numberEnd)

  return (
    <div className={styles.home}>
      <div>
      <div className={styles.header}>
          <Header />
        
      </div>
        {/* <h1 className={styles.titleHome}>VIDEOGAME´S WORLD</h1> */}
        
         <SearchBar />
        <Paginate
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
       
        {allVideogames.length ?
          <div className={styles.cardList}>
            <Cards allVideogames={allVideogames} slicePage={slicePage} />
          </div>
          : (
            <div>
              <h3 className={styles.loading}>Loading...</h3>
              <Loading />
            </div>
          )}
      </div>
    </div>
  );
};

//le pasa como props el nombre no el destructuring 

export default Home;

//Cards: componente que se renderiza dentro de otro
//le pasa como props el nombre no el destructuring 