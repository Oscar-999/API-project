const express = require("express");
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User,Spot,SpotImage,Review,sequelize, } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');



router.delete('/:imageId', requireAuth, async (req, res) => {
    const { imageId } = req.params;
  
    try {
      const spotImage = await SpotImage.findByPk(imageId);
  
      if (!spotImage) {
        return res.status(404).json({ message: "Spot Image couldn't be found" });
      }
  
      const spot = await Spot.findByPk(spotImage.spotId);
  
      if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
      }
  
      if (spot.ownerId !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized to delete this Spot Image" });
      }
  
      await spotImage.destroy();
  
      res.status(200).json({ message: 'Successfully deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


module.exports = router;
