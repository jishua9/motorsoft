const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
//Routes
const authRoute = require("./routes/auth.js");
dotenv.config();

//connect db
mongoose.connect(process.env.DB_connect, () =>
    console.log("connected to db " + process.env.DB_name)
);

mongoose.connection.on("connected", function () {
    console.log("Mongoose default connection open to " + process.env.DB_NAME);
});

// If the connection throws an error
mongoose.connection.on("error", function (err) {
    console.log("Mongoose default connection error: " + err);
});

// When the connection is disconnected
mongoose.connection.on("disconnected", function () {
    console.log("Mongoose default connection disconnected");
});

//mid
app.use(express.json());

//Router ware
app.use("/api/user", authRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log("server running on " + PORT));
