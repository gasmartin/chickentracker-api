const Sequelize = require('sequelize');
const uuid = require('uuid/v4');

const Profile = require('../models/Profile');

const dbConfig = require('../config/database');

let connection = new Sequelize(dbConfig.development);

if (process.env.NODE_ENV == 'production') {
    connection = new Sequelize(dbConfig.production);
}

Profile.init(connection);

Profile.beforeCreate((profile, options) => {
    profile.id = uuid();
});
