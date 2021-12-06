var GoogleStrategy = require('passport-google-oauth20').Strategy;
var passport = require('passport');
const session = require("express-session")
const app = require('express')()
const User = require('../model/users')
// const auth = require("../config/passport-setup");

function PassportSetUp(){

  let clientID = process.env.GG_OAUTH_CLIENT_ID
  let clientSecret = process.env.GG_OAUTH_CLIENT_SECRET

  // config GG OAuth 
  // sử dụng GoogleStrategy cho passport
  passport.use(
    new GoogleStrategy(
      {
        clientID: clientID, // id dùng để connect đến api của GG mà web app đang sử dụng 
        clientSecret: clientSecret,
        callbackURL: "http://localhost:8888/auth/google/callback",
        // passReqToCallback: true,
      },
      // handle data return form GG passport when login by Gmail
      function(request, accessToken, refreshToken, data, cb) {
        console.log('TOkennnnnn', accessToken, refreshToken)
        cb(null, data)  
      }
    )
  )
}

module.exports = PassportSetUp