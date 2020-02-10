const express = require('express');
const cors = require('cors');

const port = process.env.PORT || 3456;

const routes = require('./routes');

const app = express();

require('./database');

app.use(cors());

app.use(express.json());

app.use(routes);

app.listen(port);
