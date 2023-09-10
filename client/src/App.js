import React from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  Landing,
  Home,
  Detail,
  Form,
  GamesDatabase,
  GamesdbDelete,
} from "./views";
import NavBar from "./components/NavBar/navbar";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001/";

function App() {

  const { pathname } = useLocation();
  
  return (
    <div className="App">
      {pathname !== "/" && <NavBar />}
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/home/:id" element={<Detail />}></Route>
        <Route path="/form" element={<Form />}></Route>
        <Route path="/created" element={<GamesDatabase />}></Route>
        <Route path="/created/:id" element={<GamesdbDelete />}></Route>
      </Routes>
    </div>
  );
}

export default App;
