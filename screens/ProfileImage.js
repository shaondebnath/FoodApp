import React, { Component } from "react";
import { View, TouchableOpacity, Image, StyleSheet, Dimensions, Text, Platform } from "react-native";
import { icons, COLORS, SIZES, FONTS } from '../constants'
import DBUsers from '../database/DBUsers';


let userInfo = DBUsers.uerDetails
let fontSize = 70;
let borderWidth = 3;
let size= 120

export default class ProfileImage extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={styles.imageCircle}>
                <Text style={styles.textStyle}>
                    {userInfo.auth_first_name == "" ? "A" : userInfo.auth_first_name.charAt(0)}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    imageCircle: {
        top:5,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:COLORS.primary,
        borderColor: "white",
        width:size,   height:size,
        borderRadius:size,
        borderWidth:borderWidth,
    },
    textStyle: {
        textAlign: 'center',
        textAlignVertical:'center',
        fontSize:fontSize - 2 * borderWidth,
        lineHeight:fontSize - (Platform.OS === 'ios' ? 2 * borderWidth : borderWidth),
        color:"white"
    }
});
