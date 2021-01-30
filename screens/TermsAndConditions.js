import React from "react"
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList
} from "react-native";
import { icons, images, SIZES, COLORS, FONTS } from '../constants'
import HeaderBar from "./HeaderBar"


const TermsAndConditions = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.container}>
            <HeaderBar headerText={"Terms & Conditions"}
                navigation={navigation}
                isShowBack={false}
            />

            <View style={{ padding: SIZES.padding * 3 }}>
                <Text style={{ ...FONTS.body4 }}>Sample Terms and condition text</Text>
                <Text style={{ ...FONTS.body4 }}>Sample Data privacy Text</Text>
                

            </View>



        </SafeAreaView>

    )

}

export default TermsAndConditions


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray4
    },
})