import OpenModalButton from '../../../OpenModalButton/index.js'
import DeleteModal from './DeleteModal.js'


const Delete =( ) =>{
    return(
        <OpenModalButton
        buttonText='Delete'
        modalComponent={<DeleteModal/>}
        />
    )
}
export default Delete
