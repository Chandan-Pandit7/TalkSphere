import express from 'express';
const router = express.Router();

import { postSignup,
        postLogin,
        postLogout,
        postForgotPassword,
        postUpdateProfile,
        checkAuth
 } from '../controllers/auth.controller.js';
 
import { verifyjwt } from '../middlewares/verifyJWT.middleware.js';


// router.post('/signup',upload.single("profilePic"),postSignup);
router.post('/signup',postSignup);
router.post('/login',postLogin);
router.post('/logout',postLogout);
router.post('/forgot-password',postForgotPassword);
router.get('/check',verifyjwt,checkAuth);
router.post('/update-profile',verifyjwt,postUpdateProfile);


export default router;