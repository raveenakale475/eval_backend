const mongoose = require("mongoose");

const connection = mongoose.connect(process.env.mongooseUrl);

module.exports = {
  connection,
};
