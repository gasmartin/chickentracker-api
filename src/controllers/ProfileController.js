const Profile = require('../models/Profile');

module.exports = {
    async store(req, res) {
        const { name, email, username, password } = req.body;

        const profile = await Profile.create({ 
            name, email, username, password 
        });

        return res.json(profile);
    }
};