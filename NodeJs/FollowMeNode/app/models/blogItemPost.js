var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var BlogItemPostSchema = new Schema({

	BlogItemId: {type: Schema.Types.ObjectId, ref: "BlogItem"},
    Url: String,
    Title: String,
    ShortDescription: String,
    ImageUrl: String,
    CreateDate: {type: Date, default: Date.now}

},{collection:"BlogItemPosts"});

module.exports = mongoose.model("BlogItemPost", BlogItemPostSchema);