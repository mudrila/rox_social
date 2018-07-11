import { Router } from 'express'
import  verifyToken  from '../middlewares/auth/verifyToken'
import multer from 'multer'
import * as UserController from './controller'
let userRouter = Router();
const avatarUpload = multer({ dest: 'tmp/avatars/'});

userRouter.route('/registration').post(UserController.signUp);
userRouter.route('/login').post(UserController.login);
userRouter.route('/:userID/avatar').post(verifyToken, avatarUpload.single('avatar'), UserController.uploadAvatar);
userRouter.route('/:userID/avatar').get(UserController.getAvatar);

module.exports =  userRouter;