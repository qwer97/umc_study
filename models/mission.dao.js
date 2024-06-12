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


export const completeMissionInDao = async (missionId) => {
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();
        const updateQuery = 'UPDATE store_mission SET mission_status = "Completed" WHERE mission_id = ?';
        const [updateResult] = await connection.execute(updateQuery, [missionId]);
        await connection.commit();
        connection.release();
        return updateResult;
    } catch (error) {
        if (connection) {
            await connection.rollback();
            connection.release();
        }
        console.error('Error completing mission in DAO:', error);
        throw error;
    }
};