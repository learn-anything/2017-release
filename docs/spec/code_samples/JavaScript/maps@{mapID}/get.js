const axios = require('axios');
const mapID = 1;
axios.get(`https://learn-anything.xyz/api/maps/${mapID}`)
  .then(({ status, data }) => {
    console.log(status, data);
  });
