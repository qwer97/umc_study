// user.dao.js

import { BaseError } from '../config/error.js';
import { status } from '../config/response.status.js';
import { pool } from '../config/db.config.js'; // 필요 시 import 추가
import { connectFoodCategory, confirmEmail, getUserID, insertUserSql, getPreferToUserID } from './user.sql.js';

export const addUser = async (userData) => {
    console.log("addUser called with:", userData);

    const {
        email,
        name,
        gender,
        birth,
        addr,
        specAddr,
        phone
    } = userData;

    try {
        const connection = await pool.getConnection();
        console.log("Database connection established");

        const [result] = await connection.execute(insertUserSql, [
            email,
            name,
            gender,
            birth,
            addr,
            specAddr,
            phone
        ]);
        connection.release();
        console.log("addUser result:", result);
        return result.insertId;

    } catch (err) {
        console.error("Error in addUser:", err);
        if (err.code === 'ER_DUP_ENTRY') {
            throw new BaseError({
                isSuccess: false,
                status: 400,
                message: 'Duplicate entry for email'
            });
        }
        throw new BaseError({
            isSuccess: false,
            status: 500,
            message: err.message || 'Internal server error'
        });
    }
};

// 사용자 정보 얻기
export const getUser = async (userId) => {
    try {
        const conn = await pool.getConnection();
        const [user] = await conn.query(getUserID, [userId]);

        if (user.length === 0) {
            conn.release();
            throw new BaseError({ ...status.USER_NOT_FOUND, data: { userId } });
        }

        conn.release();
        return user[0];
        
    } catch (err) {
        throw err;
    }
}

// 음식 선호 카테고리 매핑
export const setPrefer = async (userId, foodCategoryId) => {
    try {
        const conn = await pool.getConnection();
        
        await conn.query(connectFoodCategory, [foodCategoryId, userId]);

        conn.release();
        
    } catch (err) {
        throw err;
    }
}

// 사용자 선호 카테고리 반환
export const getUserPreferToUserID = async (userID) => {
    try {
        const conn = await pool.getConnection();
        const [prefer] = await conn.query(getPreferToUserID, [userID]);

        conn.release();

        return prefer;
    } catch (err) {
        throw err;
    }
}
