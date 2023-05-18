const express = require("express");
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Booking,User,Spot } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const { spotId } = req.params;
  
    try {
      const spot = await Spot.findByPk(spotId);
  
      if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
      }
  
      const bookings = await Booking.findAll({
        where: {
          spotId: spot.id,
        },
        include: {
          model: User,
          attributes: ['id', 'firstName', 'lastName'],
        },
      });
  
      const formattedBookings = [];
  
      bookings.forEach((booking) => {
        const formattedBooking = {
          User: {
            id: booking.User.id,
            firstName: booking.User.firstName,
            lastName: booking.User.lastName,
          },
          id: booking.id,
          spotId: booking.spotId,
          userId: booking.userId,
          startDate: booking.startDate,
          endDate: booking.endDate,
          createdAt: booking.createdAt,
          updatedAt: booking.updatedAt,
        };
  
        if (spot.ownerId === req.user.id) {
          formattedBooking.User = undefined;
        }
  
        formattedBookings.push(formattedBooking);
      });
  
      res.status(200).json({ Bookings: formattedBookings });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router;