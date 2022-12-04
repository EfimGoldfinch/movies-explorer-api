require('dotenv').config();

const { PORT, MONGO_URL, NODE_ENV } = process.env;
const PORT_CONFIG = NODE_ENV === 'production' ? PORT : 3001;
const MONGO_URL_CONFIG = NODE_ENV === 'production' ? MONGO_URL : 'mongodb://localhost:27017/moviedb';

module.exports = {
  PORT_CONFIG,
  MONGO_URL_CONFIG,
};
