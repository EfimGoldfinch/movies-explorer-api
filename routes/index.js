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

router.use(tokenAuth);

router.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: SIGNOUT_TEXT });
});

router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError(NOT_FOUND_ERROR_TEXT));
});

module.exports = router;
