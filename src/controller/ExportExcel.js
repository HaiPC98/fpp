
const excelJS = require("exceljs");
const sequelize_instance = require("../config/pg_connect");
let User = require('../model/users')
const path = require('path')

const list_map_table = []



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

    sequelize.getQueryInterface().showAllTables().then((all) => {
        console.log(all)
    });
  

// sequelize.getQueryInterface().showAllSchemas().then((tableObj) => {
//     console.log('// Tables in database','==========================');
//     console.log(tableObj);
// })
// .catch((err) => {
//     console.log('showAllSchemas ERROR',err);
// })



let columns_f = []
// let cl = 1
// for( let key in User.rawAttributes ){
//     columns_f.push(
//         { header: key.toLocaleUpperCase(), key: key , width: 12}, 
//     )
// }

const ExportFile = async (req,res) => { 
  console.log('00000000000000000000BODY', req.body)
  let data_return = req.body.data_body
  let data_sub = req.body.sub
  let data_cols = Object.keys(data_return[0])
  console.log("======================sub", data_sub.file_name)

  const workbook = new excelJS.Workbook();  // Create a new workbook
  const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
  const path = "./files";  // Path to download excel
  
    // let columns_f = 
    worksheet.columns = data_cols.map(col=>{
        return { header: col.toUpperCase(), key: col, width: 10 }
    })
    // console.log('---------------------------workSHEET', typeof Object.keys(data_return.data_cols), data_return.data_cols)

    // console.log('works', data_return.data_body, Object.keys(data_return.data_body[0]))
    // Looping through User data
    let counter = 1;
  // console.log('****body', data_return.data_body)
    data_return.forEach((item, index) => {
      console.log('***item', item)
        item.id = counter;
        worksheet.addRow(item); // Add data in worksheet
        counter++;
    });
    // Making first line in excel bold
    worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
    });

    await workbook.xlsx.writeFile(`./${data_sub.file_name}.${data_sub.type_f}`)
    .then(() => {
        console.log('thanh cong')
         res.json({
           status: "success",
           message: "file successfully Export",
           path: `${path}/${data_sub.file_name}.${data_sub.type_f}`,
          });
    })
    .catch(err =>{
      res.json({
        status: "Failure!!!",
        message: "Fail to export file",
        path: `${path}/${data_sub.file_name}.${data_sub.type_f}`,
      })
    })
   
};


module.exports = ExportFile;



