const Feedback = require('../models/feedbackModel')

exports.saveFeedback = async (req, res) => {
    if (!req.session.username) {
        return res.redirect('/login')
    }

    const { message } = req.body;

    const newFeedback = new Feedback({
        username: req.session.username,
        message
    })

    await newFeedback.save();
    res.send("Thank you for your feedback!");
}
