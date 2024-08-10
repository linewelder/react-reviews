import ReviewCreate from "../dtos/ReviewCreate";
import Review from "../models/Review";

function sleep(ms: number): Promise<undefined> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const reviews: Review[] = [];

export async function fetchReviews(): Promise<Review[]> {
    await sleep(1000);
    return [...reviews];
}

export async function addReview(review: ReviewCreate) {
    await sleep(1000);
    reviews.push({
        id: reviews.length,
        name: review.name,
        stars: review.stars,
        comment: review.comment,
    });
}
