var regxp = /^([a-zA-Z0-9\s])+$/i
var allowedExtensionsImage = /(.jpg|.jpeg|.png|.gif)$/i;
var dateRegexp = /^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/; //formato: año/mes/dia

export const validator = (videogame) => {
  let errors = {};

  if (!videogame.name) {
    errors.name1 = "Must be complete field: Name";
  }
 if (!regxp.test(videogame.name)) {
   errors.name2 = "Name field only allows alphanumeric data";
  }
  // if (!videogame.background_image) {
  //   errors.background_image1 = "Must be complete field: Image";
  // }
  if (!allowedExtensionsImage.test(videogame.background_image)) {
    errors.background_image2 = "Only jpg, jpeg, png, gif extensions are allowed";
  }
   if (!videogame.description) {
     errors.description1 = "Must be complete field: Image";
   }
 if (videogame.description.length > 100 || videogame.description.length < 30) {
   errors.description2 = "Description must be 10 and 100 characters";
 }
  if (!videogame.platforms) {
    errors.platforms1 = "Must be complete field: Platforms";
  }
  if (videogame.platforms.length < 1) {
    errors.platforms2 = "The game must have at least one platform.";
  }
  if (!videogame.released) {
    errors.released1 = "Must be complete field: Date";
  }
  if (!dateRegexp.test(videogame.released)) {
    errors.released2 = "Incorrect date. Correct format: aaaa/mm/dd";
  }
  if (!videogame.rating) {
    errors.rating1 = "Must be complete field: Rating";
  }
  if ( videogame.rating <1 || videogame.rating > 10) {
    errors.rating2 = "Rating must be between 1 and 5";
  }
if (!videogame.rating_top || videogame.rating_top < 1 || videogame._top > 5) {
  errors.rating_top1 = "Rating top must be between 1 and 5";
  }
  if (videogame.GenreId.length < 1) {
  errors.GenreId1 = "Must select a minimun two genres"
  }
  // if (videogame.GenreId === videogame.GenreId) {
  //   errors.GenreId2=("Genre is alredy select");
  // }
  return errors;
};
