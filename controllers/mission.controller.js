import { addMission, getMission } from '../services/mission.service.js';
import { addMissionToStore , getMissionList } from '../models/mission.dao.js'; // mission dao import 추가
import { response } from '../config/response.js';
import { status } from '../config/response.status.js';
import { BaseError } from '../config/error.js';


export const addMissionStore = async (req, res, next) => {
    try {
        // Call the service function to add a mission to the store
        const result = await addMission(req.body);
        res.status(status.SUCCESS.status).json(response(status.SUCCESS, result));
    } catch (error) {
        next(error);
    }
};

export const fetchMission = async (req, res) => {
    try {
        const missions = await getMission();
        
        if (missions.length === 0) {
            return res.status(status.NOT_FOUND.status).json(response(status.NOT_FOUND, 'No missions found'));
        }
        
        return res.status(status.OK.status).json(response(status.OK, missions));
    } catch (error) {
        console.error('Error fetching missions:', error);
        return res.status(status.INTERNAL_SERVER_ERROR.status).json(response(status.INTERNAL_SERVER_ERROR, 'Failed to fetch missions'));
    }
};
