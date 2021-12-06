const passport = require("passport");
app.use(session({secret: process.env.SECRET_SESSION || 'secret'}))
app.use(passport.initialize())
app.use(passport.session())

let GGAuthConfig = () => {
    let clientID = '370533880697-34m756r9l5ualshlb6p1rcjnmsu6q18p.apps.googleusercontent.com'
    let clientSecret = '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'

    passport.use(
    new GoogleStrategy(
        {
        clientID: clientID,
        clientSecret: clientSecret,
        callbackURL: "http://localhost:8888/auth/google/callback", 
        //   passReqToCallback: true,
        },
        function(accessToken, refreshToken, profile, cb) {
        console.log('hererere...',accessToken, '  ', refreshToken, '  profile: ', profile )
        cb(null, profile)  // important code ===============================
        }
    )
    )
    app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile','email'] }));

    app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/protected')
    });
}

module.exports.GGAuthConfig

