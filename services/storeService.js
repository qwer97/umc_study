// services/storeService.js

import { addStoreReviewToDatabase } from '../models/storeDao.js';

export const addStoreReview = async (storeId, userId, reviewText, rating, reviewDate) => {

    const review = await addStoreReviewToDatabase(storeId, userId, reviewText, rating, reviewDate);
    return review;
};
