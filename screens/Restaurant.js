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
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

import { isIphoneX } from 'react-native-iphone-x-helper'

import { icons, COLORS, SIZES, FONTS } from '../constants'

import DemoData from "../database/DemoData"
import HeaderBar from "./HeaderBar"
import AsyncStorage from '@react-native-community/async-storage';
import DBUsers from '../database/DBUsers';




const Restaurant = ({ route, navigation }) => {

    //const scrollX = new Animated.Value(0);
    const [restaurant, setRestaurant] = React.useState(null);
    const [currentLocation, setCurrentLocation] = React.useState(null);
    const [orderItems, setOrderItems] = React.useState([]);
    const [favRest, setFavRest] = React.useState(false);
   
    React.useEffect(() => {
        let { item, currentLocation } = route.params;
        
        setRestaurant(item)
        setCurrentLocation(currentLocation)


        
        if (DBUsers.favRestInfo.includes(restaurant?.id))
            setFavRest(true)
    })

    function editOrder(action, menuId, price, name) {
        let orderList = orderItems.slice()
        let item = orderList.filter(a => a.menuId == menuId)

        if (action == "+") {
            if (item.length > 0) {
                let newQty = item[0].qty + 1
                item[0].qty = newQty
                item[0].total = item[0].qty * price
            } else {
                const newItem = {
                    menuId: menuId,
                    menuName: name,
                    qty: 1,
                    price: price,
                    total: price
                }
                orderList.push(newItem)
            }

            setOrderItems(orderList)
        } else {
            if (item.length > 0) {
                if (item[0]?.qty > 0) {
                    let newQty = item[0].qty - 1
                    item[0].qty = newQty
                    item[0].total = newQty * price
                }
            }

            setOrderItems(orderList)
        }
    }

    function getOrderQty(menuId) {
        let orderItem = orderItems.filter(a => a.menuId == menuId)

        if (orderItem.length > 0) {
            return orderItem[0].qty
        }

        return 0
    }

    function getBasketItemCount() {
        let itemCount = orderItems.reduce((a, b) => a + (b.qty || 0), 0)

        return itemCount
    }

    function sumOrder() {
        let total = orderItems.reduce((a, b) => a + (b.total || 0), 0)

        return total.toFixed(2)
    }

    function favRestaurant() {
        
        if (DBUsers.favRestInfo?.includes(restaurant?.id)) {
            const index = DBUsers.favRestInfo.indexOf(restaurant?.id);
            if (index > -1) {
                DBUsers.favRestInfo.splice(index, 1);
            }
            setFavRest(false)
        }
        else {
            setFavRest(true)
            DBUsers.favRestInfo.push(restaurant?.id)
        }
        
        AsyncStorage.setItem('localFavRestInfo', JSON.stringify(DBUsers.favRestInfo));        
    }

    function renderLikeButton() {
        return (
            <View style={{ top: 0, width: SIZES.width, position: 'absolute'}}>
                <TouchableOpacity
                    style={styles.likeStyle}
                    onPress={() => favRestaurant()}
                >
                    <View style={{ width: 50, height: 50, borderRadius: 50, backgroundColor:COLORS.white, justifyContent:'center', alignItems:'center', }}>
                        <Image
                            source={icons.like}
                            resizeMode="cover"
                            style={{
                                width: 35,
                                height: 35,
                                tintColor: favRest ? COLORS.primary : COLORS.darkgray
                            }}
                        />
                    </View>
                </TouchableOpacity>

            </View >
        );

    }




    function renderFoodInfo() {

        const _renderItem = ({ item, index }) => {            
            return (
                <View
                    key={'menu-'+index}
                    style={{ alignItems: 'center' }}
                >
                    <View style={{ height: SIZES.height * 0.3 }}>                      

                        {/* Food Image */}
                        <Image
                            source={item.photo}
                            resizeMode="cover"
                            style={{
                                width: SIZES.width*0.9,
                                height: "100%",
                                
                            }}
                        />
                     

                        {/* Quantity */}
                        <View style={styles.quantityViewStyle}>
                            <TouchableOpacity
                                style={styles.negButtonStyle}
                                onPress={() => editOrder("-", item.menuId, item.price)}
                            >
                                <Text style={{ ...FONTS.body1 }}>-</Text>
                            </TouchableOpacity>

                            <View
                                style={styles.quantityNoStyle}
                            >
                                <Text style={{ ...FONTS.h2 }}>{getOrderQty(item.menuId)}</Text>
                            </View>

                            <TouchableOpacity
                                style={styles.posButtonStyle}
                                onPress={() => editOrder("+", item.menuId, item.price, item.name)}
                            >
                                <Text style={{ ...FONTS.body1 }}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Name & Description */}
                    <View
                        style={{
                            width: SIZES.width,
                            alignItems: 'center',
                            marginTop: 15,
                            paddingHorizontal: SIZES.padding * 2
                        }}
                    >
                        <Text style={{ marginVertical: 10, textAlign: 'center', ...FONTS.h3 }}>{item.name} - {item.price.toFixed(2)}</Text>
                        <Text style={{ ...FONTS.body4 }}>{item.description}</Text>
                    </View>

                    {/* Calories */}
                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: 10
                        }}
                    >
                        <Image
                            source={icons.fire}
                            style={{
                                width: 20,
                                height: 20,
                                marginRight: 10
                            }}
                        />

                        <Text style={{
                            ...FONTS.body3, color: COLORS.darygray
                        }}>{item.calories.toFixed(2)} cal</Text>
                    </View>
                </View>

            );
        }

        return (
            <AppIntroSlider renderItem={_renderItem}
                data={restaurant?.menu}
                onDone={() => { }}
                doneLabel={''}
                nextLabel={''}
                showSkipButton={false}
                skipLabel={''}
                onSkip={() => { }}
                activeDotStyle={{ backgroundColor: '#f18732' }}
                keyExtractor={(item, index) =>
                    JSON.stringify(index)}
                
            />
        )
    }

    function renderOrder() {
        
        return (
            <View>
                
                <View
                    style={{
                        backgroundColor: COLORS.white,
                        borderTopLeftRadius: 40,
                        borderTopRightRadius: 40
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingVertical: SIZES.padding * 2,
                            paddingHorizontal: SIZES.padding * 3,
                            borderBottomColor: COLORS.lightGray2,
                            borderBottomWidth: 1
                        }}
                    >
                        <Text style={{ ...FONTS.body3 }}>{getBasketItemCount()} items in Cart</Text>
                        <Text style={{ ...FONTS.body3 }}>${sumOrder()}</Text>
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
                                //console.log(sumOrder(), restaurant.name)
                                if (sumOrder() > 0) {
                                    navigation.navigate("OrderDelivery", {
                                        restaurant: restaurant,
                                        currentLocation: currentLocation,
                                        totalAmount: sumOrder(),
                                        orderItem: orderItems
                                    })
                                }
                                else {
                                    Alert.alert('You did not add any item into the cart.')
                                }
                            }}
                        >
                            <Text style={{ color: COLORS.white, ...FONTS.body3 }}>Order</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {isIphoneX() &&
                    <View
                        style={{
                            position: 'absolute',
                            bottom: -34,
                            left: 0,
                            right: 0,
                            height: 34,
                            backgroundColor: COLORS.white
                        }}
                    >
                    </View>
                }
            </View>
        )
    }

    
    return (
        
        <SafeAreaView style={styles.container}>
            <HeaderBar headerText={restaurant?.name}
                navigation={navigation}
                isShowBack={true}
            />

            {restaurant ? renderFoodInfo() : null}
            {renderLikeButton()}
            {renderOrder()}

        </SafeAreaView>
    )
}

export default Restaurant;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray2
    },
    
    quantityViewStyle: {
        position: 'absolute',
        bottom: - 20,
        width: SIZES.width,
        height: 40,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    negButtonStyle: {
        width: 50,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25
    },
    quantityNoStyle: {
        width: 50,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center'
    },
    posButtonStyle: {
        width: 50,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25
    },
    likeStyle: {
        position: 'absolute',
        top: 60,
        right: 20,
        width: 50,
        height: 50,
        justifyContent: 'center',
        flexDirection: 'row',        
    }
        

})