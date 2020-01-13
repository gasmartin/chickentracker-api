const express = require('express');

const { verifyToken } = require('./security/token');

const ProfileController = require('./controllers/ProfileController');

const routes = express.Router();

routes.post('/profiles/login', ProfileController.auth);
routes.post('/profiles', ProfileController.store);

routes.use('/', verifyToken);

// Outras rotas aqui embaixo
routes.use('/', (req, res) => {
    return res.status(200).json({ message: 'Ok' });
});

module.exports = routes;
