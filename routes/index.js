const router = require('express').Router();
const userRouter = require('./userRoutes');
const movieRouter = require('./movieRoutes');
const { tokenAuth } = require('../middlewares/auth');
const NotFoundError = require('../utils/errors/notFoundError');
const { login, createUser } = require('../controllers/user');
const { validateLogin, validateRegistration } = require('../utils/validators/userValidator');
const { NOT_FOUND_ERROR_TEXT, SIGNOUT_TEXT } = require('../utils/constants');

router.post('/signin', validateLogin, login);
router.post('/signup', validateRegistration, createUser);
router.get('/signout', tokenAuth, (req, res) => {
  res.clearCookie('jwt').send({ message: SIGNOUT_TEXT });
});

router.use('/users', tokenAuth, userRouter);
router.use('/movies', tokenAuth, movieRouter);
router.use('*', tokenAuth, (req, res, next) => {
  next(new NotFoundError(NOT_FOUND_ERROR_TEXT));
});

module.exports = router;
