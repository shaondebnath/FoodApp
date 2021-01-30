import React from "react";
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from "@react-navigation/stack";


import { View } from 'react-native';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';


import {
    Restaurant, OrderDelivery, ContactUs, TermsAndConditions
} from '../screens'
import TabNavigator from "./TabNavigator"
import { icons, images, SIZES, COLORS, FONTS } from '../constants'
import ProfileImage from "../screens/ProfileImage";


const screenOptionStyle = {
    headerShown: false,
};

const RestaurantStack = createStackNavigator();

const RestaurantStackNav = () => {
    return (
        <RestaurantStack.Navigator
            screenOptions={screenOptionStyle}
            initialRouteName={"TabNavigator"}
        >
            <RestaurantStack.Screen name="TabNavigator" component={TabNavigator} />

            <RestaurantStack.Screen name="Restaurant" component={Restaurant} />
            <RestaurantStack.Screen name="OrderDelivery" component={OrderDelivery} />

            <RestaurantStack.Screen name="ContactUs" component={ContactUs} />
            <RestaurantStack.Screen name="TermsAndConditions" component={TermsAndConditions} />           
        </RestaurantStack.Navigator>
    );
}



//*********************** Drawer Navigator ********************************/

function CustomDrawerContent(props) {
    return (

        <DrawerContentScrollView {...props}>
            <View style={{ height: 150, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                <ProfileImage />
            </View>
            {/* <DrawerItemList {...props} /> */}           
            <DrawerItem label={"Home"} onPress={() => { props.navigation.navigate('TabNavigator') }} />            
            <DrawerItem label={"Terms and Conditions"} onPress={() => { props.navigation.navigate('TermsAndConditions') }} />                 
            <DrawerItem label={"Contact Us"} onPress={() => { props.navigation.navigate('ContactUs') }} />  


        </DrawerContentScrollView>

    );
}

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {

    return (
        <Drawer.Navigator
            // initialRouteName={"TabNavigator"}
            drawerContent={props => <CustomDrawerContent {...props} />}
            drawerContentOptions={{
                activeTintColor: '#150065',
                itemStyle: { marginVertical: 5, ...FONTS.body4 },
            }}
        >   
            <Drawer.Screen name="RestaurantStackNav" component={RestaurantStackNav} options={{ drawerLabel: 'Home' }} />   
        </Drawer.Navigator>
    );
}



//************************Drawer navigator END  ************/



const AppNavigatorContainer = props => {

    return (
        <NavigationContainer>
            <DrawerNavigator />
        </NavigationContainer>
    );
}



export default AppNavigatorContainer;