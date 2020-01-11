const { Model, DataTypes } = require('sequelize');

class Profile extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            username: DataTypes.STRING,
            password: DataTypes.STRING,
        }, { 
            sequelize, 
            tableName: 'profiles',
        });
    }

    static associate(models) {

    }
}

module.exports = Profile;
