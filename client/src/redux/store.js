import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducer";
import thunkMiddleware from "redux-thunk";

const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunkMiddleware))
);

export default store;

//redux: es un manejador de estados (objeto), el estado
//le dice a react cuando debe renderizar un componente
//solo redux contiene el estado (fuente de verdad)
//facilita el manejo de estados al tener un solo lugar donde realizar la modificacion de estados
//solo redux modifica el estado, lo modifica y lo devuelve a react
//redux almacena el estado en el store

//thunk es un middleware(mediador-fx que hace algo antes de que se ejecute el flujo de informacion) que ayuda a manejar la asincronia

//aca se conecta redux con react