const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    full_name: { type: String, require: true },
    username: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    role: { type: String, default: "" },
    type: { type: String, require: true },
    permission: { type: Array, default: [] },
    is_delete: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('user', UserSchema);

