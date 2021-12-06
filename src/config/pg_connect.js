// Connnect to Pg DB
var connectionString = "postgres://postgres:postgres@localhost:5432/ex1"
const Sequelize  = require('sequelize')

const sequelize = new Sequelize('fpdemo', 'postgres', '123',{
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize


