var BlogItem = require("./models/blogItem");
var BlogItemPost = require("./models/blogItemPost");
var jwt = require('jsonwebtoken');

function createToken(user) {
    var token = jwt.sign({
        _id: user._id,
        name: user.name,
        username: user.username
    }, app.get("superSecret"), {
            expiresInMinute: 1440
        });
};

module.exports = function(app, express) {
    var api = express.Router();

    api.get("/setup", function(req, res) {

        var blogs = [
            new BlogItem({
                Url: "http://johnpapa.net",
                Name: "John Papa",
                FollowDate: Date.now(),
                RssFeedLink: "http://www.johnpapa.net/feed.xml",
                BlogItemPosts: []
            }),
            new BlogItem({
                Url: "http://blog.longle.net/",
                Name: "Long Le",
                FollowDate: Date.now(),
                RssFeedLink: "http://blog.longle.net/feed/",
                BlogItemPosts: []
            }),
            new BlogItem({
                Url: "http://brockallen.com/",
                Name: "Brock Allen",
                FollowDate: Date.now(),
                RssFeedLink: "http://brockallen.com/feed/",
                BlogItemPosts: []
            }),
        ];

        for (var i = 0; i < blogs.length; i++) {
            blogs[i].save(function(err, newblog) {
                if (err) {
                    console.log(err);
                }

                console.log(newblog);
            });
        }

        res.send({ message: "OK" });
    });

    api.get("/blogs", function(req, res) {

        BlogItem.find({}, function(err, blogs) {
            if (err) {
                res.send(err);
                return;
            }

            res.json(blogs);
        });
    });

    api.get("/blogDetail/:id", function(req, res) {

        BlogItem.findOne({ "_id": req.params.id }, function(err, posts) {
            if (err) {
                res.send(err);
                return;
            }

            res.json(posts);
        });
    });

    api.post("/createBlog", function(req, res) {
        
        var blog = new BlogItem({
            Url: req.body.Url,
            Name: req.body.Name,
            FollowDate: Date.now(),
            RssFeedLink: req.body.RssFeedLink,
            BlogItemPosts: []
        });
        
        blog.save(function(err, newBlog) {
            if (err) {
                res.send(err);
                return;
            }

            res.json(newBlog);
        });
    });

    api.post("/updateBlog/:id", function(req, res) {

        BlogItem.findOneAndUpdate({ "_id": req.params.id }, {
            Url: req.body.Url,
            Name: req.body.Name,
            RssFeedLink: req.body.RssFeedLink,
        }, { upsert: true }, function(err, msg) {
            if (err) {
                res.send(err);
                return;
            }

            res.json("successfully updated.");
        })
    });

    api.post("/deleteBlog/:id", function(req, res) {

        BlogItem.remove({ "_id": req.params.id }, function(err) {
            if (err) {
                res.send(err);
                return;
            }

            res.json("successfully deleted.");
        })
    });

    api.post("/register", function(req, res) {
        var user = new User({
            username: req.body.username,
            name: req.body.name,
            password: req.body.password
        });

        User.save(function(err) {
            if (err) {
                res.send(err);
                return;
            }

        });
    });

    api.post("/login", function(req, res) {
        User.find({ username: req.body.username })
            .select("name username password")
            .exec(function(err, user) {
                if (err)
                    throw err;

                if (!user) {
                    res.send({
                        message: "User doesn't exist."
                    });
                } else {
                    var validPassword = user.comparePassword(req.body.password);

                    if (!validPassword) {
                        res.send({
                            message: "Invalid password."
                        });
                    } else {
                        var token = createToken(user);

                        res.json({
                            success: true,
                            message: "Successfully logged in.",
                            token: token
                        });
                    }
                }
            })
    });

    api.use(function(req, res, next) {
        var token = req.body.token || req.params.token || req.header["x-access-token"];

        if (token) {
            jwt.verify(token, app.get('superSecret'), function(err, decoded) {
                if (err) {
                    res.status(403)
                        .send({
                            success: false,
                            message: "Failed to authenticate token."
                        });
                } else {
                    req.decoded = decoded;
                    next();
                }
            })
        } else {
            res.status(403)
                .send({
                    success: false,
                    message: "No token provided."
                });
        }
    })

    api.get("/me", function(req, res) {
        res.json(req.decoded);
    });

    return api;
};

