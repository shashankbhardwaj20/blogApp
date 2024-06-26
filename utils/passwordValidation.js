function passwordValidation(password) {
    const minLength = 8;
    const maxLength = 12;
    const specialChars = /[@_]/;
    const lowerCase = /[a-z]/;
    const upperCase = /[A-Z]/;
    const digit = /\d/;
  
    if (password.length < minLength || password.length > maxLength) {
      return false;
    }
    if (!lowerCase.test(password)) {
      return false;
    }
    if (!upperCase.test(password)) {
      return false;
    }
    if (!digit.test(password)) {
      return false;
    }
    if (!specialChars.test(password)) {
      return false;
    }
  
    return true;
}
  
module.exports = {passwordValidation}
