const UserModel = require('../model/user.model');
const bcrypt = require('bcrypt');


// HandleLoginError middleware
exports.HandleLoginError = async (req, res, next) => {
    const { email, username, password } = req.body;

    try {
        if ((!email && !username) || !password) {
            return res.status(400).send({ success: false, message: !email && !username ? 'Email or Username is required!' : 'Password is required!', key: !email && !username ? 'email_or_username' : 'password' });
        }

        let user;
        if (email) {
            // Login with email
            user = await UserModel.findOne({ email });
        } else {
            // Login with username
            user = await UserModel.findOne({ username });
        }

        if (!user || !(bcrypt.compare(password, user.password))) {
            return res.status(user ? 401 : 404).send({ success: false, message: !user ? 'User not found!' : 'Invalid password!', key: !user ? 'user' : 'password' });
        }

        if (user.is_delete === true) {
            return res.status(403).json({ success: false, message: 'Your account has been deleted. Please contact support for further assistance.', key: 'user' });
        }

        // If user is found and password matches, proceed to the next middleware
        req.user = user; // Attach user object to the request
        next();

    } catch (exc) {
        console.log(exc.message);
        return res.status(500).json({ success: false, message: "Something Went Wrong Please Try Again", error: exc.message });
    }
};

// DuplicateUserCheck middleware
exports.DuplicateUserCheck = async (req, res, next) => {
    const { email, username } = req.body;

    try {
        const existingUser = await UserModel.findOne({ $or: [{ email }, { username }] });

        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(409).json({ success: false, message: "Email already exists!", key: "email" });
            } else {
                return res.status(409).json({ success: false, message: "Username already exists!", key: "username" });
            }
        }
        next();

    } catch (exc) {
        console.log(exc.message);
        return res.status(500).json({ success: false, message: "Something Went Wrong Please Try Again", error: exc.message });
    };
};
