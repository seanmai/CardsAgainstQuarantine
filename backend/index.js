const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// Might need method override still - will check

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/card-categories", cardsRouter);

mongoose.connect(process.env.DATABASEURI, {useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection
connection.once('open', () => {
    console.log("MongoDB connection established.")
})

app.listen(port, () => {
    console.log("Server listening on PORT3000.");
  });
