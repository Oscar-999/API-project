const express = require("express");
const bcrypt = require("bcryptjs");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const {
  User,
  Spot,
  SpotImage,
  Review,
  sequelize,
  Booking,
  ReviewImage,
} = require("../../db/models");
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

// Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res) => {
  try {
    const spotId = req.params.spotId;

    // Check if the spot exists
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    const reviews = await Review.findAll({
      where: {
        spotId: spotId,
      },
      include: [
        {
          model: User,
          as: 'User',
          attributes: ['id', 'firstName', 'lastName'],
        },
        {
          model: ReviewImage,
          as: 'ReviewImages',
          attributes: ['id', 'url'],
        },
      ],
    });

    res.status(200).json({ Reviews: reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


//add image
router.post('/:reviewId/images', requireAuth, async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const userId = req.user.id;
    const { url } = req.body;

    // Check if the review exists and belongs to the current user
    const review = await Review.findOne({
      where: {
        id: reviewId,
        userId: userId,
      },
    });

    if (!review) {
      return res.status(404).json({ message: "Review couldn't be found" });
    }

    // Check if the maximum number of images for the review has been reached
    const imageCount = await ReviewImage.count({
      where: {
        reviewId: reviewId,
      },
    });

    if (imageCount >= 10) {
      return res.status(403).json({ message: "Maximum number of images for this resource was reached" });
    }

    // Create the image
    const image = await ReviewImage.create({
      reviewId,
      url,
    });

    res.status(200).json(image);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res) => {
    try {
      const userId = req.user.id;
  
      const reviews = await Review.findAll({
        where: {
          userId: userId,
        },
        include: [
          {
            model: User,
            as: 'User',
            attributes: ['id', 'firstName', 'lastName'],
          },
          {
            model: Spot,
            as: 'Spot',
            attributes: [
              'id',
              'ownerId',
              'address',
              'city',
              'state',
              'country',
              'lat',
              'lng',
              'name',
              'price',
            ],
            include: [
              {
                model: SpotImage,
                as: 'SpotImages',
                attributes: ['id', 'url'],
              },
            ],
          },
          {
            model: ReviewImage,
            as: 'ReviewImages',
            attributes: ['id', 'url'],
          },
        ],
      });
  
      res.status(200).json({ Reviews: reviews });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

  //create
  router.post('/:spotId/reviews', requireAuth, async (req, res) => {
    try {
      const spotId = req.params.spotId;
      const userId = req.user.id;
      const { review, stars } = req.body;
  
      // Check if the spot exists
      const spot = await Spot.findByPk(spotId);
      if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
      }
  
      // Check if the user already has a review for this spot
      const existingReview = await Review.findOne({
        where: {
          spotId: spotId,
          userId: userId,
        },
      });
      if (existingReview) {
        return res.status(500).json({ message: "User already has a review for this spot" });
      }
  
      // Create the review
      const newReview = await Review.create({
        spotId: spotId,
        userId: userId,
        review: review,
        stars: stars,
      });
  
      res.status(201).json(newReview);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  



module.exports = router;
