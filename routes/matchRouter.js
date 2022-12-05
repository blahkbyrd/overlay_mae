const express = require('express')
const router = express.Router()
const {getAllMatches, getMatchOfTheDay} = require('../controllers/matchController')
const {auth} = require('./../middleware/authMiddleware')

router.get('/', auth, getAllMatches)
router.get('/match-du-jour', auth, getMatchOfTheDay)

module.exports = router