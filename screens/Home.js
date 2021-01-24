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
import DemoData from "../database/DemoData"
import HeaderBar from "./HeaderBar"


const Home = ({ navigation }) => {
    
    const [categories, setCategories] = React.useState(DemoData.categoryData)
    const [selectedCategory, setSelectedCategory] = React.useState(null)
    const [restaurants, setRestaurants] = React.useState(DemoData.restaurantData)
    const [currentLocation, setCurrentLocation] = React.useState(DemoData.initialCurrentLocation)

       
    function onSelectCategory(category) {
        //filter restaurant
        let restaurantList = DemoData.restaurantData.filter(a => a.categories.includes(category.id))

        if (category.id == 0)
            restaurantList = DemoData.restaurantData

        setRestaurants(restaurantList)

        setSelectedCategory(category)
    }

    function getCategoryNameById(id) {
        let category = categories.filter(a => a.id == id)

        if (category.length > 0)
            return category[0].name

        return ""
    }


    function renderMainCategories() {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={[styles.categoryButtonStyle, styles.shadow, { backgroundColor: (selectedCategory?.id == item.id) ? COLORS.primary : COLORS.white }]}
                    onPress={() => onSelectCategory(item)}
                >
                    <View
                        style={[styles.categoryImageBG,
                        { backgroundColor: (selectedCategory?.id == item.id) ? COLORS.white : COLORS.lightGray }
                        ]}
                    >
                        <Image
                            source={item.icon}
                            resizeMode="contain"
                            style={{ width: 30, height: 30 }}
                        />
                    </View>

                    <Text
                        style={{
                            marginTop: SIZES.padding,
                            color: (selectedCategory?.id == item.id) ? COLORS.white : COLORS.black,
                            ...FONTS.body5
                        }}
                    >
                        {item.name}
                    </Text>
                </TouchableOpacity>
            )
        }

        //console.log(categories)

        return (
            <View style={{ padding: SIZES.padding * 2 }}>
                <Text style={{ ...FONTS.h3 }}>Main Categories</Text>                

                <FlatList
                    data={categories}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) =>
                        JSON.stringify(item.id)}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
                />
            </View>
        )
    }

    function renderRestaurantList() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                style={{
                    marginBottom: SIZES.padding * 2, borderBottomColor: COLORS.lightGray3,
                    borderBottomWidth: 1 }}
                onPress={() => navigation.navigate("Restaurant", {
                    item,
                    currentLocation
                })}
            >
                {/* Image */}
                <View style={{marginBottom: SIZES.padding}} >
                    <Image
                        source={item.photo}
                        resizeMode="cover"
                        style={{width: "100%", height: 150, borderRadius: SIZES.radius}}
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





    // console.log(categories)

    return (
        <SafeAreaView style={styles.container}>
            <HeaderBar headerText={currentLocation?.streetName}
                navigation={navigation}
                isShowBack={false}
            />
            {renderMainCategories()}
            {renderRestaurantList()}
        </SafeAreaView>
    )
}



export default Home;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray4
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
    },

    categoryButtonStyle: {
        padding: SIZES.padding,
        paddingBottom: SIZES.padding * 2,        
        borderRadius: SIZES.radius,
        alignItems: "center",
        justifyContent: "center",
        marginRight: SIZES.padding,

    },
    categoryImageBG: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
    },

    restaurantItemStyle: {
        position: 'absolute',
        bottom: 0,
        height: 40,
        width: SIZES.width * 0.3,
        backgroundColor: COLORS.white,
        borderTopRightRadius: SIZES.radius,
        borderBottomLeftRadius: SIZES.radius,
        alignItems: 'center',
        justifyContent: 'center',
        
    }
})

