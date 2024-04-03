const UserModel = require('../model/user.model');
const SecurePassword = require('../helpers/SecurePassword');
const CreateToken = require('../helpers/CreateToken');

// Login user
exports.Login = async (req, res) => {

    try {
        // Accessing the user object attached by the middleware 
        const User = req.user;
        const tokenData = CreateToken(User);
        return res.status(200).json({ success: true, message: "Login Successful!", data: User, token: tokenData });
    } catch (exc) {
        return res.status(500).json({ success: false, messaage: "Internal server error", error: exc.message })
    }
};

// Register user
exports.Register = async (req, res) => {
    const { full_name, username, email, password, type } = req.body;
    try {
        const HashedPassword = await SecurePassword(password);
        const NewUser = await UserModel({
            full_name,
            username,
            email,
            password: HashedPassword,
            type
        });

        const userData = await NewUser.save();
        const tokenData = CreateToken(NewUser);
        return res.status(201).json({ success: true, message: "Registered Successfully!", data: userData, token: tokenData });
    } catch (exc) {
        return res.status(500).json({ success: false, messaage: "Internal server error", error: exc.message })
    }
};