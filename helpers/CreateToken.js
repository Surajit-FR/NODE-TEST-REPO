const { secret_key } = require('./SecretKey');
const JWT = require('jsonwebtoken');

const CreateToken = (user) => {
    const token = JWT.sign({
        _id: user._id,
        full_name: user.full_name,
        username: user.username,
        email: user.email,
        password: user.password,
        role: user.role,
        type: user.type,
        permission: user.permission,
        is_delete: user.is_delete
    }, secret_key, { expiresIn: '24h' });

    return token;
};

module.exports = CreateToken;