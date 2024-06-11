// services/review.service.js
import { fetchReviews } from '../models/review.dao.js';

export const getReviews = async (page, limit) => {
    const offset = (page - 1) * limit;
    try {
        const reviews = await fetchReviews(offset, limit);
        return reviews;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch reviews');
    }
};
