let isLoggedIn=false;

function checkIsLogged(){
    if(!isLoggedIn) return false;
    return true;
}

function setLogin(){
    isLoggedIn=true;
}

function unsetLogin(){
    isLoggedIn = false;
}

module.exports = {checkIsLogged,setLogin,unsetLogin}