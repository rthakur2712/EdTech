const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("DB connection successful");
    })
    .catch((error) => {
      console.log("error in db connectioin");
      console.error(error);
      process.exit(1);
    });
};
