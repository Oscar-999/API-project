import './Information.css'
import '../../CreateSpot.css'

const Information = ({ description, setDescription, errors }) => {
    return (
        <div className="form-element">
      <h2>Describe your place to guests</h2>
      <p>
        Mention the best features of your space, any special amentities like fast wifi or parking, and what
        you love about the neighborhood.
      </p>
      <textarea
        style={{width: '100%', height: 150}}
        type="text"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        placeholder="Please write at least 30 characters"
        required
      ></textarea>
      <div className="errors">{errors.description}</div>
    </div>
    )
}

export default Information;
