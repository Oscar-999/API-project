const express = require("express");
const { requireAuth } = require("../../utils/auth");
const router = express.Router();
const { Op } = require("sequelize");
const {
  Spot,
  Review,
  SpotImage,
  User,
  Booking,
  sequelize,
  ReviewImage,
} = require("../../db/models");

// Get all of the Current User's Bookings
router.get("/current", requireAuth, async (req, res) => {
  try {
    const { user } = req;

    const bookings = await Booking.findAll({
      where: {
        userId: user.id,
      },
      include: [
        {
          model: Spot,
          as: "Spot",
          attributes: [
            "id",
            "ownerId",
            "address",
            "city",
            "state",
            "country",
            "lat",
            "lng",
            "name",
            "price",
          ],
          include: [
            {
              model: SpotImage,
              as: "SpotImages",
              attributes: ["id", "url"],
              where: { preview: true },
              required: false,
            },
          ],
        },
      ],
    });

    const formattedBookings = [];

    bookings.forEach((booking) => {
      const spot = booking.Spot;
      const previewImage =
        spot.SpotImages.length > 0 ? spot.SpotImages[0].url : null;

      formattedBookings.push({
        id: booking.id,
        spotId: booking.spotId,
        Spot: {
          id: spot.id,
          ownerId: spot.ownerId,
          address: spot.address,
          city: spot.city,
          state: spot.state,
          country: spot.country,
          lat: spot.lat,
          lng: spot.lng,
          name: spot.name,
          price: spot.price,
          previewImage: previewImage,
        },
        userId: booking.userId,
        startDate: booking.startDate,
        endDate: booking.endDate,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt,
      });
    });

    res.status(200).json({ Bookings: formattedBookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:bookingId", requireAuth, async (req, res) => {
  const { user } = req;
  const { startDate, endDate } = req.body;

  try {
    const booking = await Booking.findByPk(req.params.bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking couldn't be found" });
    }

    if (booking.userId !== user.id) {
      return res.status(403).json({
        message: "You must log in as the owner of this booking to edit",
      });
    }

    if (booking.endDate < new Date()) {
      return res
        .status(403)
        .json({ message: "Past bookings can't be modified" });
    }

    // Format startDate and endDate to remove the time portion
    const formattedStartDate = new Date(startDate).toISOString().split("T")[0];
    const formattedEndDate = new Date(endDate).toISOString().split("T")[0];

    // Check for booking conflicts
    const conflictingBooking = await Booking.findOne({
      where: {
        spotId: booking.spotId,
        startDate: { [Op.lte]: formattedEndDate },
        endDate: { [Op.gte]: formattedStartDate },
        id: { [Op.not]: booking.id },
      },
    });

    if (conflictingBooking) {
      return res.status(403).json({
        message: "Sorry, this spot is already booked for the specified dates",
        errors: {
          startDate: "Start date conflicts with an existing booking",
          endDate: "End date conflicts with an existing booking",
        },
      });
    }

    booking.startDate = formattedStartDate;
    booking.endDate = formattedEndDate;
    await booking.save();

    return res.status(200).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a Booking
router.delete('/:bookingId', requireAuth, async (req, res) => {
  const { user } = req;

  try {
    const booking = await Booking.findByPk(req.params.bookingId, {
      include: {
        model: Spot,
      },
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking couldn't be found" });
    }

    if (booking.startDate <= new Date()) {
      return res.status(403).json({ message: "Bookings that have been started can't be deleted" });
    }

    if (booking.userId !== user.id && booking.Spot.ownerId !== user.id) {
      return res.status(403).json({ message: "You are not authorized to delete this booking" });
    }

    await booking.destroy();

    return res.status(200).json({ message: 'Successfully deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



module.exports = router;
