const express = require("express");
const User = require("../controllers/user");
const router = express.Router();

/* GET users listing. */
router.get("/", function(req, res) {
  return res.json({ response: "hjhkj" });
});

router.post("/", function(req, res, next) {
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
    User.create(userData, function(err, user) {
      if (err) {
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.json({ status: "success", message: "Account Created" });
      }
    });
  }
});

router.post("/sign-in", function(req, res, next) {
  if (
    req.body.email &&
    req.body.password
  ) {
    User.authenticate(req.body.email, req.body.password, function(
      error,
      user
    ) {
      if (error || !user) {
        var err = new Error("Wrong email or password.");
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.json({test: "/profile"});
        // return res.redirect("/profile");
      }
    });
  }
});
module.exports = router;
