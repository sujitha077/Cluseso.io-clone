const express = require('express')
const router = express.Router()
const feedbackController = require('../controllers/feedbackController')

router.get('/feedback', (req, res) => {
    if (!req.session.username) return res.redirect('/login')
    res.render('feedbackOne')
})

router.post('/feedback', feedbackController.saveFeedback)

module.exports = router
