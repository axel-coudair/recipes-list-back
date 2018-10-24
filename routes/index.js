
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
module.exports = router