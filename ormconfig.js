module.exports = {
  "type": 'postgres',
  "port": 5432,
  "host": process.env.DB2_HOST,
  "username": process.env.DB2_USERNAME,
  "password": process.env.DB2_PASSWORD,
  "database": process.env.DB2_NAME,
  "entities": [
    process.env.DB2_ENTITIES
  ],
  "synchronize": true,
  "cli": {
    "entitiesDir": process.env.DB2_ENTITIESDIER
  }
};
