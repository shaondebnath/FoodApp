import React from "react"
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    Button,
    Alert
} from "react-native";
import { icons, images, SIZES, COLORS, FONTS } from '../constants'
import HeaderBar from "./HeaderBar"


const ContactUs = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.container}>
            <HeaderBar headerText={"Contact Us"}
                navigation={navigation}
                isShowBack={false}
            />

            <View style={{ padding: SIZES.padding * 2 }}>
                <Text style={{ ...FONTS.h3 }}>Name:</Text>                
                <Text style={{ ...FONTS.h3 }}>Address:</Text>
                <Text style={{ ...FONTS.h3 }}>Phone:</Text>
                <Text style={{ ...FONTS.h3 }}>Email:</Text>                
               
            </View>

            

        </SafeAreaView>

    )

}

export default ContactUs


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray4
    },
})