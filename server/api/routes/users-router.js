import express from "express";
import * as usersController from '../controllers/users-controller.js';

const router = express.Router();

router.route('/users')
    .post(usersController.post);

router.route('/users/login')
    .post(usersController.validatePw);

router.route('/users/:id')
    .put(usersController.update)
    .delete(usersController.remove);

router.route('/users/:id/pic')
    .post(usersController.addUploadProfileImg)
    .get(usersController.getProfileImg);

router.route('/users/:id/contacts')
    .get(usersController.getFriends)
    .post(usersController.addFriend)
    .delete(usersController.removeFriend);

export default router;