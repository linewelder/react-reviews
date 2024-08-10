import { useEffect, useState } from "react";
import CreateReviewDialog from "./components/CreateReviewDialog";
import Review from "./models/Review";
import { fetchReviews } from "./data/reviews";
import ReviewView from "./components/ReviewView";
import './App.css';

export default function App() {
    const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
    const [reviews, setReviews] = useState<Review[] | null>(null);

    async function reloadReviews() {
        setReviews(null);
        setReviews(await fetchReviews());
    }

    useEffect(() => {
        reloadReviews();
    }, []);

    function handleReviewDialogClose() {
        setReviewDialogOpen(false);
        reloadReviews();
    }

    return (
        <div className="container">
            <h1>Reviews</h1>
            <button onClick={() => setReviewDialogOpen(true)}>Leave Review</button>

            {reviews === null ?
                <div className="spinner" style={{margin: "24px auto"}}></div>
            : reviews.length > 0 ?
                reviews.map((review, i) =>
                    <ReviewView key={i} review={review} />
                )
            :
                <p className="no-reviews">No reviews yet</p>
            }
            <CreateReviewDialog open={reviewDialogOpen} onClose={handleReviewDialogClose} />
        </div>
    );
}
