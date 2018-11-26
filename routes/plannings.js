const express = require("express");
const Planning = require("../models/planning");
const router = express.Router();
const {requiresLogin, findById} = require("../middlewares")

/* GET users listing. */
router.get("/", requiresLogin, function(req, res) {
  return res.json({ response: "hjhkj" });
});

router.get("/:id", requiresLogin, (req, res, next) => findById(Planning, ["adminId", "users"], req, res, next)
);

router.post("/", requiresLogin, function(req, res, next) {
  console.log("kjbjkl");
  if (
    req.body.houseId,
    req.body.date,
    req.body.ingredients,
    req.body.recipeId
  ) {
    var userData = {
      houseId :req.body.houseId,
      date : req.body.date,
      ingredients : req.body.ingredients,
      recipeId : req.body.recipeId
    };
    //use schema.create to insert data into the db
    Planning.create(userData, function(err, house) {
      if (err) {
        return next(err);
      } else {
        return res.json({ status: "success", message: "New Recipe planned" });
      }
    });
  } else next()
});

router.get("/house/:houseId/", requiresLogin, function(req, res, next) {
  //use schema.create to insert data into the db
  Planning.find(
    { houseId: req.params.houseId }).populate(["houseId", "recipeId"]).exec(function(err, plannings) {
    if (err) {
      return next(err);
    } else {
      return res.json({ status: "success", plannings });
    }
  });
});

module.exports = router;
