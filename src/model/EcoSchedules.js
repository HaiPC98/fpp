const Sequelize = require('sequelize') 
let sequelize = require('../config/pg_connect')

const Eco = sequelize.define('ecoschedule', {
    uid: {type: Sequelize.INTEGER, allowNull: false},
    c_name: { type: Sequelize.STRING, allowNull: false},
    begin_from: { type: Sequelize.STRING, allowNull: true},
    duration: { type: Sequelize.BIGINT, allowNull: true},
    notify_to: {type: Sequelize.STRING, allowNull:false},
    make_up_time: { type: Sequelize.DATE, allowNull:true},
    note: { type: Sequelize.STRING}
  })

Eco.sync().then(() => {
   
    console.log('AsyncPGandORM... => Success')
});

module.exports = Eco