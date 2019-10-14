const axios = require('axios');
const resource = {
  text: 'Systemd - ArchWiki',
  url: 'https://wiki.archlinux.org/index.php/systemd',
  category: 'wiki',
  parentID: 4696,
};

axios.post(
  'https://learn-anything.xyz/api/resources/',
  resource,
  {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  }
).then(({ status, data }) => {
  console.log(status, data);
});
