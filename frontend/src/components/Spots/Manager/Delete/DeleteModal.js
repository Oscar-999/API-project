import { useDispatch } from "react-redux";
import { thunkDeleteASpot } from "../../../../store/spot";
import { useModal } from "../../../../context/Modal";
import './DeleteModal.css';

const DeleteModal = ({id}) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const onSubmit = async()=>{
        dispatch(thunkDeleteASpot(id))
    }

  return (
    <form className='modaldeleteform' onSubmit={onSubmit}>
      <h1 className="headingdelete">Confirm Delete</h1>
      <p style={{margin: "0 20px", position: 'relative', top: -13}} >Are you sure you want to remove this spot from the listings?</p>
      <button type='submit'>Yes (Delete Spot)</button>
      <button type='button' onClick={closeModal}>No (Keep Spot)</button>
    </form>
  );
}
export default DeleteModal
