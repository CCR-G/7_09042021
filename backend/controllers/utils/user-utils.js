const passwordValidator = require('password-validator');

module.exports = {
    isEmailValid: (email) => {
        const mail_regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        return mail_regex.test(email);
    },

    isPasswordValid: (password) => {
        const passwordSchema = new passwordValidator();
        passwordSchema
            .is().min(8)
            .has().uppercase()
            .has().lowercase()
            .has().digits();

        return passwordSchema.validate(password);
    }
}