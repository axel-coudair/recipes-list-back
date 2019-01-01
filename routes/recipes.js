const express = require("express");
const Recipe = require("../models/recipe");
const router = express.Router();
const { requiresLogin, findById } = require("../middlewares")

/* GET users listing. */
router.get("/", requiresLogin, function (req, res) {
  Recipe.find({}, function (err, recipes) {
    if (err) {
      return next(err);
    } else {
      return res.json({ recipes });
    }
  });
});

/* GET users listing. */
router.get("/:id", requiresLogin, (req, res, next) => findById(Recipe, "houseId", req, res, next)
);

router.post("/", function (req, res, next) {
  if (
    req.body.title &&
    req.body.description &&
    req.body.ingredients &&
    req.body.userId &&
    req.body.image &&
    req.body.duration &&
    req.body.stapes &&
    req.body.numberOfEaters
  ) {
    var userData = {
      title: req.body.title,
      description: req.body.description,
      ingredients: req.body.ingredients,
      userId: req.body.userId,
      image: req.body.image,
      date: new Date().getTime(),
      duration: req.body.duration,
      stapes: req.body.stapes,
      numberOfEaters: req.body.numberOfEaters
    };

    //use schema.create to insert data into the db
    Recipe.create(userData, function (err, user) {
      if (err) {
        return next(err);
      } else {
        // return res.json({ status: "success", message: "Recipe Created" });
        return res.status(201).send();
      }
    });
  } else next()
});

router.get("/house/:houseId/", requiresLogin, function (req, res, next) {
  //use schema.create to insert data into the db
  Recipe.find(
    { houseId: req.params.houseId }, function (err, recipes) {
      if (err) {
        return next(err);
      } else {
        return res.json({ status: "success", recipes });
      }
    });
});

router.get("/user/:userId/", requiresLogin, function (req, res, next) {
  //use schema.create to insert data into the db
  Recipe.find(
    { userId: req.params.userId }, function (err, recipes) {
      if (err) {
        return next(err);
      } else {
        return res.json({ status: "success", recipes });
      }
    });
});

router.patch('/:recipeId', requiresLogin, function (req, res, next) {
  var updateObject = req.body;
  Recipe.update({ _id: req.params.recipeId }, { $set: updateObject }, function (err, user) {
    if (err) {
      return next(err);
    } else {
      //return res.json({ status: "success", message: "Recipe is updated" });
      return res.status(200).send();
    }
  });
});

router.delete('/:recipeId', requiresLogin, function (req, res, next) {
  Recipe.findOneAndRemove({ '_id': req.params.recipeId }, function (err, offer) {
    if (err) {
      return next(err);
    } else {
      // return res.json({ status: "success", message: "Recipe is updated" });
      return res.status(200).send();

    }
  });
});


module.exports = router;
