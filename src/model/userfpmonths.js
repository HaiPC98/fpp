const Sequelize = require('sequelize')
let sequelize = require('../config/pg_connect')

const UserFpMonth = sequelize.define('userfpmonth', {
    uid: {type: Sequelize.INTEGER},
    date: {type: Sequelize.INTEGER, allowNull: true},
    list_cico_onday: {type: Sequelize.ARRAY(Sequelize.DATE), allowNull: true},
    first_ci: {type: Sequelize.DATE, allowNull: true},
    last_co: {type: Sequelize.DATE, allowNull: true},
    wtime: {type: Sequelize.BIGINT, allowNull: true},
    work_hours: {type: Sequelize.REAL, allowNull: true},
  })

UserFpMonth.sync().then(() => {
    console.log('AsyncFPData... => Success')
});

module.exports = UserFpMonth