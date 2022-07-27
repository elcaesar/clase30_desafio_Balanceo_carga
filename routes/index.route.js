const router = require('express').Router()
const {homeGet, infoGet, randomsGet} = require('../controllers/index.controller')

router.get('/', homeGet)

router.get('/info', infoGet)

router.get('/api/randoms', randomsGet)

module.exports = router