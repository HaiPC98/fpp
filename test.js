let sequelize = require('./src/config/pg_connect')
async function adv(){
    console.log( await sequelize.getQueryInterface().showAllTables())
}
adv()

// SHow all Table in DB 
const sequelize = new Sequelize(config.dbUrl);
console.log(await sequelize.getQueryInterface().showAllTables());