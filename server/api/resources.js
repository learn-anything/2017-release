const express = require('express');
const axios = require('axios');
const xssFilters = require('xss-filters');
const url = require('url');
const { jwtCheck, getUserID } = require('../utils/auth');
const { cache } = require('../utils/cache');
const Resources = require('../helpers/resources');
const { resourceCategories } = require('../constants.json');
const { APIError, logger } = require('../utils/errors');


const router = express.Router();
// This endpoint requires authentication
router.use(jwtCheck('vote:maps'));

// Error message for unauthorized clients
router.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    throw new APIError(401, 'unauthorized');
  }
});


/*
  header:
    Authorization - Bearer <authentication_token>

  params:
    text: name of resource
    url: link to resource
    category: Multiple choice between the categories we have.
    parentID: ID of parent node.
*/
router.post('/', (req, res) => {
  const auth = req.get('Authorization');
  let { text, URL, category, parentID } = req.body;

  // Check that text is not empty and filter it to prevent XSS attacks.
  if (!text || text.trim().length < 6) {
    throw new APIError(400, 'resource text has to be at least 6 characters long');
  }
  text = xssFilters.inHTMLData(text.trim());

  // Parent ID has to be a number. We still aren't sure at this point that
  // it exists though.
  if (!parentID || isNaN(parentID)) {
    throw new APIError(400, 'parent ID was not specified or is not a number');
  }
  parentID = Number(parentID);

  // Check that the URL is a valid URL.
  try {
    new url.URL(URL);
  } catch(err) {
    throw new APIError(400, 'invalid URL');
  }

  // Check that the category is one of the categories we have.
  if (!resourceCategories.includes(category)) {
    throw new APIError(400, 'invalid category');
  }

  // If everything else was fine, then create the resource.
  cache(auth, getUserID(auth), 300, true)
    .then(userID => Resources.create(text, URL, category, parentID, userID))
    .then(resource => res.send(resource))
    .catch(err => logger(err, res));
});


module.exports = router;
