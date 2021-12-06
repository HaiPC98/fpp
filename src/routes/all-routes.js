const express = require('express')
const api = express.Router()
const app = express()
// const auth = require("../config/passport-setup");

const passport = require("passport");

var RequestIp = require('@supercharge/request-ip')


const Authenticate = require('../controller/AuthController')
const AdminController = require('../controller/AdminController')
const ApiController = require('../controller/ApiController')
const CheckIoController = require('../controller/CheckIoController')

let GGAuthSetUp = require('../config/passport-setup');
let Statistic = require('../controller/Statistic')

const { response } = require('express');


function AllRoute(api) {

  GGAuthSetUp()
  api.get("/", (req, res) => {
    console.log('haha.... HOME')
    res.send('<a href="auth/google">Login with google</a>')
  })

  api.get('/io', (req, res) => {
    res.render('socketio')
  })

  api.post('/io', (req, res) => {
    req.ip = RequestIp.getClientIp(req)
    var ip = req.headers['x-forwarded-for'] ||
     req.socket.remoteAddress ||
     null;
    console.log('hereere...IP Address:', ip, 'req.body', req.body)
    res.send(`User ${req.body.username} with IP Adrr${ip} is sent a message: ${req.body.message}`)
  })


  api.get('/api/all-user', ApiController.GetAllUser)


  // Handle when request 'LOgin with Google' => Hiển thị trang Login by GG, chọn accc, => middleware: authen bằng passport
  api.get('/auth/google', passport.authenticate('google', { scope: ['profile','email'] }), (err, data) => {
  });  

  // Handle when Logged In 
  api.get('/auth/google/callback', 
    passport.authenticate('google', {failureRedirect: '/auth/failure' }),
    Authenticate.AuthenSuccess
  );

  api.get('/iot', (req,res)=>{
    res.json({message: 'hello guys...'})
  })


  // Site router

  api.get('/home', Authenticate.IsLoggedIn, (req,res)=>{
    console.log('home...', req.user.displayName )
    let data_home = req.user
    res.render('home' , {data_home});
  })

  api.get('/remote', Authenticate.IsLoggedIn, (req,res)=>{
    res.render('remote' );
  })

  api.get('/statistics', Authenticate.IsLoggedIn, (req,res)=>{
    res.render('statistic')
  })

  api.get('/export', (req, res)=>{
    res.render('export-file-modal')
  })

  const exportFile = require('../controller/ExportExcel')

  api.post('/export', exportFile)

  api.post('/statistic/preview', ApiController.FetchStatistic)

  // CRUD

  api.get('/management-user/fetch-all/:ftb', ApiController.FetchFtb)

  api.post('/reg-new-user', Authenticate.SaveToDB)
  api.get('/management-user/:json', AdminController.ManagementUser)
  api.get('/management-user/', AdminController.ManagementUser)

  api.post('/management-user/export', exportFile)



  api.get('/user/:uid/edit', AdminController.EditUser)
  api.post('/user/post-edit', AdminController.PostEditUser)
  api.post('/user/delete/:uid', AdminController.DeleteUser)

  api.get('/getdt/fp-month', ApiController.GetAllFpMonth)

  // Remote

  api.post('/remote', ApiController.RemoteIO)
  
  function check_Logged_In(req, res, next){
    if(!req.user) return res.send('You are not logged in yet')
    next()
  }

  // Satatistic

  api.post('statistic/preview/uid', Statistic.FetchStatistic)

  // Checkin _ CheckOut

  api.post('/cico/forget', CheckIoController.ForgetCheck)

  api.get("/protected", check_Logged_In ,(req, res)=>{
      res.json({userrr:req.user})
  })

  api.get('/logout', (req,res)=>{
    req.logout()
    req.session.destroy()
    res.send('Logged Out...')
  })
  api.get('/auth/failure',(req, res)=>{
    res.send('Something went wrong...')


  // ================================= APIs ====================================
  api.get('/dt/payroll', Statistic)

})

 
}

module.exports = AllRoute