// controllers/storeController.js

import { addStoreReview } from '../services/storeService.js';

export const addReview = async (req, res, next) => {
    try {
        const { storeId } = req.params;
        const { userId, reviewText, rating, reviewDate } = req.body;

        const review = await addStoreReview(storeId, userId, reviewText, rating, reviewDate);
        
        res.status(201).json({
            success: true,
            message: 'Review added successfully',
            data: review
        });
    } catch (error) {
        next(error);
    }
};
