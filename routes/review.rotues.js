// routes/review.routes.js

import express from 'express';
import { fetchReviewList } from '../controllers/review.controller.js';
import asyncHandler from 'express-async-handler';

const reviewRouter = express.Router();

reviewRouter.get('/reviews', asyncHandler(fetchReviewList));

export { reviewRouter };
