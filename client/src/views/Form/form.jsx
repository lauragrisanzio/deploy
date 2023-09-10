import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { getVideogames, postVideogame, getGenres, getPlatforms } from "../../redux/actions";
import Loading from "../../components/Loading/loading"

import { validator } from "./validator";
import styles from "./form.module.css";


const Form = () => {

  // const allVideogames = useSelector((state) => state.allVideogames);
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);
  // console.log(platforms);
  
  const dispatch = useDispatch();
  const history = useNavigate();

  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getGenres());
    dispatch(getPlatforms());
  }, [dispatch]);
  
  const [values, setValues] = useState({  //proyectorick como inputs pero lo entiendo mas como values
    name: "",
    background_image: "",
    description: "",
    platforms: [],
    released: "",
    rating: 0,
    rating_top: 0,
    GenreId: []
  });

  const [errors, setErrors] = useState({}); //estado de los errores

  //tomamos los datos y lo guardamos en el estado:
  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value.toUpperCase();
    setErrors(validator({ ...values, [property]: value }));
    //seteamos los errores en nuestro estado
    setValues({ ...values, [property]: value });  //agregamos al estado local las propiedades(name) con sus valores
    //actualizamos el estado values
  };

  const handleSelectGenres = (event) => {
    const property = event.target.name;
    const value = event.target.value.toUpperCase();
    setErrors(validator({ ...values, [property]: value }));
    setValues({
      ...values,
      GenreId: [...values.GenreId, event.target.value]
    });
  };

   const handleSelectPlatforms = (event) => {
     const property = event.target.name;
     const value = event.target.value.toUpperCase();
     setErrors(validator({ ...values, [property]: value }));
     setValues({
       ...values,
       platforms: [...values.platforms, event.target.value],
     });
  };

  const handleDeletePlatforms = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      platforms: values.platforms.filter((platform) => platform !== e.target.value),
    });
  };
  
  const handleDeleteGenre = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      GenreId: values.GenreId.filter((genre) => genre !== e.target.value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      values.name === "" ||
      // values.background_image === "" ||
      values.rating=== 0 || values.released === "" ||
      values.description === "" ||
      values.GenreId.length === 0 ||
      values.platforms.length === 0
    )
      return alert("You must complete all fields");
   
    dispatch(postVideogame(values))
     setValues({
      name: "",
      background_image:"",
      description: "",
      platforms: [],
      released: "",
      rating: 0,
      rating_top: 0,
      GenreId: [],
      // genreName:[]
     });
  alert("Congratulations, Videogame has been created!! 👏🏼👏🏼");
  history("/created") //nuevo, ver si funciona!!!!! no me convence como queda
  }
  // console.log(values);
  return (
    <div className={styles.container}>
      {/* <div className={styles.form}> */}
      <div className={styles.title}>
        <div className={styles.title1}>
          <h1>A NEW VIDEOGAME?</h1>
          <h2>CREATE IT! </h2>
        </div>
      </div>
      <div className={styles.options}>
        {platforms.length ? (
          <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
            <fieldset>
              <label htmlFor="name">Name:</label>
              <input
                placeholder="Write a videogames´s game"
                type="text"
                value={values.name.toUpperCase()}
                name="name"
                onChange={(e) => handleChange(e)}
              />
              {errors.name1 ? (
                <p className={styles.p}>{errors.name1}</p>
              ) : (
                <p className={styles.p}>{errors.name2}</p>
              )}

              <br />
              <div>
                <label htmlFor="background_image"> Image:</label>
                <input
                  type="text"
                  value={values.background_image}
                  name="background_image"
                  onChange={(e) => handleChange(e)}
                />
                {errors.background_image1 ? (
                  <p className={styles.p}>{errors.background_image1}</p>
                ) : (
                  <p className={styles.p}>{errors.background_image2}</p>
                )}
              </div>
              <br />
              <div>
                <label htmlFor="description"> Description:</label>
                <br />
                <textarea
                  autoCapitalize="true"
                  type="textarea"
                  rows="3"
                  cols="20"
                  name="description"
                  placeholder="Describe the videogame"
                  value={values.description}
                  onChange={(e) => handleChange(e)}
                />
                {errors.description1 ? (
                  <p className={styles.p}>{errors.description1}</p>
                ) : (
                  <p className={styles.p}>{errors.description2}</p>
                )}
              </div>
              <br />
              <div>
                <label htmlFor="released"> Creation date:</label>
                <br />
                <input
                  type="text"
                  value={values.released}
                  name="released"
                  placeholder="Creation date"
                  onChange={(e) => handleChange(e)}
                />
                {errors.released1 ? (
                  <p className={styles.p}>{errors.released1}</p>
                ) : (
                  <p className={styles.p}>{errors.released2}</p>
                )}
              </div>
            </fieldset>
            <br />
            <fieldset>
              <div className={styles.select}>
                <label htmlFor="platforms"> Platforms:</label>
                <select
                  // value={values.platforms} //ESTO ES NUEVO VER SI FUNCIONA!!!
                  name="platforms"
                  size={1}
                  onChange={(e) => handleSelectPlatforms(e)}
                >
                  {/* <option selected>Platform</option> */}
                  {platforms.map((p, i) => (
                    <option key={i} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                {errors.platforms1 ? (
                  <p className={styles.p}>{errors.platforms1}</p>
                ) : (
                  <p className={styles.p}>{errors.platforms2}</p>
                )}
                <p>Platforms:</p>
                <div>
                  {values.platforms?.map((platform, i) => {
                    return (
                      <span key={i}>
                        {platform}
                        <button
                          value={platform}
                          onClick={(e) => handleDeletePlatforms(e)}
                        >
                          X
                        </button>
                      </span>
                    );
                  })}
                </div>
                {/* <div className={styles.selectionp}>
                  {values.platforms.join(" - ")}
                </div> */}
              </div>
              <br />
              <div>
                <label htmlFor="rating"> Rating:</label>
                <input
                  name="rating"
                  type="number"
                  value={values.rating}
                  onChange={(e) => handleChange(e)}
                />
                {errors.rating1 ? (
                  <p className={styles.p}>{errors.rating1}</p>
                ) : (
                  <p className={styles.p}>{errors.rating2}</p>
                )}
              </div>
              <br />
              <div>
                <label htmlFor="rating"> Rating Top:</label>
                <input
                  name="rating_top"
                  type="number"
                  value={values.rating_top}
                  onChange={(e) => handleChange(e)}
                />
                {errors.rating_top1 ? (
                  <p className={styles.p}>{errors.rating_top1}</p>
                ) : (
                  <p className={styles.p}>{errors.rating_top2}</p>
                )}
              </div>
              <br />
              <div className={styles.select}>
                <label htmlFor="genres" selected>
                  Select genres:
                </label>
                <select
                  // value={values.GenreId} //ESTO ES NUEVO VER SI FUNCIONA!!!
                  name="genres"
                  // size={1}
                  onChange={(e) => handleSelectGenres(e)}
                >
                  {genres.map((g, i) => (
                    <option key={i} value={g.id}>
                      {g.id}-{g.name}
                    </option>
                  ))}
                </select>
                {errors.GenreId1 ? (
                  <p className={styles.p}>{errors.GenreId1}</p>
                ) : (
                  <p className={styles.p}>{errors.GenreId2}</p>
                )}
                <p>Code genre:</p>
                <div>
                  {values.GenreId?.map((genre, index) => {
                    return (
                      <span key={index}>
                        {genre}
                        <button
                          value={genre}
                          onClick={(e) => handleDeleteGenre(e)}
                        >
                          X
                        </button>
                      </span>
                    );
                  })}
                </div>
                {/* <div className={styles.selection}>
                  {values.GenreId.join(" - ")}
                </div> */}
              </div>
            </fieldset>
            <div>
              <button className={styles.button} type="submit">
                CREATE
              </button>
            </div>
          </form>
        ) : (
          <div>
            {/* <h3 className={styles.loading}>Loading...</h3> */}
            <Loading />
          </div>
        )}
      </div>
    </div>
    // </div>
  );
  };


export default Form;

//Nombre.
// Imagen.
// Descripción.
// Plataformas.
// Fecha de lanzamiento.
// Rating.
// Posibilidad de seleccionar/agregar varios géneros en simultáneo.
// Botón para crear el nuevo videojuego.
