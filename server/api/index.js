const express = require("express");
const maps = require("./maps");
const { logger } = require("../utils/errors");

// Group all API routers here, so we can import and use them with just
// one router on the server/index.js file.
const router = express.Router();
router.use("/maps", maps);

// Handle any error inside the endpoints.
router.use((err, req, res, next) => logger(err, res));

module.exports = router;
