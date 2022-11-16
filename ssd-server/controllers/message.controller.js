const Message = require('../models/message.model')

const createMessage = async (req, res) => {
    if (req.body) {
        var userId = req.user.id;
        const message = new Message({ ...req.body, userId });
        message.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

module.exports = {
    createMessage
}