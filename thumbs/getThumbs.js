const Chromeless = require('chromeless').Chromeless;
const chromeless = new Chromeless({ launchChrome: false })

const getThumbs = async () => {
  const screenshot = await chromeless
    .goto('https://www.graph.cool')
    .scrollTo(0, 2000)
    .screenshot()

  console.log(screenshot)

  await chromeless.end()
};

getThumbs().then(() => {});
