const express = require('express');

const ProfileController = require('./controllers/ProfileController');

const routes = express.Router();

routes.get('/', (req, res) => {
    return res.json({ hello: 'World!' });
});

routes.post('/profiles', ProfileController.store);

module.exports = routes;
