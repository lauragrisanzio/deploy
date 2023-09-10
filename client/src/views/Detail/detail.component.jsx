import Loading from "../../components/Loading/loading.jsx";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getById, clearDetail } from "../../redux/actions.js";

import styles from "./detail.module.css";

const Detail = () => {

  const detail = useSelector((state) => state.detail);
  // console.log(detail);
  const dispatch = useDispatch();
// const history = useNavigate()

  const { id } = useParams();
  console.log(id);

  // const [details, setDetails] = useState(true)

  useEffect(() => {
    dispatch(getById(id))
   //funcion que limpie el detail
    return () => {
      dispatch(clearDetail());
    };      
  }, [dispatch,id])
  
const defaultImage="../../../assets/detail/descarga.jpeg";
  return (
    <div>
      <div className={styles.h1}>
        <h1>VIDEOGAME DETAIL</h1>
      </div>
      <br />
      <div className={styles.container}>
        {detail.name ? (
          <>
            <h1>{detail.name}</h1>
            <br />
            {detail.background_image ? (
              <img
                className={styles.img}
                src={detail.background_image}
                alt="Imagen del juego"
              />
            ) : (
              <img
                className={styles.img}
                src={detail.defaultImage}
                alt="Imagen del juego"
              />
            )}
            {/* imagen por defecto??*/}

            <p>
              <h3>
                <u>Name:</u>
              </h3>
              <p></p>
              {detail.name} (Id: {detail.id})
            </p>
            <br />
            <p>
              <h3>
                <u>Platforms:</u>
              </h3>
              <p></p>
              {detail.platforms}
            </p>
            {/* {detail.platforms.length ===2 ?} */}
            <br />
            <p>
              <h3>
                <u>Description:</u>
              </h3>
              <p></p>
              {detail.description
                .split("<p>")
                .join("")
                .split("<br />")
                .join("")
                .split("</p>")
                .join("")}
            </p>
            <br />
            <p>
              <h3>
                <u>Date create at:</u>
              </h3>{" "}
              {detail.released}
            </p>
            <br />
            <p>
              <h3>
                <u>Rating:</u>
              </h3>{" "}
              {detail.rating}
            </p>
            <br />
            <p>
              <h3>
                <u>Rating Top:</u>
              </h3>{" "}
              {detail.rating_top}
            </p>
            <br />
            <p>
              <h3>
                <u>Genres:</u>
              </h3>

              {detail.genres?.map((g) => (g.name ? g.name : g)).join(",  ")}
            </p>
          </>
        ) : (
          <div>
            {/* <h3>Loading...</h3> */}
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
};

export default Detail;
