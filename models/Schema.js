const { model, Schema } = require("mongoose");
const schema = new Schema({
  User: String,
  Reason: String,
  Date: String,
});
module.exports = model("blacklist", schema);
