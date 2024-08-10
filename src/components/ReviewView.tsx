import Review from "../models/Review";
import StarsInput from "./StarsInput";
import './ReviewView.css';

export default function ReviewView({ review }: { review: Review }) {
    return (
        <div className="ReviewView">
            <div className="top-row">
                <h3>{review.name}</h3>
                <StarsInput value={review.stars} maxValue={5} />
            </div>
            <p>{review.comment}</p>
        </div>
    )
}
