import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
    Home, Restaurant, OrderDelivery, Search, Like, User } from '../screens'
import Tabs from "./tabs"


const Stack = createStackNavigator();

const screenOptionStyle = {
    headerShown: false
};

const MainStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={screenOptionStyle}
            initialRouteName={"Home"}
        >
            <Stack.Screen name="Home" component={Tabs} />
            <Stack.Screen name="Restaurant" component={Restaurant} />
            <Stack.Screen name="OrderDelivery" component={OrderDelivery} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="User" component={User} />
            <Stack.Screen name="Like" component={Like} />
        </Stack.Navigator>
    );
}

export { MainStackNavigator };