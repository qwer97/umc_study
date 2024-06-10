// user.dao.js

import { BaseError } from '../config/error.js';
import { status } from '../config/response.status.js';
import { pool } from '../config/db.config.js'; // 필요 시 import 추가
import { connectFoodCategory, confirmEmail, getUserID, insertUserSql, getPreferToUserID } from './user.sql.js';

export const addUser = async (data) => {
    try{
        const conn = await pool.getConnection();
        
        const [confirm] = await pool.query(confirmEmail, data.email);

        if(confirm[0].isExistEmail){
            conn.release();
            return -1;
        }

        const result = await pool.query(insertUserSql, [data.email, data.name, data.gender, data.birth, data.addr, data.specAddr, data.phone]);

        conn.release();
        return result[0].insertId;
        
    }catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

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
