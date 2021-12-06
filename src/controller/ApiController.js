
let sequelize = require('../config/pg_connect')

let Users = require('../model/users')
let FpMonths  = require('../model/fpmonths')
let Remotes = require('../model/remotes')
let UserFpMonths = require('../model/userfpmonths')

function GetAllUser(req,res,next) {
    console.log('GetAllUsers hahahha')
    User.findAll({}).then(data => {
        console.log('DATA ALL USER...', data);
        res.json(data)
    })
}

const Statistic = require('../controller/Statistic')
async function FetchStatistic(req,res){
    console.log('okoko')
    await Statistic.FetchStatistic(req.body.date_from, req.body.date_to, req.body.uid)
    let data = await UserFpMonths.findAll({})
    let model = UserFpMonths
    console.log('model col ...', GetArrayColModel(UserFpMonths))
    let return_data = {
        data_body : data,
        data_cols : GetArrayColModel(UserFpMonths)
    }
    await console.log('alooo...', return_data)
    await res.json(data)
}

function RemoteIO(req,res){
    console.log(' REMOTes okoko', req.body)
    Remotes.findOne({where: {uid: req.body.uid, day: req.body.day}})
    .then(data =>{  
        if(!data){
            return Remote.create({uid: req.body.uid, day: req.body.day,  checkin: req.body.cico})
            .then(data => {
                console.log('dataa')
                res.json(data)
            })
        }
        else{
            if(!data.done_status){
                if(!data.checkout){
                    data.update({checkout: req.body.cico, done_status : true})
                    .then(result => {
                        console.log('DOne ')
                        res.send(result)
                    })
                    .catch(err => console.log('err update',err))
                }
                else
                    return res.send('DOne rooif ma')
            }
            else
                return res.send('DOne rooif ma')
        
        }
       
    })
    .catch(err => console.log('err find',err));
}   

async function GetAllFpMonth(req,res){
    let data_find = await FpMonths.findAll({})
    // console.log('sdata_find...........',data_find)
    let columns_f = []
    for( let key in FpMonths.rawAttributes ){
        columns_f.push(key)
    }
    let data_return= {
        data_body: data_find,
        data_col : columns_f
    }
    res.json(data_return)
}

async function FetchFtb(req,res){
    console.log('AAAAAAAAAAAAAAAAAAAA')
    let table_modal = req.params.ftb
    let all_table = await sequelize.getQueryInterface().showAllTables()
    // all_table.forEach(table=>{
    //     if(table === table_modal){
        
    //         let Model = require('../model/' + table)
    //         console.log('Model=============',Model)
    //         let return_data = await Model.findAll({})
    //     }
    // })
    let Model = require('../model/' + table_modal)
    let return_data = await Model.findAll({})
    res.json(return_data)
}

let GetArrayColModel = (model)=>{
    let cols = []
    for( let key in model.rawAttributes ){
        cols.push(key)
    }
    return cols
}


module.exports = {GetAllUser, FetchStatistic, RemoteIO, GetAllFpMonth, FetchFtb}
// GetAllUser()