var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var BlogItemSchema = new Schema({

	Url: {type: String},
    Name: {type: String},
    FollowDate: {type: Date, default: Date.now},
    BlogItemPosts: {type: Array}
    
},{collection:"BlogItems"});

module.exports = mongoose.model("BlogItem", BlogItemSchema);