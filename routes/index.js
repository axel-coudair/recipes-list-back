
const express = require('express')
const router = express.Router()

/* GET / listing. */
router.get('/', function(req, res) {
			return res.json({response : "hjhkj"})
})
module.exports = router