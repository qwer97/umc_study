// services/mission.service.js

import { addMissionToStore,getMissionList } from '../models/mission.dao.js';

export const addMission = async (missionData) => {
    // Call the DAO function to add the mission to the store
    const result = await addMissionToStore(missionData);
    return result;
};

export const getMission = async () => {
    try {
        const missions = await getMissionList();
        return missions;
    } catch (error) {
        console.error('Error fetching missions:', error);
        throw error;
    }
};