// models/mission.dao.js

import{ pool} from '../config/db.config.js';
import mysql from 'mysql2/promise';

export const addMissionToStore = async (missionData) => {
    try {
        const connection = await pool.getConnection();
        const query = `INSERT INTO store_mission (store_id, user_id, mission_text, mission_status) VALUES (?, ?, ?, ?)`;
        const [result] = await connection.execute(query, [missionData.store_id, missionData.user_id, missionData.mission_text, missionData.mission_status]);
        connection.release();
        return result;
    } catch (error) {
        console.error('Error adding mission to store:', error);
        throw error;
    }
};

export const getMissionList = async () => {
    try {
        const connection = await pool.getConnection();
        const query = 'SELECT * FROM store_mission WHERE mission_status = "Pending" and user_id = "1"';
        const [rows] = await connection.query(query);
        connection.release();
        return rows;
    } catch (error) {
        console.error('Error fetching missions:', error);
        throw error;
    }
};