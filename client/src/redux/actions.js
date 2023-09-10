//la action hace una llamada al store
//action:objeto que describe lo que va a pasar o paso

import axios from "axios";

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_VIDEOGAMES_DB = "GET_VIDEOGAMES_DB";
export const GET_BY_NAME = "GET_BY_NAME";
export const POST_VIDEOGAME = "POST_VIDEOGAME"
export const GET_BY_ID = "GET_BY_ID";
export const CLEAR_DETAIL = "CLEAR_DETAIL"
export const GET_GENRES = "GET_GENRES";
export const GET_PLATFORMS = "GET_PLATFORMS";
export const FILTER_GENRES = "FILTER_GENRES";
export const FILTER_BY_DB = "FILTER_BY_DB";
export const ORDER_BY_AZ = "ORDER_BY_AZ";
export const ORDER_BY_RATING = "ORDER_BY_RATING";
export const DELETE_VIDEOGAME = "DELETE_VIDEOGAME"

export const getVideogames =  () => {
       return async (dispatch) => {
         const response = await axios("/videogame");
        //  console.log(response);
         
         return dispatch({
           type: GET_VIDEOGAMES,
           payload: response.data  //me llega bien la informacion
        }
        )
    }
};

export const getVideogamesDB = () => {
  return async (dispatch) => {
    const {data} = await axios("/videogame/created");
    // console.log(data);
     return dispatch({
      type: GET_VIDEOGAMES_DB,
      payload: data, 
    });
  };
};

export const getGenres = () => {
  return async (dispatch) => {
    const response = await axios("/genres");
    return dispatch({
      type: GET_GENRES,
      payload: response.data
    });
  };
};

export const getPlatforms = () => {
  return async (dispatch) => {
    const response = await axios("/videogame/platforms");
    return dispatch({
      type: GET_PLATFORMS,
      payload: response.data,
    });
  };
};

export const getByName = (name) => {
  return async (dispatch) => {
    try {
      const response = await axios(`/videogame?name=${name}`);
      // console.log(response);
      // if(!response.data) alert("No hay videojuegos con ese nombre, intente nuevamente");
    return dispatch({
      type: GET_BY_NAME,
      payload: response.data,
    });
      
    } catch (error) {
      
      alert("error:" + error.data)
    }
  };
};
//detail:
export const getById = (id) => {
  return async (dispatch) => {
    const response = await axios(`/videogame/${id}`);
    // console.log(response);
    return dispatch({
      type: GET_BY_ID,
      payload: response.data
    });
  };
};

export const postVideogame = (data) => {
//   // console.log(data);
//   try {
//     return async (dispatch) => {
//     const newVideogame = await axios.post("/videogame", data);
//     console.log(data);
//     return dispatch({
//       type: POST_VIDEOGAME,
//       payload: newVideogame,
      
//     });
//   };
//   } catch (error) {
//     console.log(error);
//    alert("No se puede crear la actividad. Error: " + error.response.data);
//    return false
//   }
     return function (dispatch) {
       return axios
         .post("/videogame", data)
         .then((response) => response.data)
         .then((response) => {
           dispatch({ type: POST_VIDEOGAME, payload: response });
          //  alert("Congratulations, Videogame has been created!! 👏🏼👏🏼");
           return true;
         })
         .catch((error) => {
          
           alert("Cannot creat videogame. Error: " + error.response.data);
           return false;
         });
     };
};

//me salio el clear detail estoy feliz!!!
export const clearDetail = () => {
  return (
    {
      type: CLEAR_DETAIL,
    }
  );
};

export const filterGenres = (payload) => dispatch =>{
  return dispatch ({
    type: FILTER_GENRES,
    payload: payload,  //objeto literal no es necesario
  });
};

export const filterByDB = (payload) => {
  console.log(payload);
  return {
    type: FILTER_BY_DB,
    payload: payload,
  };
};

export const orderByAz = (order) => {
  console.log(order);
return {
  type: ORDER_BY_AZ,
  payload: order,
};

};

export const orderByRating = (order) => {
console.log(order);
  return {
  type: ORDER_BY_RATING,
  payload: order,
  };
};

export const deleteVideogame = (id) => {
  console.log(id);
  return async (dispatch) => {
     const response = await axios.delete(`/videogame/created/${id}`);
    console.log(response);
    return dispatch({
      type: DELETE_VIDEOGAME,
      payload: response.data,
    });
  };
};
// //se solicita la informacion
// //que queremos hacer con el estado
// //payload es la data
