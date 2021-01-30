import React, { Component } from 'react';
import { StatusBar, StyleSheet, Platform, Text, View, TouchableOpacity, Image } from "react-native";
import { icons, images, SIZES, COLORS, FONTS } from '../constants'


export default class HeaderBar extends Component {
    constructor(props) {
        super(props);
        this.headerTitle = this.props.headerText;

    }

    renderBackButton() {
        return (
            <TouchableOpacity
                style={{
                    width: 50,
                    paddingLeft: SIZES.padding * 2,
                    justifyContent: 'center'
                }}
                onPress={() => this.props.navigation.goBack()}
            >
                <Image
                    source={icons.back}
                    resizeMode="contain"
                    style={{
                        width: 30,
                        height: 30,
                        tintColor: COLORS.white
                    }}
                />
            </TouchableOpacity>
        )
    }

    renderMenuButton() {

        return (
            <TouchableOpacity
                style={{
                    width: 50,
                    paddingRight: SIZES.padding * 2,
                    justifyContent: 'center'
                }}
                onPress={() => {
                    this.props.navigation.toggleDrawer() // openDrawer()
                }}
            >
                <Image
                    source={icons.burgerIcon}
                    resizeMode="contain"
                    style={{
                        width: 30,
                        height: 30,
                        tintColor:COLORS.white
                    }}
                />
            </TouchableOpacity>
        )
    }

    render() {


        return (

            <View style={{ flexDirection: 'row', height: 50, backgroundColor: COLORS.primary }}>
                {this.props.isShowBack ? this.renderBackButton() : null}

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={styles.titleBackground} >
                        <Text style={styles.titleStyle}>{this.props.headerText}</Text>
                    </View>
                </View>

                {this.renderMenuButton()}
            </View>
        );

    }
}

const styles = StyleSheet.create({


    titleStyle: {
        // color: Platform.OS === 'ios' ? "#007aff" : "#47585a",
        //fontFamily: FONTS.h2,
        ...FONTS.body2,
        color: COLORS.white,
        //fontSize: 20,
        lineHeight: 20,


    },

    titleBackground: {
        width: '70%',
        height: "100%",
        //backgroundColor: COLORS.lightGray3,
        alignItems: 'center',
        justifyContent: 'center',
        //borderRadius: 30
    }


})