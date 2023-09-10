// //tambien tiene el estado(lo tiene como tal) pero pertenece al store -
// //aca se declara el estado
//reducer: nuevo estado a mostrar - se encarga de procesar las acciones
import {
  GET_VIDEOGAMES, GET_BY_NAME, POST_VIDEOGAME, GET_BY_ID, CLEAR_DETAIL, GET_GENRES,
  ORDER_BY_AZ, ORDER_BY_RATING, FILTER_GENRES, FILTER_BY_DB, GET_PLATFORMS, GET_VIDEOGAMES_DB,
  DELETE_VIDEOGAME
} from "./actions";


const initialState = {
  allVideogames: [],
  videogames: [], //copia de allVideogames
  database: [],
  detail: [],
  genres: [],
  platforms: [],
};


const rootReducer = (state = initialState, action) => {

  switch (action.type) {
    //de acuerdo a la action type, hace una u otra cosa
    case GET_VIDEOGAMES:
      return {
        ...state,
        allVideogames: action.payload, //el action payload va a ser todos los videogames
        videogames: action.payload,
      };

    case GET_VIDEOGAMES_DB:
      return {
        ...state,
        database: action.payload,
      };

    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };

    case GET_PLATFORMS:
      return {
        ...state,
        platforms: action.payload,
      };

    case GET_BY_NAME:
      if (action.payload.length === 0) {
        alert("Cannot found videogame. Try again!");
        return {
          ...state,
          allVideogames: state.videogames
        }
      }
        
      else { 
      return {
        ...state,
        allVideogames: action.payload, //el action payload va a ser todos los videogames con ese nombre
        videogames: action.payload,
      };
  }

    case GET_BY_ID:
      return {
        ...state,
        detail: action.payload,
      };

    case POST_VIDEOGAME:
      return {
        ...state,
        allVideogames: action.payload, //el action payload va a ser todos los videogames
        videogames: action.payload,
      };

    case CLEAR_DETAIL:
      return {
        ...state,
        detail: [],
      };

    case ORDER_BY_AZ:
      const order = [...state.videogames].sort((a, b) => {
        if (action.payload === "A-Z") {
          return a.name > b.name ? 1 : -1;
        } else {
          return a.name < b.name ? 1 : -1;
        }
      });
      return {
        ...state,
        allVideogames: order,
      };

    case ORDER_BY_RATING:
      const orderRating = [...state.videogames].sort((a, b) => {
        if (action.payload === "Lower Rating") {
          return a.rating > b.rating ? 1 : -1;
        } else {
          return a.rating < b.rating ? 1 : -1;
        }
      });
      return {
        ...state,
        allVideogames: orderRating,
      };

    case FILTER_GENRES:
      // const filterGenres = state.allVideogames;
      const genresFilter =
        action.payload === "All"
          ? state.videogames
          : state.videogames.filter((v) => v.genres.includes(action.payload));
      //   console.log(filterGenres);
      //  console.log(genresFilter);
      return {
        ...state,

        allVideogames: genresFilter,
      };

    case FILTER_BY_DB:
      // const filterV = state.videogames;
      const filterVideogames =
        action.payload === "db"
          ? state.videogames.filter((g) => g.id.toString().includes("-"))
          : //     : state.videogames.filter((g) =>  !g.id.toString().includes("-"));
          action.payload === "api"
          ? state.videogames.filter((g) => !g.id.toString().includes("-"))
          : [...state.videogames];
      // console.log(filterV);
      console.log(filterVideogames);
      return {
        ...state,

        allVideogames: filterVideogames,
      };

    case DELETE_VIDEOGAME:
      return {
        ...state,
        // allVideogames: action.payload, 
        // videogames: action.payload,
        allVideogames: state.videogames.filter((v) => v.id !== action.payload)
      };

    default:
      return state;
  };
}
 
export default rootReducer; 