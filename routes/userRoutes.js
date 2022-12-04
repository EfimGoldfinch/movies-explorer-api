const userRouter = require('express').Router();
const {
  updateUserInfo,
  getMe,
} = require('../controllers/user');
const {
  validateUserInfo,
} = require('../utils/validators/userValidator');

userRouter.get('/me', getMe);
userRouter.patch('/me', validateUserInfo, updateUserInfo);

module.exports = userRouter;
