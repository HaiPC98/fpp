const Sequelize = require('sequelize') 
let sequelize = require('../config/pg_connect')

const Users = sequelize.define('user', {
    uid: {type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
    gmail: { type: Sequelize.STRING, allowNull: false},
    c_name: { type: Sequelize.STRING, allowNull: false},
    avatar: { type: Sequelize.STRING, allowNull: true},
    fullname: { type: Sequelize.STRING, allowNull:true},
    div: { type: Sequelize.STRING, allowNull: true},
  })

Users.sync({ alter: true }).then(() => {
    console.log('Async UserInfo... => Success')
});

module.exports = Users




