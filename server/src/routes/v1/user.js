import express from "express";
const router = new express.Router();
import { registerController,loginController,listusersController } from '../../controllers/usercontroller.js'
import {authenticateJWT} from '../../middlewares/authMiddleware.js'
router.post('/login',loginController);

router.post('/register',registerController);

router.get('/listusers',authenticateJWT,listusersController);


export default router;