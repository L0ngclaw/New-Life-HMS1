import express from 'express'
import {authUser, checkIfRegistered, getUser} from "../controllers/user";
import {checkUser} from "../middlewares/auth";

const router = express.Router()

router.post('/auth', authUser);
router.post('/is-registered', checkIfRegistered);
router.get('/get-user', checkUser, getUser);

module.exports = router;
