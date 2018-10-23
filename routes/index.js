var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;

module.exports = app => {
  app
    .route("/messages")
    .get((req, res) => {
      console.log("getAll message");
      return res.status(200).json();
    })
};

