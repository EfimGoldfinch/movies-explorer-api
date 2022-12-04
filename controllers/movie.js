const Movie = require('../models/movie');

const NotFoundError = require('../utils/errors/notFoundError');
const DataError = require('../utils/errors/dataError');
const ForbiddenError = require('../utils/errors/forbiddenError');
const {
  DATA_ERROR_TEXT,
  FORBIDDEN_ERROR_TEXT,
  FILM_NOT_FOUND_ERROR_TEXT,
  FILM_DELETE_TEXT,
} = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch((err) => next(err));
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new DataError(DATA_ERROR_TEXT));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findOne({ movieId: req.params.movieId })
    .orFail(new NotFoundError(FILM_NOT_FOUND_ERROR_TEXT))
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        return next(new ForbiddenError(FORBIDDEN_ERROR_TEXT));
      }
      return movie.remove().then(() => res.send({ message: FILM_DELETE_TEXT }));
    })
    .catch((err) => next(err));
};
