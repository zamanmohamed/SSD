const router = require('express').Router();

const { userLogin, userRegister } = require('../controllers/auth.controller');

router.post('/login', async(req, res) => {
    await userLogin(req.body , res);
});

router.post('/register', async(req, res) => {
    await userRegister(req.body, res);
});

module.exports = router;