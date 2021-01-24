import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { MainStackNavigator} from "./navigation/StackNavigator";
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-community/async-storage';
import DBUsers from './database/DBUsers';


let userInfo = DBUsers.uerDetails

///** Google login process */
function _configureGoogleSignIn() {
    GoogleSignin.configure({
        offlineAccess: false,
    });
}

async function _getCurrentUserGoogle() {

    try {
        const authUserInfo = await GoogleSignin.signInSilently();
        if (authUserInfo != null) {
            userInfo.auth_email = authUserInfo.user.email;
            userInfo.auth_first_name = authUserInfo.user.givenName;
            userInfo.auth_last_name = authUserInfo.user.familyName;
            userInfo.auth_userID = authUserInfo.user.id;
            userInfo.auth_photoURL = authUserInfo.user.photo;
            DBUsers.isLoggedIn = true;            
            console.log('User logged in successful')
        }


    } catch (error) {
        const errorMessage =
            error.code === statusCodes.SIGN_IN_REQUIRED ? 'Please sign in :)' : error.message;
        console.log(errorMessage);

    }
}

async function loginCheck() {
    _configureGoogleSignIn();
    await _getCurrentUserGoogle();
}


////*****Google login process end */

///*****Local Storage */

async function localStorage() {
    let favRestInfo = [];
    let getfavRestInfo = await AsyncStorage.getItem('localFavRestInfo');
    let getfavRestInfoJson = JSON.parse(getfavRestInfo);
    //console.log(getfavRestInfoJson)

    if (getfavRestInfoJson == null) {
        console.log("i m in null- 1st time")
        AsyncStorage.setItem('localFavRestInfo', JSON.stringify(favRestInfo));

    }
    else {
        DBUsers.favRestInfo = getfavRestInfoJson
    }
}

////** */



const App = () => {

    loginCheck()
    localStorage()


    return (
        /// for stack navigator
        <NavigationContainer>            
            <MainStackNavigator />
        </NavigationContainer>
     
    )
}

export default App;