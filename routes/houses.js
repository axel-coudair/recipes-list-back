const express = require("express");
const House = require("../controllers/house");
const router = express.Router();
const {requiresLogin, findById} = require("../middlewares")

/* GET users listing. */
router.get("/", function(req, res) {
  return res.json({ response: "hjhkj" });
});

router.get("/:id", (req, res, next) => findById(House, "adminId", req, res, next)
);

router.post("/", function(req, res, next) {
  if (
    req.body.name,
    req.body.adminId
  ) {
    var userData = {
      name: req.body.name,
      adminId: req.body.adminId
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
