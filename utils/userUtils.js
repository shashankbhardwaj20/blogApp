let userName='';


function setUserName(providedUserName){
    return userName = providedUserName;
}
function unsetUserName(){
    userName='';
}
function getUserName(){
    return userName;
}

module.exports = {getUserName,setUserName,unsetUserName}