import StarsInput from "./StarsInput";
import { ChangeEvent, MouseEvent, useState } from "react";
import { addReview } from "../data/reviews";
import ReviewCreate from "../dtos/ReviewCreate";
import './CreateReviewDialog.css';

type CreateReviewDialogProps = {
    open: boolean,
    onClose?: () => void,
};

const emptyReview: ReviewCreate = {
    name: '',
    stars: 0,
    comment: null,
};

export default function CreateReviewDialog({ open, onClose } : CreateReviewDialogProps) {
    const [review, setReview] = useState(emptyReview);
    const [error, setError] = useState<string | null>(null);
    const [errorAnimationTrigger, setErrorAnimationTrigger] = useState(0);
    const [loading, setLoading] = useState(false);

    function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
        setReview({ ...review, name: e.target.value });
    }

    function handleStarsChange(value: number) {
        setReview({ ...review, stars: value });
    }

    function handleCommentChange(e: ChangeEvent<HTMLTextAreaElement>) {
        const value = e.target.value;
        setReview({ ...review, comment: value === '' ? null : value });
    }

    function validateReview(review: ReviewCreate) {
        setErrorAnimationTrigger(1 - errorAnimationTrigger);

        if (review.name.length === 0) {
            setError('Enter your name!');
            return false;
        }

        if (review.stars < 1 || review.stars > 5) {
            setError('Select the number of stars!');
            return false;
        }

        setError(null);
        return true;
    }

    function resetState() {
        setReview(emptyReview);
        setError(null);
    }

    function handleCancel(e: MouseEvent) {
        e.preventDefault();

        if (onClose) onClose();
        resetState();
    }

    async function handleSubmit(e: MouseEvent) {
        e.preventDefault();

        if (!validateReview(review)) {
            return;
        }

        setLoading(true);
        await addReview(review);
        setLoading(false);

        if (onClose) onClose();
        resetState();
    }

    if (!open) return (<></>);

    return (
        <div className="CreateReviewDialog-backdrop">
            <div className="CreateReviewDialog">
                <form>
                    <h2>Leave a review</h2>
                    <div className="top-row">
                        <input id="name" placeholder="John Doe"
                            value={review.name} onChange={handleNameChange} />
                        <StarsInput maxValue={5}
                            value={review.stars} onChanged={handleStarsChange} />
                    </div>

                    <textarea id="comment" placeholder="Leave a comment..." rows={6}
                        value={review.comment ?? ''} onChange={handleCommentChange} />

                    <div className="buttons">
                        {loading ?
                            <div className="spinner"></div>
                        :
                            <>
                                <p key={errorAnimationTrigger} className="error">{error}</p>
                                <button onClick={handleCancel}>Cancel</button>
                                <button onClick={handleSubmit}>Submit</button>
                            </>
                        }
                    </div>
                </form>
            </div>
        </div>
    );
}
