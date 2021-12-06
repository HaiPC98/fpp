const app = require('express')()
const session = require("express-session")

const passport = require("passport");


const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require('../model/users')


function GetHome(req, res, next) {
    
}