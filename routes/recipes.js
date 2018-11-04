const express = require("express");
const Recipe = require("../controllers/recipe");
const router = express.Router();
const {requiresLogin, findById} = require("../middlewares")

/* GET users listing. */
router.get("/", requiresLogin, function(req, res) {
  if (err) {
    return next(err);
  } else {
  return res.json({ response: "hjhkj" });
  }
});

/* GET users listing. */
router.get("/:id", requiresLogin, (req, res, next) => findById(Recipe, "houseId" , req, res, next)
);

router.post("/", function(req, res, next) {
  if (
    req.body.title &&
    req.body.description &&
    req.body.ingredients &&
    req.body.houseId &&
    req.body.numberOfEaters 
  ) {
    var userData = {
      title: req.body.title,
      description: req.body.description,
      ingredients: req.body.ingredients,
      houseId: req.body.houseId,
      numberOfEaters: req.body.numberOfEaters 
    };
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

router.get("/house/:houseId/", requiresLogin, function(req, res, next) {
    //use schema.create to insert data into the db
    Recipe.find(
      { houseId: req.params.houseId },  function(err, recipes) {
      if (err) {
        return next(err);
      } else {
        return res.json({ status: "success", recipes });
      }
    });
});

module.exports = router;