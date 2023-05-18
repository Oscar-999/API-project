// backend/routes/api/index.js
const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const { restoreUser } = require("../../utils/auth.js");
const spotRouter = require("./spots.js");
const reviewsRouter = require("./reviews.js");
const bookingsRouter = require("./bookings.js");
const spotImagesRouter = require('./spot-images.js')

router.use(restoreUser);



router.use(restoreUser);
router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/spots", spotRouter);
router.use("/reviews", reviewsRouter);
router.use("./bookings", bookingsRouter);
router.use('./spot-images', spotImagesRouter)

router.post("/test", (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
