import express from "express"
const router = express.Router();
import {verifyjwt}  from "../middlewares/verifyJWT.middleware.js";

import { postSendMessage ,getMessages,getUsersForSidebar} from "../controllers/message.controller.js";

router.post('/send/:id',verifyjwt,postSendMessage);
router.get('/get/:id',verifyjwt,getMessages);
router.get('/users',verifyjwt,getUsersForSidebar);



export default router;