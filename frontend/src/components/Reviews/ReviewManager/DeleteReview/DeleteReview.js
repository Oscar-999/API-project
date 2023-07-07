import { useDispatch } from "react-redux";
import { useModal } from "../../../../context/Modal";
import { thunkUserReviews, thunkDeleteReview } from "../../../../store/review";
import { thunkGetSpot } from "../../../../store/spot";


function DeleteReview({ review, spot }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault()
            const deleted = await dispatch(thunkDeleteReview(review))
            if(deleted.id === review.id){
                dispatch(thunkGetSpot(spot.id))
                dispatch(thunkUserReviews())
                closeModal()
            };
        }

    return (
        <>
        <div className="delete">
            <h1>Confirm Delete</h1>
            <h4>Are you sure you want to delete this review?</h4>
            <form onSubmit={handleSubmit}>
                <div className="red">
                <button type='submit'>
                    Yes(Delete Review)
                </button>
                </div>
                <div className="grey">
                <button onClick={closeModal}>
                    No(Keep review)
                </button>
                </div>
            </form>
            </div>
        </>
    );
}

export default DeleteReview;
