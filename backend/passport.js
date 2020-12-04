const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user.model');
const bcrypt = require('bcrypt');

function initialize(passport) {
  // by default expect credentials in parameters named 'username' and 'password'
  const authenticateUser = (username, password, done) => {
    User.findOne({ username: username }, async (err, user) => {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }  
      try {
        if (await bcrypt.compare(password, user.password)) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Incorrect password.' });
        }
      } catch (e) {
        return done(e);
      }
    });
  }

  passport.use(new LocalStrategy(authenticateUser));
  // Support login sessions
  passport.serializeUser((user, done) => { 
    // TODO: Might need to use _id 
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => { 
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
}

module.exports = initialize