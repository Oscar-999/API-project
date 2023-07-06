import "./Location.css";

const Location = ({
  city,
  setCity,
  address,
  setAddress,
  country,
  setCountry,
  state,
  setState,
  errors,
}) => {
  return (
    <div className="form-location form-element">
      <h1 style={{ textAlign: "left" }}>Create a new Spot</h1>
      <h2>Where's your place located?</h2>
      <p>
        Guests will only get your exact address once they booked a reservation.
      </p>
      <label className="create-country">
        Country
        <input
          style={{ width: "95%" }}
          type="text"
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
          }}
          placeholder="Country"
          required
        ></input>
      </label>
      <div className="errors">{errors.country}</div>
      <label className="create-address">
        Street Address
        <input
          style={{ width: "95%" }}
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
          required
        ></input>
      </label>
      <div className="errors">{errors.address}</div>
      <div className="city-and-state">
        <label>
          City
          <input
            className="city-input"
            type="text"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
            placeholder="City"
            required
          ></input>
        </label>
        <div className="errors">{errors.city}</div>
        <label>
          State
          <input
            className="state-input"
            type="text"
            value={state}
            onChange={(e) => {
              setState(e.target.value);
            }}
            placeholder="State"
            required
          ></input>
        </label>
        <div className="errors">{errors.state}</div>
      </div>
    </div>
  );
};

export default Location;
