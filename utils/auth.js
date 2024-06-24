const jwt = require("jsonwebtoken");
const stamp = "Shashak@8165Bhardwaj@2000";
function setUser(user){
    const signedToken = jwt.sign(
        {
            _id : user._id,
            email : user.email,
            userName : user.userName
        },
        stamp,
        {expiresIn:'1d'}
    );
    return signedToken;
}

function getUser(token){
    if(!token) return null;
    return jwt.verify(token,stamp);
}

module.exports = {getUser,setUser};