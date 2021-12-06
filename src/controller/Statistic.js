let FpMonth = require('../model/fpmonths')
let UserFpMonth  = require('../model/userfpmonths')
let User = require('../model/users')

let UserFpOnday = require('../model/FpDays')
let Sequelize = require('Sequelize')
let Op = Sequelize.Op


async function FetchStatistic(from, to, uid){
    // console.log('Fetching', key, value)
    // if(key === 'day') 
    //     flag = 'uid'
    // else if (key === 'uid') 
    //     flag = 'day'   

    flag = 'date'    
    condition = 'sdfghj'
    // condition[key] = value
    console.log('condition..xzcz.',from, to)
    await UserFpMonth.destroy({where: {}, truncate: true})

    let filter_data = await FpMonth.findAll({ where: {cico_date_time: {[Op.between]: [from, to]}, uid:uid }, order:[['uid', 'ASC'], ['cico_date_time', 'ASC']] })
    await console.log('filterdata', filter_data)
    let list_cico = []
    console.log('kaka oi', filter_data.length)

    // let list_cico = [filter_data[0].dataValues.date_time]
    for(let i = 0; i< filter_data.length-1 ; i++){
        console.log('dat rsdmfskdnvjs')
        list_cico.push(filter_data[i].dataValues.cico_date_time)   
            if(filter_data[i].dataValues.day != filter_data[i+1].dataValues.day){
                console.log('IFF listcico', list_cico)
                last_co = list_cico.length > 1 ? list_cico[list_cico.length-1] : null
                w_time = list_cico[list_cico.length-1].getTime() - list_cico[0].getTime()
                console.log('last CO', last_co)
                let newUserData = {
                    uid: filter_data[i].dataValues.uid,
                    date: filter_data[i].dataValues.day,
                    list_cico_onday: list_cico,
                    first_ci: list_cico[0],
                    last_co: last_co,
                    wtime: w_time,
                    work_hours: w_time/(3600*1000)
                }
                console.log('newUserData...cheching...', newUserData)
                await UserFpMonth.create(newUserData).then(reslut=>{
                    console.log('carate...', reslut)
                })
                .catch(error=>{
                    console.log('err',error)
                })
                list_cico = []
            }
    }
}    
        
// function StatisticPreview(req,res){
//     FetchStatistic(req.params.key, req.body.ketu)



module.exports = {FetchStatistic}


