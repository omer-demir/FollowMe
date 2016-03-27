var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({

},
    {
        collection: "BlogItems"
    }
);

module.exports = mongoose.model("User", UserSchema);