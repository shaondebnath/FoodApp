export default class DBUsers {

    auth_email = "";
    auth_first_name = "";
    auth_last_name = "";
    auth_userID = "";
    auth_photoURL = "";
    favRestInfo = [];


    constructor()
    {
        this.auth_email = "";
        this.auth_first_name = "";
        this.auth_last_name = "";
        this.auth_userID = "";
        this.auth_photoURL = "";
    }
}


DBUsers.isLoggedIn = false;
DBUsers.favRestInfo = [];

if (DBUsers.uerDetails == null)
    DBUsers.uerDetails = new DBUsers()