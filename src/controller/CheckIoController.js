const { connect } = require('mongoose')
let FpMonths = require('../model/fpmonths')

function ForgetCheck(req,res){
    console.log('req.body', req.body)
    FpMonths.create({uid: req.body.uid, day: req.body.day, cico_date_time: req.body.cico})
    .then(result => {console.log('result caraete succses', result)})
    .catch(err => {console.log('error', err)})

    res.send('Request sended')
}

module.exports = {ForgetCheck}
