const Sequelize = require('sequelize')
let sequelize = require('../config/pg_connect')

const FpDay = sequelize.define('fpday', {
    uid: {type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
    list_cico: {type: Sequelize.ARRAY(Sequelize.DATE) ,allowNull: true},
    first_ci: {type: Sequelize.DATE, allowNull: true},
    last_co: {type: Sequelize.DATE, allowNull: true},
    wtime: {type: Sequelize.BIGINT},
  })

FpDay.sync().then(() => {
    // Now the `users` table in the database corresponds to the model definition
    // return User.create({
    //   name: 'John Sonn',
    //   age: 222
    // });
    console.log('AsyncFPData... => Success')
});

module.exports = FpDay