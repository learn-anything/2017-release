const axios = require('axios');
const mapID = 1584;
axios.get(
  `https://learn-anything.xyz/api/votes/?mapID=${mapID}`,
  {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  },
).then(({ status, data }) => {
  console.log(status, data);
});
