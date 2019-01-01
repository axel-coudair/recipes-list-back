const express = require("express");
const House = require("../models/house");
const router = express.Router();
const {requiresLogin, findById} = require("../middlewares")

/* GET users listing. */
router.get("/", requiresLogin, function(req, res) {
  House.find({}, function(err, houses) {
    if (err) {
      return next(err);
    } else {
    return res.json({ houses });
    }
  });
});

router.get("/:id", requiresLogin, (req, res, next) => findById(House, ["adminId", "users"], req, res, next)
);

router.post("/", requiresLogin, function(req, res, next) {
  if (
    req.body.name,
    req.body.adminId
  ) {
    var userData = {
      name: req.body.name,
      adminId: req.body.adminId,
      users: [req.body.adminId]
    };
    //use schema.create to insert data into the db
    House.create(userData, function(err, house) {
      if (err) {
        return next(err);
      } else {

        return res.json({ status: "success", message: "House Created" });
      }
    });
  } else next()
});

router.put("/:id/user", requiresLogin, function(req, res, next) {
  if (
    req.body.user
  ) {
    //use schema.create to insert data into the db
    House.update(
      { _id: req.params.id }, 
      { $push: { users: req.body.user } }
      ,  function(err, user) {
      if (err) {
        return next(err);
      } else {
        return res.json({ status: "success", message: "User is added in the house" });
      }
    });
  } else next()
});

router.get("/:id/users", requiresLogin, function(req, res, next) {
    //use schema.create to insert data into the db
  House.findById(req.params.id).populate("users").exec(function(err, house) {
    if (err) {
      return next(err);
    } else {
      return res.json({ status: "success", users : house.users });
    }
  });
});
module.exports = router;
