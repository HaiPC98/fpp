let FpMonth = require('../model/FpMonths')

const fs = require('fs');
fs.readFile('C:\Users/ASUS/OneDrive/Desktop/9999.txt',  (err,data) => {
  if(err){
    throw err
  }
  else{
    let list_fp = []
    data = data.toString().split('\n')
    data.map((item,id) =>{
      newitem = item.split('\t')
      list_fp.push(newitem)
      return newitem
    })
    console.log("list FP", list_fp)
    list_fp.map(data => {
        console.log('data1.....', new Date(data[1]).getDate())

        FpMonth.create({
            uid: data[0],
            day: new Date(data[1]).getDate(),
            cico_date_time: new Date(data[1]),
        })
        .then(()=>{
            console.log(`Added user ${data[0]} to DB` );
          })
        .catch(err=>{
            console.log('Error month......')
        })
    })
  }
})