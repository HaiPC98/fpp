
let fs = require('fs');
fs.readFile('C:\Users/ASUS/OneDrive/Desktop/1111.txt',  (err,data) => {
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
  }
})