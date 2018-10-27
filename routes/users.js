const express = require("express");
const House = require("../controllers/house");
const User = require("../controllers/user");
const router = express.Router();
const mongoose = require('mongoose');
const { requiresLogin, findById } = require("../middlewares")

/* GET users listing. */
router.get("/", requiresLogin, function (req, res) {
  return res.json({ response: "hjhkj" });
});

// GET /logout
router.get('/logout', requiresLogin, function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.status(204).send()
        // return res.redirect('/');
      }
    });
  }
});

router.get("/:id", requiresLogin, (req, res, next) => findById(User, null, req, res, next)
);

router.post("/", function (req, res, next) {
  if (
    req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf
  ) {
    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf
    };
    //use schema.create to insert data into the db
    User.create(userData, function (err, user) {
      if (err) {
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.json({ status: "success", message: "Account Created" });
      }
    });
  }
});

router.post("/sign-in", function (req, res, next) {
  if (
    req.body.email &&
    req.body.password
  ) {
    User.authenticate(req.body.email, req.body.password, function (
      error,
      user
    ) {
      if (error || !user) {
        var err = new Error("Wrong email or password.");
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.json({ test: "/profile" });
        // return res.redirect("/profile");
      }
    });
  }
});


router.get("/:id/houses", requiresLogin, function (req, res, next) {
  //use schema.create to insert data into the db
  House.find({ 'users': mongoose.Types.ObjectId(req.params.id) }, function (err, houses) {
    if (err) {
      return next(err);
    } else {
      return res.json({ status: "success", houses });
    }
  });
});
module.exports = router;
