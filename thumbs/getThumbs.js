const Chromeless = require('chromeless').Chromeless;
const chromeless = new Chromeless({ launchChrome: false })

const getThumbs = async () => {
  const screenshot = await chromeless
    .goto('https://learn-anything.xyz/learn-anything')
    .wait(1500)
    .evaluate(() => {
      // Remove everything but the map.
      document.querySelector('.searchbar-container').remove();
      document.querySelector('.breadcrumbs').remove();
      document.querySelector('.bm-burger-button').remove();
      document.querySelector('footer').remove();
      document.querySelector('.contribute-button').remove();
    })
    .screenshot()

  console.log(screenshot)

  await chromeless.end()
};

getThumbs().then(() => {});
