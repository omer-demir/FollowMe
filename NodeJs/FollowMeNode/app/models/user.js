var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({

    Email: { type: String },
    Username: { type: String },
    Password: { type: String },
    CreateDate: { type: Date, default: Date.now }

}, { collection: "Users" }
);

module.exports = mongoose.model("User", UserSchema);