if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// Might need method override still - will check
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');

const initializePassport = require('./passport');
initializePassport(passport);

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
// might need this for parsing form input
app.use(express.urlencoded({extended: false}));
// TODO: Use flash on client side to show error when logging in
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session())

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const gamesRouter = require("./routes/games");

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/card-categories", cardsRouter);
app.use("/games", gamesRouter);

mongoose.connect(process.env.DATABASEURI, {useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection
connection.once('open', () => {
    console.log("MongoDB connection established.")
})

app.listen(port, () => {

    console.log("Server listening on PORT4000.");
});

