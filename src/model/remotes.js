const Sequelize = require('sequelize')
let sequelize = require('../config/pg_connect')

const Remote = sequelize.define('remote', {
    uid: {type: Sequelize.INTEGER},
    day: {type: Sequelize.INTEGER},
    checkin: {type: Sequelize.DATE},
    checkout: {type: Sequelize.DATE},
    done_status: {type: Sequelize.BOOLEAN, defaultValue: false}
  })

Remote.sync().then(() => {
    console.log('AsyncFPData... => Success')
});

module.exports = Remote