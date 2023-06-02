const express = require("express");
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User,Spot,SpotImage,Review,sequelize, } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

//Delete an Spot image
router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const { user } = req;
  
    try {
      const spotImage = await SpotImage.findByPk(req.params.imageId, {
        include: {
          model: Spot
        }
      });
  
      if (!spotImage) {
        return res.status(404).json({ message: "Spot Image couldn't be found" });
      }
  
      if (spotImage.Spot.ownerId !== user.id) {
        return res.status(403).json({ message: "You must log in as the owner of this image to delete" });
      } else {
        await spotImage.destroy();
        return res.status(200).json({ message: "Successfully deleted" });
      }
    } catch (error) {
      next(error);
    }
  });
module.exports = router;
