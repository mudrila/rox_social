const Router = require('express').Router;
const path = require('path');
const verifyToken = require('../middlewares/auth/verifyToken');
const multer = require('multer');
const UserController = require('./controller');

let userRouter = Router();
const avatarUpload = multer({ dest: path.join(__dirname, '../../../tmp/avatars')});

userRouter.route('/registration').post(UserController.signUp);
userRouter.route('/login').post(UserController.login);
userRouter.route('/:userID/details').get(verifyToken, UserController.getDetails);
userRouter.route('/:userID/avatar').post(verifyToken, avatarUpload.single('avatar'), UserController.uploadAvatar);
userRouter.route('/:userID/avatar').get(UserController.getAvatar);
userRouter.route('/search').get(verifyToken, UserController.searchUsers);
userRouter.route('/:userID/subscribe').post(verifyToken, UserController.subscribe);
module.exports =  userRouter;
