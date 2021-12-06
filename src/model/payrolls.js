const Sequelize = require('sequelize') 
let sequelize = require('../config/pg_connect')

const PayRollOnMonth = sequelize.define('payroll', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
    c_name: { type: Sequelize.STRING, allowNull: false},
    history_cico: { type: Sequelize.STRING, allowNull: true},
    total_wtime: { type: Sequelize.BIGINT, allowNull: true},
    total_OT: { type: Sequelize.BIGINT, allowNull: true},
    checkEnough: { type: Sequelize.BIGINT, allowNull:true}
 })

PayRollOnMonth.sync().then(() => {

    console.log('AsyncPGandORM... => Success')
});

module.exports = PayRollOnMonth