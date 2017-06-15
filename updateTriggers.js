const fs = require('fs');
const lookup = require('./server/lookup.json');
const triggers = require('./triggers.js');

const lookupTable = {};
const triggersTitle = [];

lookup.forEach((el) => { lookupTable[el.id] = el.title; });

triggers.forEach((el) => {
  const title = lookupTable[el.map.slice(0, 40)];

  if (title) {
    triggersTitle.push({
      name: el.name,
      map: title.replace(/ /g, '-').replace('learn_anything_-_', ''),
    });
  }
});

fs.writeFileSync(`${__dirname}/client/utils/titleTriggers.json`, JSON.stringify(triggersTitle));
