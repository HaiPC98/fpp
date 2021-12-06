const app = require('express')()
const session = require("express-session")

const passport = require("passport");


const GoogleStrategy = require("passport-google-oauth20").Strategy;

let User = require('../model/users')


function AuthenSuccess(req,res){
    let data = req.user._json
    console.log('req.session..', req.session)
    User.findOne({where: {gmail: data.email}})
    .then(found_user => {
        let dtt = true
        if(found_user){
            console.log('FOUND_USER...', found_user)
            res.redirect('/home')
        }
        else{
            let user_detail = {
                gmail: data.email,
                c_name: data.email.split('@')[0],
                fullname: data.name,
                avatar: data.picture
            }
            // Rend đến trang Create New User 
            res.render('reg-new-user', {user_detail})
        } 
    })
    .catch(err=>{
        console.log('ERR', err)
    })
  
}

function SaveToDB(req,res) {
    console.log('req.body', req.body)
    User.create(req.body)
    console.log('req.ses SaveTo DB..', req.user)
    let user_info = req.user
    res.redirect('/home')
}

function IsLoggedIn(req, res, next) {
    if (req.isAuthenticated()) { return next() }
    res.redirect("/")
}

let Authenticate = {AuthenSuccess, SaveToDB, IsLoggedIn }
module.exports  = Authenticate