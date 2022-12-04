const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const routes = require('./routes');
const errorsHandler = require('./middlewares/errorsHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { MONGO_URL_CONFIG, PORT_CONFIG } = require('./utils/config');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect(MONGO_URL_CONFIG, { autoIndex: true });

app.use(requestLogger);
app.use(routes);

app.use(errorLogger);
app.use(errors());

app.use(errorsHandler);
app.listen(PORT_CONFIG, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT_CONFIG}`);
});
