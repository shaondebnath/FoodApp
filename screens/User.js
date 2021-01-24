import React, { Component, useState, useEffect } from "react";
import { View, Text, Image, Alert, StyleSheet, Button, TouchableOpacity, Dimensions } from "react-native";
import DBUsers from '../database/DBUsers';
import ProfileImage from './ProfileImage';
import { icons, COLORS, SIZES, FONTS } from '../constants'
import AsyncStorage from '@react-native-community/async-storage';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';


let userInfo = DBUsers.uerDetails
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class User extends Component {
//const User = ({ route, navigation }) => {


    constructor(props) {
        super(props);
    }


    //******* For Google Sign in  */

    _signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const authUserInfo = await GoogleSignin.signIn();
            console.log('Trying User logged in ')            

            if (authUserInfo != null) {
                userInfo.auth_email = authUserInfo.user.email;
                userInfo.auth_first_name = authUserInfo.user.givenName;
                userInfo.auth_last_name = authUserInfo.user.familyName;
                userInfo.auth_userID = authUserInfo.user.id;
                userInfo.auth_photoURL = authUserInfo.user.photo;
                DBUsers.isLoggedIn = true;
                this.setState({ userLogin: true })
                console.log('User logged in successful')            
            }


        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // sign in was cancelled
                Alert.alert('Cancelled');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation in progress already
                Alert.alert('In progress');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                Alert.alert('Play services not available or outdated');
            } else {
                Alert.alert('Something went wrong:', error.toString());
            }
        }
    };

    ///**********Google Sign in END */


    ///*** Logout */

    logoutPressed = () => {

        this._signOut();

    }

    _signOut = async () => {
      
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();

            DBUsers.isLoggedIn = false;
            this.setState({userLogin: false})
        } catch (error) {
            Alert.alert("", "Error Occurs")

        }

    };


    /// Logout END

   

    render() {
        console.log('rendering Panel Without login')
        console.log('DBUsers.isLoggedIn: ', DBUsers.isLoggedIn)
        if (DBUsers.isLoggedIn == false) {
            return (
                <View style={[styles.container,{justifyContent:'center', alignItems:'center'}]}>
                    <ProfileImage />
                    <Text style={[styles.styleProfileName,{...FONTS.body2}]}>{"Anonymous"}</Text>
                    <GoogleSigninButton
                        style={styles.loginGoogleImage}
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Dark}
                        onPress={this._signIn} />
                </View>
            );
        }
        else {
            return (
                // rendering panel when its logged in 

                <View style={{ flex: 1 }}>
                    <View style={{ justifyContent: 'space-around' }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <ProfileImage />
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={[styles.styleProfileName, {...FONTS.body2}]}>
                                {DBUsers.uerDetails.auth_first_name + " " + DBUsers.uerDetails.auth_last_name}
                            </Text>
                        </View>
                        <View style={{ width: screenWidth *0.95 }}>
                            <TouchableOpacity
                                style={{alignItems:'flex-end'}}
                                onPress={this.logoutPressed}
                            >
                                <Text style={{ ...FONTS.body3, color: COLORS.primary }}>{"Log out"}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: 1, backgroundColor: '#0d20a9' }}>
                        </View>

                    </View>
                </View>

            )
        }
    }
}


//export default User;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray2
    },
    styleProfileName: {        
        top: 5,
        padding: 10,             
        textAlign: "center",
        color: "#150065",        
    },
    loginGoogleImage: {        
        width: 220,
        height: 48,
        bottom: 0,        
    },

})
