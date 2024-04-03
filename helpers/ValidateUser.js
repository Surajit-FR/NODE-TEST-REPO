const JOI = require('joi');

module.exports = (UserModel) => {
    const UserSchema = JOI.object({
        full_name: JOI.string().min(3).max(40).required().pattern(/^[a-zA-Z ]+$/).messages({
            "string.empty": "Full name is required!",
            "string.min": "Minimum length should be 3",
            "string.max": "Maximum length should be 40",
            "string.pattern.base": "Only alphabets and blank spaces are allowed",
        }),
        username: JOI.string().min(3).max(10).required().pattern(/^[a-z0-9@#\$%\^\&*\)\(+=._-]+$/).messages({
            "string.empty": "Username is required!",
            "string.min": "Minimum length should be 3",
            "string.max": "Maximum length should be 10",
            "string.pattern.base": "Only lowercase alphabets, numbers & special characters are allowed",
        }),
        email: JOI.string().min(3).max(20).required().email({ minDomainSegments: 1, maxDomainSegments: 2, tlds: { allow: ['com', 'co', 'in'] } }).pattern(/^[a-zA-Z0-9._%+-]+(@[a-zA-Z0-9.-]{5,})+\.[a-zA-Z]{2,}$/).messages({
            "string.empty": "Email is required!",
            "string.min": "Minimum length should be 3",
            "string.max": "Maximum length should be 20",
            "string.email": "Invalid email format",
            "string.pattern.base": "Invalid email format",
        }),
        password: JOI.string().min(8).max(16).required().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])([a-zA-Z0-9@#\$%\^\&*\)\(+=._-]){8,}$/).messages({
            "string.empty": "Password is required!",
            "string.min": "Minimum length should be 8",
            "string.max": "Maximum length should be 16",
            "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, and one number & one special character!",
        }),
        type: JOI.string().min(3).max(10).required().pattern(/^[a-zA-Z]/).messages({
            "string.empty": "Type is required!",
            "string.min": "Minimum length should be 3",
            "string.max": "Maximum length should be 10",
            "string.pattern.base": "Only alphabets are allowed!",
        }),
    })

    return UserSchema.validate(UserModel);
};