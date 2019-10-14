const axios = require('axios');
const query = 'graphics';
axios.get(`https://learn-anything.xyz/api/maps?q=${query}`)
  .then(({ status, data }) => {
    console.log(status, data);
  });
