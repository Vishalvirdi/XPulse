import { Router } from 'express';
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { toggleFollowers } from '../controllers/follower.controller.js';

const router = Router();
router.use(verifyJWT);
router
    .route("/c/:profileId")
    .post(toggleFollowers);

export default router