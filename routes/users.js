
const express = require('express')
const router = express.Router()
// const db = require('../sdks/sequelize')
// const { ROUTES } = require('../utils/constants')

// const NAMESPACE = ROUTES.posts

/* GET users listing. */
router.get('/', function(req, res) {
	// db.get(NAMESPACE)
	// 	.then((response) => {
	// 		console.log(response)
	// 		if (response && response.errors)
	// 			throw response.errors
	// 		else
	// 		if (!response)
	// 			return res.json({})
			return res.json({response : "hjhkj"})
	// 	})
	// 	.catch(err => {
	// 		console.log('err', err)
	// 		return res.json({status: 'error'})
	// 	})
})

router.post('/', function(req, res) {
  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {
    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
    }
    //use schema.create to insert data into the db
    User.create(userData, function (err, user) {
      if (err) {
        return next(err)
      } else {
        return res.json({status:"success", message:"Account Created"})
      }
    });
  }
})
module.exports = router