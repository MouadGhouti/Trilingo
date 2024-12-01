/*
Returns a sequelize object and Connect to DB function to test connectivity with DB
*/

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    process.env.DB_NAME,   //database name
    process.env.DB_USER,     // database user
    process.env.DB_PWD,  // user password
    {
      // specify the database server used
      dialect: 'mysql',
  
      // We are using a cloud-based mysql instance on aiven.io so host is 'mysql-se371-psu-7eaf.k.aivencloud.com'
      host: process.env.DB_HOST,
  
      // Communication port on the database server
      port: process.env.DB_PORT
    }
  );
  const connectToDB = async () => {
    try {
      await sequelize.authenticate();
      console.log(`Successfully connected to database server...`);
    } catch (error) {
      console.error('Unable to connect to database server:');}
  }

  module.exports = {sequelize,connectToDB};