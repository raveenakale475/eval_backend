const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  device: { type: String, required: true },
  userId: { type: String, required: true }
});

const productModel = mongoose.model("product", productSchema);

module.exports = {
  productModel,
};
/*

{
  "title":"hii",
  "body":"hello",
  "device":"Laptop"
}
{
  "email":"sk729584@gmail.com",
  "password":"Saurav01@"
}

{
  "email":"sk9102544@gmail.com",
  "password":"sk9102544@"
}

posts/update/63c51a6d41ced5c7be687ea4

*/