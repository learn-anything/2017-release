const axios = require('axios');
const vote = {
  resourceID: '5769|https://www.codetuts.tech/compile-c-sharp-command-line/',
  direction: 1,
};

axios.post(
  'https://learn-anything.xyz/api/votes/',
  vote,
  {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  },
).then(({ status, data }) => {
  console.log(status, data);
});
