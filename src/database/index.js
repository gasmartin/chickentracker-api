const Sequelize = require('sequelize');
const uuid = require('uuid/v4');

const Profile = require('../models/Profile');

const dbConfig = require('../config/database');

const connection = new Sequelize(dbConfig);

Profile.init(connection);

Profile.beforeCreate((profile, options) => {
    profile.id = uuid();
});
