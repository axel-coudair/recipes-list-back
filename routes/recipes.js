const express = require("express");
const Recipe = require("../controllers/recipe");
const router = express.Router();
const {requiresLogin} = require("../middlewares")

/* GET users listing. */
router.get("/", function(req, res) {
  return res.json({ response: "hjhkj" });
});

router.post("/", function(req, res, next) {
  if (
    req.body.title &&
    req.body.description &&
    req.body.ingredients
  ) {
    var userData = {
      title: req.body.title,
      description: req.body.description,
      ingredients: req.body.ingredients
    };
    console.log("fdfdsfdq")
    //use schema.create to insert data into the db
    Recipe.create(userData, function(err, user) {
      if (err) {
        return next(err);
      } else {
        return res.json({ status: "success", message: "Recipe Created" });
      }
    });
  } else next()
});
module.exports = router;
