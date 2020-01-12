const Profile = require('../models/Profile');

module.exports = {
    async auth(req, res) {
        const { username, password } = req.body;

        const profile = await Profile.findOne({
            where: { username },
        });

        if (!profile) {
            return res.status(400).json({ 
                error: 'Username not found' 
            });
        }

        if (profile.password != password) {
            return res.status(400).json({ 
                error: 'Password is incorrect' 
            });
        }

        return res.status(200).json(profile);
    },

    async store(req, res) {
        const { name, email, username, password } = req.body;

        const profile = await Profile.create({ 
            name, email, username, password 
        });

        return res.json(profile);
    }
};