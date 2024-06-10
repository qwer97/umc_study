// dtos/store.dto.js

export const storeReviewDTO = (storeId, userId, reviewText, rating, reviewDate) => {
    return {
        storeId,
        userId,
        reviewText,
        rating,
        reviewDate
    };
};
