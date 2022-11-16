const router = require('express').Router();
const { userAuth, checkRole } = require('../controllers/auth.controller');
const { createMessage, getAllMessage } = require('../controllers/message.controller');
const { upload } = require("../middlewares/file_upload");

//create message
router.post('/messages/create', userAuth, checkRole(['admin','worker','manager']), async (req, res) => {
    await createMessage(req, res);
});

//upload file
router.post('/files/upload', userAuth, checkRole(['admin','manager']), upload.single('image'), (req, res) => {
    if (req.file) {
        res.json(req.file);
    }
});

module.exports = router;