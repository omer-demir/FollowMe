var BlogItem = require("./models/blogItem");
var BlogItemPost = require("./models/blogItemPost");

module.exports = function(app, express) {
	var api = express.Router();

	api.get("/blogs", function(req, res) {

		BlogItem.find({}, function(err, blogs) {
			if(err){
				res.send(err);
				return;
			}

			console.log(err);
			console.log(blogs);
			res.json(blogs);
		});
	});

	api.get("/blogDetail/:id", function(req, res){

		BlogItem.findOne({"_id": req.params.id}, function(err, posts){
			if(err){
				res.send(err);
				return;
			}
			console.log(posts);
			res.json(posts);
		});
	});

	api.post("/createBlog", function (req, res) {
		var blog = new Blog(req.body.blog);
		blog.save(function (err, newBlog) {
			if(err){
				res.send(err);
				return;
			}

			res.json(newBlog);
		})
	});

	api.post("/updateBlog", function (req, res) {

		BlogItem.findOneAndUpdate({"_id": req.params.id}, req.body.blog, {upsert:true}, function (err, msg) {
			if(err){
				res.send(err);
				return;
			}

			res.json("successfully updated.");
		})
	});

	api.post("/deleteBlog", function (req, res) {

		BlogItem.remove({"_id": req.params.id}, function (err) {
			if(err){
				res.send(err);
				return;
			}

			res.json("successfully deleted.");
		})
	});
	
	return api;
}