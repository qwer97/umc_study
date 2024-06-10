// services/mission.service.js

import { addMissionToStore } from '../models/mission.dao.js';

export const addMissionToStore = async (missionData) => {
    // Call the DAO function to add the mission to the store
    const result = await addMissionToStore(missionData);
    return result;
};
