const express = require("express");
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User,Spot,SpotImage,Review,sequelize, } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
// GET ALL SPOTS
router.get('/', [
  // Validate query parameters using express-validator
  check('page').optional().isInt({ min: 1 }).withMessage('Page must be greater than or equal to 1'),
  check('size').optional().isInt({ min: 1, max: 20 }).withMessage('Size must be between 1 and 20'),
  check('minLat').optional().isDecimal().withMessage('Minimum latitude must be a decimal number'),
  check('maxLat').optional().isDecimal().withMessage('Maximum latitude must be a decimal number'),
  check('minLng').optional().isDecimal().withMessage('Minimum longitude must be a decimal number'),
  check('maxLng').optional().isDecimal().withMessage('Maximum longitude must be a decimal number'),
  check('minPrice').optional().isDecimal({ min: 0 }).withMessage('Minimum price must be a decimal number greater than or equal to 0'),
  check('maxPrice').optional().isDecimal({ min: 0 }).withMessage('Maximum price must be a decimal number greater than or equal to 0'),
], async (req, res) => {
  const errors = handleValidationErrors(check, req);

  if (errors) {
    return res.status(400).json({ message: 'Bad Request', errors });
  }

  const allSpots = await Spot.findAll({
    include: [
      { model: Review },
      { model: SpotImage },
    ],
  });

  let Spots = [];
  allSpots.forEach((spot) => {
    Spots.push(spot.toJSON());
  });

  Spots.forEach((spot) => {
    let sum = 0;
    spot.Reviews.forEach((e) => {
      sum += e.stars;
    });
    spot.avgRating = sum / spot.Reviews.length;
    delete spot.Reviews;
  });

  Spots.forEach((spot) => {
    spot.SpotImages.forEach((e) => {
      if (e.preview === true) {
        spot.previewImage = e.url;
      }
    });
    if (!spot.previewImage) {
      spot.previewImage = 'No preview image found';
    }
    delete spot.SpotImages;
    spot.price = parseFloat(spot.price);
    spot.lng = parseFloat(spot.lng);
    spot.lat = parseFloat(spot.lat);
  });

  return res.status(200).json({ Spots });
});
// Get all spots owned by the current user
router.get('/current', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;

    const spots = await Spot.findAll({
      where: {
        ownerId: userId,
      },
      include: [
        {
          model: SpotImage,
          as: 'SpotImages',
          where: { preview: true },
          required: false,
        },
        {
          model: Review,
          as: 'Reviews',
          attributes: [[sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']],
          required: false,
        },
      ],
      group: ['Spot.id', 'SpotImages.id'],
    });

    const formattedSpots = spots.map((spot) => {
      let avgRating = 0;

      if (spot.Reviews && spot.Reviews.length > 0) {
        avgRating = parseFloat(spot.Reviews[0].getDataValue('avgRating')).toFixed(1);
      }

      const previewImage = spot.SpotImages && spot.SpotImages.length > 0 ? spot.SpotImages[0].url : null;

      return {
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.description,
        price: spot.price,
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt,
        avgRating: avgRating,
        previewImage: previewImage,
      };
    });

    res.status(200).json({ Spots: formattedSpots });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

 // GET details of a spot from an id
router.get('/:spotId', async (req, res) => {
  try {
    const spotId = req.params.spotId;

    // Find the spot by id
    const spot = await Spot.findByPk(spotId, {
      include: [
        {
          model: SpotImage,
          attributes: ['id', 'url', 'preview'],
        },
        {
          model: User,
          as: 'Owner',
          attributes: ['id', 'firstName', 'lastName'],
        },
      ],
    });

    // If spot not found, return 404 error
    if (!spot) {
      return res.status(404).json({ message: 'Spot couldn\'t be found' });
    }

    // Calculate average star rating and number of reviews for the spot
    const reviews = await Review.findAll({
      where: { spotId: spot.id },
    });
    const numReviews = reviews.length;
    const totalStars = reviews.reduce((sum, review) => sum + review.stars, 0);
    const avgStarRating = numReviews > 0 ? totalStars / numReviews : 0;

    // Prepare the response payload
    const response = {
      id: spot.id,
      ownerId: spot.ownerId,
      address: spot.address,
      city: spot.city,
      state: spot.state,
      country: spot.country,
      lat: spot.lat,
      lng: spot.lng,
      name: spot.name,
      description: spot.description,
      price: spot.price,
      createdAt: spot.createdAt,
      updatedAt: spot.updatedAt,
      numReviews,
      avgStarRating,
      SpotImages: spot.SpotImages,
      Owner: spot.Owner,
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching spot details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
// Add an image to a spot based on spot id
router.post('/:spotId/images', requireAuth, async (req, res) => {
  try {
    const spotId = req.params.spotId;
    const userId = req.user.id;
    const { url, preview } = req.body;

    // Check if the spot exists and belongs to the current user
    const spot = await Spot.findOne({
      where: {
        id: spotId,
        ownerId: userId,
      },
    });

    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    // Create the image
    const image = await SpotImage.create({
      spotId,
      url,
      preview,
    }, {
      // Exclude createdAt, updatedAt, and spotId fields
      attributes: { exclude: ['createdAt', 'updatedAt', 'spotId'] },
    });

    // Remove the updatedAt, createdAt, and spotId fields from the image object
    const { updatedAt, createdAt, spotId: imageSpotId, ...imageWithoutTimestamps } = image.toJSON();

    res.status(200).json(imageWithoutTimestamps);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//Create a Post
router.post('/', requireAuth, async (req, res, next) => {
  try {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    // Validate the required fields
    const errors = {};
    if (!address) errors.address = 'Address is required';
    if (!city) errors.city = 'City is required';
    if (!state) errors.state = 'State is required';
    if (!country) errors.country = 'Country is required';
    if (!lat || typeof lat !== 'number') errors.lat = 'Latitude is required and must be a number';
    if (!lng || typeof lng !== 'number') errors.lng = 'Longitude is required and must be a number';
    if (!name) errors.name = 'Name must be less than 50 characters';
    if (!description) errors.description = 'Description is required';
    if (!price) errors.price = 'Price is required';

    // Check if there are any validation errors
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ message: 'Bad Request', errors });
    }

    // Create the new spot
    const newSpot = await Spot.create({
      ownerId: req.user.id,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    });

    return res.status(201).json(newSpot);
  } catch (error) {
    next(error);
  }
});
// Edit a Spot
router.put('/:spotId', requireAuth, async (req, res) => {
  try {
    const spotId = req.params.spotId;
    const userId = req.user.id;
    const {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    } = req.body;

    // Check if the spot exists and belongs to the current user
    const spot = await Spot.findOne({
      where: {
        id: spotId,
        ownerId: userId,
      },
    });

    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    // Update the spot
    spot.address = address;
    spot.city = city;
    spot.state = state;
    spot.country = country;
    spot.lat = lat;
    spot.lng = lng;
    spot.name = name;
    spot.description = description;
    spot.price = price;

    await spot.save();

    res.status(200).json(spot);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a spot
router.delete('/:spotId', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const spotId = req.params.spotId;

    const spot = await Spot.findOne({
      where: {
        id: spotId,
        ownerId: userId,
      },
    });

    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    await spot.destroy();

    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



module.exports = router;

