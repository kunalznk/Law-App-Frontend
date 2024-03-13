import { forwardRef, useRef, useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    useWindowDimensions,
    Image,
    SafeAreaView,
    StatusBar,
    TextInput,
    Platform,
    FlatList
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Button } from "react-native-elements";
import { Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { TabView, SceneMap } from 'react-native-tab-view';
import Tab from "../components/tab";
import Card from "../components/card";
import { ScrollView } from "react-native";
import { FontAwesome6 } from '@expo/vector-icons';
import CategoryCard from "../components/articleCard";
import { useGetLawQuery } from "../store/slices/lawSlice";

const TabContent = () => {
    return <View style={styles.form}>
        <View style={styles.inputContainer}>
            <Entypo name="location-pin" size={18} color="#C8C7CC" />
            <TextInput
                placeholder="Name"
                style={styles.input}
                placeholderTextColor="#000000"
            />
        </View>
        <View style={styles.inputContainer}>
            <MaterialIcons name="date-range" size={18} color="#C8C7CC" />
            <TextInput
                placeholder="Date"
                style={styles.input}
                placeholderTextColor="#000000"
            />
        </View>
        <View style={styles.inputContainer}>
            <MaterialIcons name="timelapse" size={18} color="#C8C7CC" />
            <TextInput
                placeholder="Time"
                style={styles.input}
                placeholderTextColor="#000000"
            />
        </View>
        <View style={styles.inputContainer}>
            <MaterialIcons name="category" size={18} color="#C8C7CC" />
            <TextInput
                placeholder="Category"
                style={styles.input}
                placeholderTextColor="#C8C7CC"
            />
        </View>
        <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="gender-male-female-variant" size={18} color="#C8C7CC" />
            <TextInput
                placeholder="Gender"
                style={styles.input}
                placeholderTextColor="#C8C7CC"
            />
        </View>
    </View>
}

const renderScene = SceneMap({
    search: TabContent,
    recent: TabContent,
});


const Section = () => {
    return <View>
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginHorizontal: 5,
                marginVertical: 10,
            }}
        >
            <View>
                <Text style={{
                    fontSize: 20,
                    fontWeight: "600", color: "#000"
                }}>Categories</Text>
            </View>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "flex-end",
                    gap: 5
                }}
            >
                <Text style={{ color: "#B3B3B3", fontWeight: "500" }}>See all</Text>
                <AntDesign name="right" size={14} color="#B3B3B3" />
            </View>

        </View>
        <FlatList
            horizontal
            data={[1, 2, 3, 4, 5, 6, 7]}
            renderItem={(props) => <Card {...props} />}
            showsHorizontalScrollIndicator={false}
        />
    </View>
}

const SearchBar = () => {
    return <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                <Entypo name="magnifying-glass" size={18} color="#C8C7CC" />
                <TextInput
                    placeholder="Search"
                    style={styles.input}
                    placeholderTextColor="#C8C7CC"
                />
            </View>
            <Pressable>
                <Entypo name="cross" size={18} color="#C8C7CC" />
            </Pressable>

        </View>
        <View>
            <Text>Cancel</Text>
        </View>
    </View>
}

const SearchFilters = () => {
    return <>
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={["Clear All", "Civil", "8 - 12 ", "Male"]}
            renderItem={({ item }) => <Pressable
                style={styles.filter}
            >
                <Text style={styles.filterLabel}>{item}</Text>
            </Pressable>}
        />
    </>
}

export default function SearchScreen({ route }) {

    const layout = useWindowDimensions();


    return (
        <SafeAreaView
            style={{
                flex: 1,
                // justifyContent: "space-between",
                paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
                marginVertical: StatusBar.currentHeight,
                // borderWidth: 10,
                // borderColor: "red"
            }}
        >
            <View style={{ flex: 1, marginHorizontal: 10 }} showsVerticalScrollIndicator={false}>
                <View style={{}}>
                    <Text style={styles.heading}>Browse</Text>
                    <SearchBar />
                    <SearchFilters />
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={[1, 2, 3, 4, 5, 6, 7, 8]}
                        renderItem={() => <CategoryCard />}
                    />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 32,
        fontWeight: "700",
        marginHorizontal: 5,
        // marginVertical:15
    },
    subheading: {
        fontSize: 16,
        color: "#B3B3B3",
        fontWeight: "500",
        marginHorizontal: 5
        // marginVertical:15

    },
    highlight: {
        height: 2,
        backgroundColor: "#59ADFD",
        borderRadius: 25,
        marginHorizontal: 2
    },
    container: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
        paddingTop: StatusBar.currentHeight,
        paddingHorizontal: 20,
    },
    profile: {
        width: "25%",
        aspectRatio: 1,
        borderRadius: 100,
    },
    text: {
        fontSize: 14,
        fontWeight: "400",
        textAlign: "center",
    },
    pagination: {
        // borderWidth: 5,
        // borderColor: "red",
    },
    button: {
        backgroundColor: "#174AC9",
        borderRadius: 64,
        paddingVertical: 10,
        marginVertical: 10,
        width: "100%",
        alignItems: "center",
    },
    buttonLabel: {
        fontSize: 12,
        fontWeight: "600",
        color: "#fff",
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        // backgroundColor: "#F0EFF5",
        paddingHorizontal: 5,
        borderRadius: 10,
        marginVertical: 10,
        // marginHorizontal:5,
        // borderWidth:1,
        gap: 5
    },
    input: {
        height: 35,
        color: "#000",
        fontSize: 16,
        fontWeight: "300",
        maxWidth: "88%",
        // marginVertical: 4,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#F0EFF5",
        paddingHorizontal: 5,
        borderRadius: 10,
        // gap: 5,
        flex: 1,

    },
    form: {
        gap: 10
    },
    filter: {
        backgroundColor: "#174AC9",
        borderRadius: 100,
        paddingVertical: 10,
        marginVertical: 10,
        marginHorizontal: 5,
        alignItems: "center",
        width: "auto"
    },
    filterLabel: {
        fontSize: 10,
        fontWeight: "500",
        color: "#fff",
        marginHorizontal: 10
    },
});
