const express = require("express");
const bcrypt = require("bcryptjs");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const {
  User,
  Spot,
  SpotImage,
  Booking,
  Review,
  ReviewImage,
  sequelize,
} = require("../../db/models");
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
// Get all reviews based on spots idea
router.get("/:spotId/reviews", async (req, res, next) => {
  try {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    const reviews = await Review.findAll({
      where: {
        spotId: req.params.spotId,
      },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"],
        },
        {
          model: ReviewImage,
          attributes: ["id", "url"],
        },
      ],
    });

    return res.json({ Reviews: reviews });
  } catch (error) {
    next(error);
  }
});
// Get all Bookings for a Spot based on the Spot's id
router.get("/:spotId/bookings", requireAuth, async (req, res, next) => {
  const { user } = req;

  try {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    if (spot.ownerId !== user.id) {
      const notOwnerBookings = await Booking.findAll({
        where: {
          spotId: req.params.spotId,
        },
        attributes: ["spotId", "startDate", "endDate"],
      });

      return res.status(200).json({ Bookings: notOwnerBookings });
    } else {
      const ownerBookings = await Booking.findAll({
        where: {
          spotId: req.params.spotId,
        },
        include: {
          model: User,
          attributes: ["id", "firstName", "lastName"],
        },
      });

      return res.status(200).json({ Bookings: ownerBookings });
    }
  } catch (error) {
    next(error);
  }
});

const validateGetAllSpots = [
  check("page")
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage("Page must be an integer between 1 and 10."),
  check("size")
    .optional()
    .isInt({ min: 1, max: 20 })
    .withMessage("Size must be an integer between 1 and 20."),
  check("minLat")
    .optional()
    .isDecimal()
    .withMessage("Minimum latitude is invalid."),
  check("maxLat")
    .optional()
    .isDecimal()
    .withMessage("Maximum latitude is invalid."),
  check("minLng")
    .optional()
    .isDecimal()
    .withMessage("Minimum longitude is invalid."),
  check("maxLng")
    .optional()
    .isDecimal()
    .withMessage("Maximum longitude is invalid."),
  check("minPrice")
    .optional()
    .isDecimal({ min: 0 })
    .withMessage("Minimum price must be a decimal greater than or equal to 0."),
  check("maxPrice")
    .optional()
    .isDecimal({ min: 0 })
    .withMessage("Maximum price must be a decimal greater than or equal to 0."),
  handleValidationErrors,
];
//Get all spots
router.get("/", validateGetAllSpots, async (req, res) => {
  try {
    const {
      page = 1,
      size = 20,
      minLat,
      maxLat,
      minLng,
      maxLng,
      minPrice,
      maxPrice,
    } = req.query;

    const pageNumber = parseInt(page);
    const pageSize = parseInt(size);

    const validatedPage =
      pageNumber && pageNumber >= 1 && pageNumber <= 10 ? pageNumber : 1;
    const validatedSize =
      pageSize && pageSize >= 1 && pageSize <= 20 ? pageSize : 20;

    const spots = await Spot.findAll({
      include: [
        {
          model: SpotImage,
          as: "SpotImages", // Use 'SpotImages' as the alias
          where: { preview: true },
          required: false,
        },
        {
          model: Review,
          as: "Reviews", // Use 'Reviews' as the alias
          attributes: [
            [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],
          ],
          required: false,
        },
      ],
      group: ["Spot.id", "SpotImages.id"],
    });

    const formattedSpots = spots.map((spot) => {
      let avgRating = 0;

      if (spot.Reviews.length > 0) {
        avgRating = parseFloat(
          spot.Reviews[0].getDataValue("avgRating")
        ).toFixed(1);
      }

      let previewImage = null;

      if (spot.SpotImages.length > 0) {
        previewImage = spot.SpotImages[0].url;
      } else {
        previewImage = "No preview image found";
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

    res.status(200).json({
      Spots: formattedSpots,
      page: validatedPage,
      size: validatedSize,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all spots owned by the current user
router.get("/current", requireAuth, async (req, res) => {
  const userId = req.user.id;

  const spots = await Spot.findAll({
    where: {
      ownerId: userId,
    },
    include: [
      {
        model: SpotImage,
        as: "SpotImages",
        where: { preview: true },
        required: false,
      },
      {
        model: Review,
        as: "Reviews",
        attributes: [
          [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],
        ],
        required: false,
      },
    ],
    group: ["Spot.id", "SpotImages.id", "Reviews.id"],
  });

  const formattedSpots = spots.map((spot) => {
    let avgRating = 0;

    if (spot.Reviews && spot.Reviews.length > 0) {
      avgRating = parseFloat(
        spot.Reviews[0].getDataValue("avgRating")
      ).toFixed(1);
    }

    const previewImage =
      spot.SpotImages && spot.SpotImages.length > 0
        ? spot.SpotImages[0].url
        : null;

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
});

// GET details of a spot from an id
router.get("/:spotId", async (req, res) => {
  try {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId, {
      include: [
        {
          model: SpotImage,
          attributes: ["id", "url", "preview"],
        },
        {
          model: User,
          as: "Owner",
          attributes: ["id", "firstName", "lastName"],
        },
      ],
    });

    // If spot not found, return 404 error
    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    const reviews = await Review.findAll({
      where: { spotId: spot.id },
    });
    const numReviews = reviews.length;
    const totalStars = reviews.reduce((sum, review) => sum + review.stars, 0);
    const avgStarRating = numReviews > 0 ? totalStars / numReviews : 0;

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
    console.error("Error fetching spot details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Create a Booking from a Spot based on the Spot's id
router.post("/:spotId/bookings", requireAuth, async (req, res) => {
  const { user } = req;
  const { startDate, endDate } = req.body;
  const spot = await Spot.findByPk(req.params.spotId);
  const startDay = new Date(startDate);
  const lastDay = new Date(endDate);
  const comment = {
    message: "Sorry, this spot is already booked for the specified dates",
    errors: {},
  };

  if (!spot || spot.ownerId === user.id) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

  if (startDay >= lastDay) {
    return res.status(400).json({
      message: "Bad Request",
      errors: {
        endDate: "endDate cannot come before startDate",
      },
    });
  }

  const allBookings = await Booking.findAll({
    where: {
      spotId: spot.id,
    },
  });

  allBookings.forEach((e) => {
    if (e.startDate <= startDay && e.endDate >= startDay) {
      comment.errors.startDate =
        "Start date conflicts with an existing booking";
    }
    if (e.endDate >= lastDay && e.startDate <= lastDay) {
      comment.errors.endDate = "End date conflicts with an existing booking";
    }
  });

  if (Object.keys(comment.errors).length) {
    return res
      .status(403)
      .json({ message: comment.message, errors: comment.errors });
  } else {
    const booking = await Booking.create({
      spotId: spot.id,
      userId: user.id,
      startDate: startDay,
      endDate: lastDay,
    });

    const scheduleDates = {
      id: booking.id,
      spotId: spot.id,
      userId: user.id,
      startDate: startDate,
      endDate: endDate,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt,
    };

    return res.status(200).json(scheduleDates);
  }
});

// Add an image to a spot based on spot id
router.post("/:spotId/images", requireAuth, async (req, res) => {
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
    const image = await SpotImage.create(
      {
        spotId,
        url,
        preview,
      },
      {
        // Exclude createdAt, updatedAt, and spotId fields
        attributes: { exclude: ["createdAt", "updatedAt", "spotId"] },
      }
    );

    // Remove the updatedAt, createdAt, and spotId fields from the image object
    const {
      updatedAt,
      createdAt,
      spotId: imageSpotId,
      ...imageWithoutTimestamps
    } = image.toJSON();

    res.status(200).json(imageWithoutTimestamps);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// addd a review spot id
router.post("/:spotId/reviews", requireAuth, async (req, res) => {
  const { review, stars } = req.body;
  const { user } = req;

  try {
    const spot = await Spot.findByPk(req.params.spotId);
    const comment = { message: "Bad Request", errors: {} };

    if (!review) {
      comment.errors.review = "Review text is required";
    }
    if (!stars || parseInt(stars) < 1 || parseInt(stars) > 5) {
      comment.errors.stars = "Stars must be an integer from 1 to 5";
    }

    if (Object.keys(comment.errors).length) {
      return res
        .status(400)
        .json({ message: comment.message, errors: comment.errors });
    }

    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    const existingReview = await Review.findOne({
      where: {
        userId: user.id,
        spotId: req.params.spotId,
      },
    });

    if (existingReview) {
      return res
        .status(409)
        .json({ message: "User already has a review for this spot" });
    }

    const createdReview = await Review.create({
      userId: user.id,
      spotId: spot.id,
      review: review,
      stars: stars,
    });

    return res.status(201).json(createdReview);
  } catch (error) {
    next(error);
  }
});

//Create a Spot Post
router.post("/", requireAuth, async (req, res, next) => {
  try {
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

    // Validate the required fields
    const errors = {};
    if (!address) errors.address = "Address is required";
    if (!city) errors.city = "City is required";
    if (!state) errors.state = "State is required";
    if (!country) errors.country = "Country is required";
    if (!lat || typeof lat !== "number")
      errors.lat = "Latitude is required and must be a number";
    if (!lng || typeof lng !== "number")
      errors.lng = "Longitude is required and must be a number";
    if (!name) errors.name = "Name must be less than 50 characters";
    if (!description) errors.description = "Description is required";
    if (!price) errors.price = "Price is required";

    // Check if there are any validation errors
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ message: "Bad Request", errors });
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
router.put("/:spotId", requireAuth, async (req, res) => {
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
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a spot
router.delete("/:spotId", requireAuth, async (req, res) => {
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
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
