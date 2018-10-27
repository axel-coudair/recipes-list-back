
const express = require('express')
const router = express.Router()

/* GET / listing. */
router.get('/', requiresLogin, function(req, res) {
	return res.json({response : "hjhkj"})
})
module.exports = router