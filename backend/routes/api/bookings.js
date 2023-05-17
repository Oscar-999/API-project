const express = require("express");
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User,Spot,SpotImage,Review,sequelize,Booking } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


// Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {
    try {
      const userId = req.user.id;
  
      const bookings = await Booking.findAll({
        where: {
          userId: userId,
        },
        include: [
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
                where: { preview: true },
                required: false,
              },
            ],
          },
        ],
      });
  
      const formattedBookings = bookings.map((booking) => {
        const spot = booking.Spot;
        const previewImage = spot.SpotImages.length > 0 ? spot.SpotImages[0].url : null;
  
        return {
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
        };
      });
  
      res.status(200).json({ Bookings: formattedBookings });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

module.exports = router;