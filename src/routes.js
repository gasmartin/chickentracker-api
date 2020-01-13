const express = require('express');

const { verifyToken } = require('./security/token');

const ProfileController = require('./controllers/ProfileController');

const routes = express.Router();

routes.post('/profiles/login', ProfileController.auth);
routes.post('/profiles', ProfileController.store);

routes.use('/', verifyToken);

routes.get('/profiles', ProfileController.get);
routes.put('/profiles', ProfileController.update);
routes.delete('/profiles', ProfileController.destroy);

routes.get('/profiles/:id', ProfileController.getByProfileId);

module.exports = routes;
