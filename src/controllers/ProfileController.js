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

    async get(req, res) {
        const id = req.id;

        const profile = await Profile.findByPk(id);

        return res.status(200).json(profile);
    },

    async getByProfileId(req, res) {
        const { id } = req.params;

        const profile = await Profile.findByPk(id);

        return res.status(200).json(profile);
    },

    async store(req, res) {
        const { name, email, username, password } = req.body;

        const hashPassword = bcrypt.hashSync(password, saltRounds);

        const profile = await Profile.create({ 
            name, email, username, password: hashPassword
        });

        const token = generateToken(profile.id);

        return res.status(200).json({
            auth: true, token, profile
        });
    },

    async update(req, res) {
        const id = req.id;
        const { name, email, username, password } = req.body;

        await Profile.update(
            { name, email, username, password },
            { where: { id } }
        );

        return res.status(200).json({ message: 'Ok' });
    },

    async destroy(req, res) {
        const id = req.id;

        await Profile.destroy({ where: { id } });

        return res.status(200).json({ message: 'Ok' });
    }
};