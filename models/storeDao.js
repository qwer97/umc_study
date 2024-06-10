// models/storeDao.js

import pool from '../config/db.config.js';

export const addStoreReviewToDatabase = async (storeId, userId, reviewText, rating, reviewDate) => {
    const sql = 'INSERT INTO store_review (store_id, user_id, review_text, rating, review_date) VALUES (?, ?, ?, ?, ?)';
    const values = [storeId, userId, reviewText, rating, reviewDate];

    const connection = await pool.getConnection();
    try {
        await connection.execute(sql, values);
        connection.release();
        return { storeId, userId, reviewText, rating, reviewDate };
    } catch (error) {
        connection.release();
        throw error;
    }
};
