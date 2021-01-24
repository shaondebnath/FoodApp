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
import DBUsers from "../database/DBUsers";
import DemoData from "../database/DemoData"
import HeaderBar from "./HeaderBar"


const Like = ({ navigation }) => {

    const [restaurants, setRestaurants] = React.useState(null)
    const [categories, setCategories] = React.useState(DemoData.categoryData)
    const [currentLocation, setCurrentLocation] = React.useState(DemoData.initialCurrentLocation)

    function restaurentList() {
        let restaurantsList = []
        DBUsers.favRestInfo.forEach(favID => {
            console.log('favid ', favID)

            DemoData.restaurantData.forEach(restaurant => {
                if (restaurant.id == favID) {
                    restaurantsList.push(restaurant);

                }
            })
        })

        return restaurantsList
    }

    React.useEffect(() => {       
        navigation.addListener(
            'focus',
            payload => {
                //call some action here
                restaurantsList = restaurentList()
                setRestaurants(restaurantsList)
                console.log(restaurants)
            }
        );
    }, [])
    

    

    function getCategoryNameById(id) {
        let category = categories.filter(a => a.id == id)

        if (category.length > 0)
            return category[0].name

        return ""
    }

    function renderRestaurantList() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                style={{
                    marginBottom: SIZES.padding * 2, borderBottomColor: COLORS.lightGray3,
                    borderBottomWidth: 1
                }}
                onPress={() => navigation.navigate("Restaurant", {
                    item,
                    currentLocation
                })}
            >
                {/* Image */}
                <View style={{ marginBottom: SIZES.padding }} >
                    <Image
                        source={item.photo}
                        resizeMode="cover"
                        style={{ width: "100%", height: 150, borderRadius: SIZES.radius }}
                    />

                    <View style={[styles.restaurantItemStyle, styles.shadow]} >
                        <Text style={{ ...FONTS.h4 }}>{item.duration}</Text>
                    </View>
                </View>

                {/* Restaurant Info */}
                <Text style={{ ...FONTS.body3 }}>{item.name}</Text>

                <View
                    style={{
                        marginTop: SIZES.padding,
                        flexDirection: 'row'
                    }}
                >
                    {/* Rating */}
                    <Image
                        source={icons.star}
                        style={{
                            height: 20,
                            width: 20,
                            tintColor: COLORS.primary,
                            marginRight: 10
                        }}
                    />
                    <Text style={{ ...FONTS.body3 }}>{item.rating}</Text>

                    {/* Categories */}
                    <View
                        style={{
                            flexDirection: 'row',
                            marginLeft: 10
                        }}
                    >
                        {
                            item.categories.map((categoryId) => {
                                return (
                                    <View
                                        style={{ flexDirection: 'row' }}
                                        key={categoryId}
                                    >
                                        <Text style={{ ...FONTS.body3 }}>{getCategoryNameById(categoryId)}</Text>
                                        <Text style={{ ...FONTS.h3, color: COLORS.darkgray }}> . </Text>
                                    </View>
                                )
                            })
                        }

                        {/* Price */}
                        {
                            [1, 2, 3].map((priceRating) => (
                                <Text
                                    key={priceRating}
                                    style={{
                                        ...FONTS.body3,
                                        color: (priceRating <= item.priceRating) ? COLORS.black : COLORS.darkgray
                                    }}
                                >$</Text>
                            ))
                        }
                    </View>
                </View>
            </TouchableOpacity>
        )

        
        return (
            <FlatList
                data={restaurants}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding * 2,
                    paddingBottom: 30
                }}
            />
        )
    }

    

    return (
        <SafeAreaView style={styles.container}>
            <HeaderBar headerText={"Favorite Restaurants"}
                navigation={navigation}
                isShowBack={false}
            />

            {renderRestaurantList()}

        </SafeAreaView>

    )

}

export default Like


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray4
    },
})