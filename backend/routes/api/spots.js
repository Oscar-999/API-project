const express = require("express");
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User,Spot,SpotImage,Review, sequelize, } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
router.get('/', async (req, res) => {
  try {
    const spots = await Spot.findAll({
      include: [
        {
          model: SpotImage,
          as: 'SpotImages', 
          where: { preview: true },
          required: false,
        },
        {
          model: Review,
          as: 'Reviews', // Use 'Reviews' as the alias
          attributes: [[sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']],
          required: false,
        },
      ],
      group: ['Spot.id', 'SpotImages.id'],
    });

    const formattedSpots = spots.map((spot) => {
      let avgRating = 0;

      if (spot.Reviews.length > 0) {
        avgRating = parseFloat(spot.Reviews[0].getDataValue('avgRating')).toFixed(1);
      }

      let previewImage = null;

      if (spot.SpotImages.length > 0) {
        previewImage = spot.SpotImages[0].url;
      } else {
        previewImage = 'No preview image found';
      }

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
    if (!name) errors.name = 'Name is required';
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


module.exports = router;

