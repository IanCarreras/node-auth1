const bcrypt = require('bcryptjs')
const express = require('express')
const usersModel = require('./users-model')
const restricted = require('../middleware/restricted')
const router = express.Router()

router.get('/', restricted(), async (req, res, next) => {
    try {
        const users = await usersModel.find()
        
        res.json(users)
    } catch (err) {
        next(err)
    }
})

module.exports = router