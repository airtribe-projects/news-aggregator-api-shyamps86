const express = require('express');
const app = express();
const connectDb = require('./src/db/connectDb.js');
const dotenv=require("dotenv");
const router=require("./src/routes/index.js")
dotenv.config({})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port=process.env.PORT;
app.use("/api",router)

connectDb();

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});


module.exports = app;