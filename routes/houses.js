const express = require("express");
const House = require("../controllers/house");
const router = express.Router();
const {requiresLogin} = require("../middlewares")

/* GET users listing. */
router.get("/", function(req, res) {
  return res.json({ response: "hjhkj" });
});

router.post("/", function(req, res, next) {
  if (
    req.body.name
  ) {
    var userData = {
      name: req.body.name
    };
    //use schema.create to insert data into the db
    House.create(userData, function(err, user) {
      if (err) {
        return next(err);
      } else {
        return res.json({ status: "success", message: "House Created" });
      }
    });
  } else next()
});
module.exports = router;
