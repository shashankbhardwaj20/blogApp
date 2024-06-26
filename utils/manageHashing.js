const bcrypt = require('bcrypt');


async function hashPassword(password) {
    const saltRounds = 10; // You can change this value, more rounds means more secure but slower
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (err) {
        console.error('Error hashing password:', err);
    }
}

async function comparePasswords(plainTextPassword, hash) {
    try {
        const match = await bcrypt.compare(plainTextPassword, hash);
        return match;
    } catch (err) {
        console.error('Error comparing passwords:', err);
    }
}

module.exports = {hashPassword,comparePasswords}