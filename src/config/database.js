if (process.env.NODE_ENV != 'production') {
    require('dotenv/config');
}

module.exports = {
    development: {
        dialect: process.env.DB_DIALECT,
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        define: {
            timestamps: true,
            underscored: true,
        },
    },
    production: {
        dialect: process.env.DATABASE_DIALECT,
        url: process.env.DATABASE_URL,
        define: {
            timestamps: true,
            underscored: true,
        },
    },
};
