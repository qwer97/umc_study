// routes/storeRoutes.js

import express from 'express';
import { addReview } from '../controllers/storeController.js';
import asyncHandler from 'express-async-handler';

export const userRouter = express.Router();
// POST /store/:storeId/reviews
router.post('/:storeId/reviews', asyncHandler(adddReview));


export default router;
