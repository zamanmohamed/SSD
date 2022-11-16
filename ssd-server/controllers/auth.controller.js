const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
dotenv.config();
const passport = require('passport');

const userRegister = async (userData, res) => {
    try {
        //check username is already exist ot not
        let username = await validateUsername(userData.username);
        if (!username) {
            return res.status(400).json({
                message: `Username is already exist`,
                success: false
            });
        }

        //check email is already exist ot not
        let email = await validateEmail(userData.email);
        if (!email) {
            return res.status(400).json({
                message: `Email is already exist`,
                success: false
            });
        }

        //ghash the password before send it to the db
        const password = await bcrypt.hash(userData.password, 12);

        const newUser = new User({
            ...userData,
            password,
        });

        const userSignup = await newUser.save();

        const payload = {
            newUser: {
                id: userSignup.id,
                role: userSignup.role
            }
        };

        jwt.sign(
            payload,
            process.env.APP_SECRET,
            { expiresIn: 1000 },

            function (err, token) {
                if (err) {
                    res.send(err)
                }
                res.status(200).json({
                    token,
                    userSignup,
                    message: 'User Registered Successfully'
                })
            })

    } catch (err) {
        console.log(err);
        res.status(400).json({ 'error': err })
    }
};

//user login
const userLogin = async (userCredit, res) => {
    let { username, password } = userCredit;

    //check for the username
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(404).json({
            message: "Username or password is incorrect",
            success: false
        });
    }

    //check for the password
    let isValidPassword = await bcrypt.compare(password, user.password);
    if (isValidPassword) {
        let token = jwt.sign(
            {
                newUser: {
                    id: user.id,
                    role: user.role
                }
            }, process.env.APP_SECRET, { expiresIn: "1 days" });

        let result = {
            username: user.username,
            email: user.email,
            role: user.role,
            token: token,
            expiresIn: 24
        };

        return res.status(200).json({
            ...result,
            message: "Logged in successfully",
            success: true
        });

    } else {
        return res.status(403).json({
            message: "Username or password is incorrect",
            success: false
        });
    }
};

const validateUsername = async username => {
    let user = await User.findOne({ username });
    return user ? false : true;
};

const validateEmail = async email => {
    let user = await User.findOne({ email });
    return user ? false : true;
};

const userAuth = passport.authenticate('jwt', { session: false });

const checkRole = roles => (req, res, next) =>
    !roles.includes(req.user.role) ? res.status(401).send({ error: 'Unauthorized' })
        : next();

module.exports = {
    userRegister,
    userLogin,
    userAuth,
    checkRole
}