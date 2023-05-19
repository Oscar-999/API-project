const express = require("express");
const { requireAuth } = require("../../utils/auth");
const router = express.Router();
const { Op } = require("sequelize");
const {Review,ReviewImage,} = require("../../db/models");
// Delete a Review Image
router.delete("/:imageId", requireAuth, async (req, res, next) => {
    const { user } = req;
    try {
      const reviewImage = await ReviewImage.findByPk(req.params.imageId, {
        include: {
          model: Review,
        },
      });
  
      if (!reviewImage || reviewImage.Review.userId !== user.id) {
        return res
          .status(404)
          .json({ message: "Review Image couldn't be found" });
      }
  
      await reviewImage.destroy();
  
      return res.status(200).json({ message: "Successfully deleted" });
    } catch (error) {
      next(error);
    }
  });
module.exports = router;
