const axios = require('axios');
const title = 'anthropology/archaeology';
axios.get(`https://learn-anything.xyz/api/maps/${title}`)
  .then(({ status, data }) => {
    console.log(status, data);
  });
