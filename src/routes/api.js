const express = require('express');
const {getAllUsers} = require('../controllers/apiController')

const router = express.Router();

router.get('/data',getAllUsers)

module.exports = router