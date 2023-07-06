import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkCreateSpot } from "../../../store/spot";
import Location from "./Form/Location/Location";
import FormPhotos from "./Form/PhotoSection/PhotoSection";
import Information from "./Form/Information/Information";
const CreateSpot = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [spotData, setSpotData] = useState({
    description: "",
    country: "",
    address: "",
    city: "",
    state: "",
    title: "",
    price: "",
    previewUrl: "",
    url1: "",
    url2: "",
    url3: "",
    url4: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSpotData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const { description, country, address, city, state, title, price, previewUrl, url1, url2, url3, url4 } =
      spotData;

    const newSpot = {
      address,
      city,
      state,
      country,
      name: title,
      description,
      price,
    };

    const imagesArray = [
      { url: previewUrl, preview: true },
      { url: url1, preview: false },
      { url: url2, preview: false },
      { url: url3, preview: false },
      { url: url4, preview: false },
    ];

    const tempErrors = {};

    if (description.length < 30) {
      tempErrors.description = "Description needs a minimum of 30 characters";
    }

    const isValidImageUrl = (url) => /\.(png|jpg|jpeg)$/.test(url);

    if (previewUrl && !isValidImageUrl(previewUrl)) {
      tempErrors.previewUrl = "Image URL must end in .png, .jpg, or .jpeg";
    }
    if (url1 && !isValidImageUrl(url1)) {
      tempErrors.url1 = "Image URL must end in .png, .jpg, or .jpeg";
    }
    if (url2 && !isValidImageUrl(url2)) {
      tempErrors.url2 = "Image URL must end in .png, .jpg, or .jpeg";
    }
    if (url3 && !isValidImageUrl(url3)) {
      tempErrors.url3 = "Image URL must end in .png, .jpg, or .jpeg";
    }
    if (url4 && !isValidImageUrl(url4)) {
      tempErrors.url4 = "Image URL must end in .png, .jpg, or .jpeg";
    }

    const tempErrorsArray = Object.values(tempErrors);
    if (tempErrorsArray.length > 0) {
      setErrors(tempErrors);
    } else {
      try {
        const spot = await dispatch(thunkCreateSpot(newSpot, imagesArray));
        history.push(`/spots/${spot.id}`);
      } catch (err) {
        const { errors: responseErrors } = await err.json();
        setErrors({ ...responseErrors, ...errors });
      }
    }
  };

  return (
    <div className="create-form-outer-container">
      <form className="create-form-inner-container" onSubmit={onSubmit}>
        <Location
          errors={errors}
          handleChange={handleChange}
          city={spotData.city}
          setCity={(value) => setSpotData((prevData) => ({ ...prevData, city: value }))}
          state={spotData.state}
          setState={(value) => setSpotData((prevData) => ({ ...prevData, state: value }))}
          address={spotData.address}
          setAddress={(value) => setSpotData((prevData) => ({ ...prevData, address: value }))}
          country={spotData.country}
          setCountry={(value) => setSpotData((prevData) => ({ ...prevData, country: value }))}
        />
        <Information
          errors={errors}
          description={spotData.description}
          setDescription={(value) => setSpotData((prevData) => ({ ...prevData, description: value }))}
        />
        <div className="form-element spot-title">
          <h2>Create a title for your spot</h2>
          <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
          <input
            style={{ width: "95%" }}
            type="text"
            required
            name="title"
            onChange={handleChange}
            value={spotData.title}
            placeholder="Name of your spot"
          />
        </div>
        <div className="errors">{errors.name}</div>
        <div className="form-element">
          <h2>Set a base price for your spot</h2>
          <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <label style={{ width: "fit-content" }} htmlFor="price">
              $
            </label>
            <input
              style={{ width: "100%" }}
              type="text"
              required
              name="price"
              onChange={handleChange}
              value={spotData.price}
              placeholder="Price per night (USD)"
            />
          </div>
        </div>
        <div className="errors">{errors.price}</div>
        <FormPhotos
          errors={errors}
          previewUrl={spotData.previewUrl}
          setPreviewUrl={(value) => setSpotData((prevData) => ({ ...prevData, previewUrl: value }))}
          url1={spotData.url1}
          setUrl1={(value) => setSpotData((prevData) => ({ ...prevData, url1: value }))}
          url2={spotData.url2}
          setUrl2={(value) => setSpotData((prevData) => ({ ...prevData, url2: value }))}
          url3={spotData.url3}
          setUrl3={(value) => setSpotData((prevData) => ({ ...prevData, url3: value }))}
          url4={spotData.url4}
          setUrl4={(value) => setSpotData((prevData) => ({ ...prevData, url4: value }))}
        />
        <div className="submit-button" style={{ display: "flex", justifyContent: "center" }}>
          <button type="submit" style={{ width: "100%", marginTop: "5%", all: "unset" }}>
            Create Spot
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSpot;
