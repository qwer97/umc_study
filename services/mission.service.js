// services/mission.service.js

import { addMissionToStore,getMissionList,completeMissionInDao } from '../models/mission.dao.js';

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

export const completeMission = async (missionId) => {
    try {
        // Call the DAO function to complete a mission
        const result = await completeMissionInDao(missionId);
        return result;
    } catch (error) {
        console.error('Error completing mission:', error);
        throw error;
    }
};