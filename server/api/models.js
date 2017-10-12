const Joi = require('joi');
const dynamo = require('dynamodb');

// Configure the region and credentials for aws-sdk
dynamo.AWS.config.update({
  region: 'us-west-1',
  accessKeyId: process.env.DYNAMO_UPDATE_KEY_ID,
  secretAccessKey: process.env.DYNAMO_UPDATE_SECRET_ACCESS_KEY,
});

if (process.env.NODE_ENV !== 'production') {
  dynamo.AWS.config.update({
    region: 'us-west-1',
    accessKeyId: process.env.DYNAMO_READ_KEY_ID,
    secretAccessKey: process.env.DYNAMO_READ_SECRET_ACCESS_KEY,
    endpoint: new dynamo.AWS.Endpoint('http://localhost:8000'),
  });
}

const Resource = Joi.object().keys({
  url: Joi.string().allow(),
  text: Joi.string(),
  category: Joi.string().allow(),
  note: Joi.string().allow(),
  author: Joi.string().default('Nikita Voloboev'),
  score: Joi.object().keys({
    up: Joi.number().positive().allow(0),
    down: Joi.number().positive().allow(0),
  }),
});


const Node = Joi.object().keys({
  text: Joi.string(),
  note: Joi.string().allow(),
  nodes: Joi.array().items(Joi.lazy(() => Node)),
  resources: Joi.array().items(Resource),
  author: Joi.string().default('Nikita Voloboev'),
});


const Map = dynamo.define('Map', {
  hashKey: 'id',
  timestamps: true,
  schema: {
    title: Joi.string(),
    tag: Joi.string().allow(),
    id: Joi.number().positive().allow(0),
    map: Joi.lazy(() => Node),
  },
});

module.exports = {
  Resource,
  Node,
  Map,
};
