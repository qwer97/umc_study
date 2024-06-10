// controllers/mission.controller.js

import { addMissionToStore } from '../services/mission.service.js';

export const addMissionToStore = async (req, res, next) => {
    try {
        // Call the service function to add a mission to the store
        const result = await addMissionToStore(req.body);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};
