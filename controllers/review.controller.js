// controllers/review.controller.js

import { getReviews } from '../services/review.service.js';
import { response } from '../config/response.js';
import { status } from '../config/response.status.js';

export const fetchReviewList = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const reviews = await getReviews(page, limit);
        return res.status(200).json(response(status.SUCCESS, { reviews }));
    } catch (error) {
        console.error(error);
        return res.status(500).json(response(status.INTERNAL_SERVER_ERROR, 'Failed to fetch reviews'));
    }
};
