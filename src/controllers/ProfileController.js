const bcrypt = require('bcrypt');
const saltRounds = 10;

const { generateToken } = require('../security/token');

const Profile = require('../models/Profile');

module.exports = {
    async auth(req, res) {
        const { username, password } = req.body;

        const profile = await Profile.findOne({
            where: { username },
        });

        if (!profile) {
            return res.status(400).json({ 
                auth: false,
                error: 'Username not found' 
            });
        }

        if (!bcrypt.compareSync(password, profile.password)) {
            return res.status(400).json({ 
                auth: false,
                error: 'Password doesn\'t match' 
            });
        }

        const token = generateToken(profile.id);

        return res.status(200).json({ auth: true, token });
    },

    async store(req, res) {
        const { name, email, username, password } = req.body;

        const hashPassword = bcrypt.hashSync(password, saltRounds);

        const profile = await Profile.create({ 
            name, email, username, password: hashPassword
        });

        return res.status(400).json({
            auth: true, token, profile
        });
    }
};