// routes/mission.routes.js

import express from 'express';
import { addMissionToStore } from '../controllers/mission.controller.js';
import asyncHandler from 'express-async-handler';

export const userRouter = express.Router();

// POST request to add a mission to a store
router.post('/store/mission/add', asyncHandler(addMissionToStore));

export default router;
