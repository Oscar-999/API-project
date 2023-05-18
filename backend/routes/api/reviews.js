const express = require("express");
const bcrypt = require("bcryptjs");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const {User,Spot, SpotImage,Review, sequelize,Booking, ReviewImage} = require("../../db/models");
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

// Get all review of the current user 
router.get('/current', requireAuth, async (req, res, next) => {
  const { user } = req;

  const allReviews = await Review.findAll({
      where: {
          userId: user.id
      }, 
      include: [
          {
          model: User,
          attributes: ['id', 'firstName', 'lastName']
          },
          {
          model: Spot,
          attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price',],
          include: [
              {
                  model: SpotImage,
              }
          ]
          }, {
              model: ReviewImage, 
              attributes: ['id', 'url']
          }
      ]
  })

  const arra = [];

  allReviews.forEach(e => {
      arra.push(e.toJSON())
  })

  const newArra = [];
  arra.forEach( review => {
      review.Spot.SpotImages.forEach( rev => {
          review.Spot.previewImage = rev.url
      })

      delete review.Spot.SpotImages;
      newArra.push(review);
  })
  return res.status(200).json({ Reviews: newArra })

})

// Add an Image to a Review based on the Review's ID
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
  const { url } = req.body;
  const { user } = req;

  const reviewId = await Review.findByPk(req.params.reviewId) 

  if(!reviewId || reviewId.userId !== user.id) { 
      return res.status(404).json({ message: "Review couldn't be found"})
  }

  const allImages = await ReviewImage.findAll({
      where: {
          reviewId: req.params.reviewId
      }
  })

  if (allImages.length < 10) {
      const image = await ReviewImage.create({
          reviewId: req.params.reviewId, 
          url: url
      })

      return res.json({ id: image.id, url })
  } else {
      return res.status(403).json({ message: "Maximum number of images for this resource was reached" })
  }
})

// Edit a Review 
router.put('/:reviewId', requireAuth, async (req, res) => {
  const { review, stars } = req.body;
  const { user } = req;
  const reviewId = await Review.findByPk(req.params.reviewId);

  const comment = {
      message: 'Bad Request', errors: {} 
  };

  if (!reviewId) {
      return res.status(404).json("Review couldn't be found")
  }

  if(review.userId !== user.id) {
      return res.status(403).json({ message: "You must login as the owner of this review to edit" })
  }

  if (!review) {
      comment.errors.review = "Review text is required"
  }

  if (!stars || stars < 1 || stars > 5) {
      comment.errors.review = "Stars must be an integer from 1 to 5"
  }

  if (Object.keys(comment.errors).length) {
      return res.status(400).json({ message: comment.message, errors: comment.errors })
  }

  const editedReview = await reviewId.update({
      review, stars
  })

  await reviewId.save();

  return res.status(200).json(editedReview);
})

// Delete a Review 
router.delete('/:reviewId', requireAuth, async (req, res) => {
  const { user } = req;
  const reviewId = await Review.findByPk(req.params.reviewId)

  if(!reviewId) {
      return res.status(404).json({ message: "Review couldn't be found" });
  }

  if(reviewId.userId !== user.id) {
      return res.status(403).json({ message: "You must login in as the Owner of this review to delete" })
  }

  reviewId.destroy();
  return res.status(200).json({ message: 'Successfully deleted' })
})

//

module.exports = router;



