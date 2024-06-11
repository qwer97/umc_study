// routes/mission.routes.js

import express from 'express';
import { addMissionStore,fetchMission ,completeMissionStore} from '../controllers/mission.controller.js';
import asyncHandler from 'express-async-handler';

export const missionRouter = express.Router();

// POST request to add a mission to a store
missionRouter.post('/store/mission/add', asyncHandler(addMissionStore));

missionRouter.get('/', asyncHandler(fetchMission));

missionRouter.post('/store/mission/complete', asyncHandler(completeMissionStore));


export default missionRouter;
