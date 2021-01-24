import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    BackHandler,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    ImageBackground,
    Platform,
    TouchableOpacity,
    Alert,
    FlatList
} from 'react-native';
import { icons, COLORS, SIZES, FONTS } from '../constants'
import DemoData from "../database/DemoData"
import HeaderBar from "./HeaderBar"

const OrderDelivery = ({ route, navigation }) => {

    const [restaurant, setRestaurant] = React.useState(null);
    const [currentLocation, setCurrentLocation] = React.useState(null);
    const [totalAmount, setTotalAmount] = React.useState(null);
    const [orderItem, setOrderItem] = React.useState(null);

    React.useEffect(() => {
        let { restaurant, currentLocation, totalAmount,orderItem } = route.params;

        setRestaurant(restaurant)
        setCurrentLocation(currentLocation)
        setTotalAmount(totalAmount)
        setOrderItem(orderItem)
    })
    const rowHeight = 40

    const _renderItem = ({ item }) => {
        console.log(item.menuName)
        return (
            
            <View style={{ flexDirection: 'row', borderColor: COLORS.secondary, borderBottomWidth: 1 }}>
                <View style={{ width: "40%", alignSelf: 'baseline', borderColor: COLORS.secondary, borderRightWidth: 1 }}>
                    <Text style={{ ...FONTS.body3, left: 5, right:5, color: COLORS.primary, textAlignVertical: 'center', minHeight: rowHeight, width:"100%" }}>{item.menuName}</Text>
                </View>
                <View style={{ width: "30%", justifyContent: 'center', alignItems: 'center', borderColor: COLORS.secondary, borderRightWidth: 1 }}>
                    <Text style={{ ...FONTS.body3, color: COLORS.primary }}>{item.qty + " x " + item.price}</Text>
                </View>
                <View style={{ width: "30%", justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ ...FONTS.body3, color: COLORS.primary }}>{item.total}</Text>
                </View>
                </View>
                
        )
    }

    console.log(restaurant?.name, orderItem, totalAmount)
    
    return (

        <SafeAreaView style={styles.container}>
            <HeaderBar headerText={"Your Orders"}
                navigation={navigation}
                isShowBack={true}
            />

            <View style={{ padding: SIZES.padding * 2 }}>
                <Text style={{ ...FONTS.h4, color: COLORS.primary }}>{"Thank you for your order. \nIt will be delivered within " + restaurant?.duration}</Text> 
            </View>            
            <View style={{ padding: SIZES.padding * 1 }}>
                <Text style={{ ...FONTS.h4, color: COLORS.primary }}>Your order details:</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'column'}}>
                <View style={{flexDirection: 'row', borderColor:COLORS.secondary, borderWidth:1 }}>
                    <View style={{ width: "50%", height: rowHeight,  }}>
                        <Text style={{ ...FONTS.body3, color: COLORS.primary, textAlignVertical:'center', height:rowHeight, left:5 }}>Restaurant Name:</Text>
                    </View>
                    <View style={{ width: "50%", height: rowHeight, justifyContent:'center', alignItems:'center'  }}>
                        <Text style={{ ...FONTS.body3, color: COLORS.primary }}>{restaurant?.name }</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', borderColor: COLORS.secondary, borderWidth: 1 }}>
                    <View style={{ width: "40%", height: rowHeight, borderColor: COLORS.secondary, borderRightWidth: 1 }}>
                        <Text style={{ ...FONTS.body3, left: 5, color: COLORS.primary, textAlignVertical: 'center', height: rowHeight }}>Items</Text>
                    </View>
                    <View style={{ width: "30%", height: rowHeight, justifyContent: 'center', alignItems: 'center', borderColor: COLORS.secondary, borderRightWidth: 1 }}>
                        <Text style={{ ...FONTS.body3, color: COLORS.primary }}>Qty</Text>
                    </View>
                    <View style={{ width: "30%", height: rowHeight, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ ...FONTS.body3, color: COLORS.primary }}>Total</Text>
                    </View>
                </View>

                <FlatList
                    data={orderItem}
                    vertical
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) =>
                        JSON.stringify(index)}
                    renderItem={_renderItem}
                //contentContainerStyle={{ paddingVertical: SIZES.padding * 0 }}
                />

                <View style={{ flexDirection: 'row', borderColor: COLORS.secondary, borderWidth: 1 }}>
                    <View style={{ width: "70%", height: rowHeight, borderColor: COLORS.secondary, borderRightWidth: 1 }}>
                        <Text style={{ ...FONTS.body3, color: COLORS.primary, textAlignVertical: 'center', textAlign:'right', right: 10, height: rowHeight }}>Total</Text>
                    </View>
                    <View style={{ width: "30%", height: rowHeight, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ ...FONTS.body3, color: COLORS.primary }}>{totalAmount}</Text>
                    </View>
                </View>
                
            </View>
            

            {/* Order Button */}
            <View
                style={{
                    padding: SIZES.padding * 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <TouchableOpacity
                    style={{
                        width: SIZES.width * 0.9,
                        padding: SIZES.padding,
                        backgroundColor: COLORS.primary,
                        alignItems: 'center',
                        borderRadius: SIZES.radius
                    }}
                    onPress={() => {
                        
                        
                            navigation.navigate("Home")
                        
                    }}
                >
                    <Text style={{ color: COLORS.white, ...FONTS.body3 }}>Order Again</Text>
                </TouchableOpacity>
            </View>
            

        </SafeAreaView>
        
    )
}

export default OrderDelivery;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray2
    },
})