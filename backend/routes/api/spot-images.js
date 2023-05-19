const express = require("express");
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User,Spot,SpotImage,Review,sequelize, } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


router.delete('/:imageId', requireAuth, async (req, res) => {
  const { user } = req
  const spotImageId = await SpotImage.findByPk(req.params.imageId, {
      include: {
          model: Spot
      }
  })

  if (!spotImageId) {
      res.status(404)
      return res.status(400).json({ message: "Spot Image couldn't be found" });
  }

  if (spotImageId.Spot.ownerId !== user.id) {
      return res.status(403).json({ message: "You must login as the Owner of this image to delete" });
  } 
  else {
      spotImageId.destroy()
      return res.status(200).json({ message: "Successfully deleted" });
  }
})

module.exports = router;
