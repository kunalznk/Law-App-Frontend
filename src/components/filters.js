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
    Platform
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Button } from "react-native-elements";
import { Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

export default function Filters() {
    const { width, height } = useWindowDimensions();


    const Tab = ({ label, active }) => {
        return <View style={{ gap: 10 }}>
            <Text style={{ ...styles.subheading, color: "#000" }}>
                {label}
            </Text>
            <View style={styles.highlight} />
        </View>
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: "space-between",
                marginHorizontal: 20,
                paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
                marginVertical: StatusBar.currentHeight
                // borderWidth: 10,
                // borderColor: "red"
            }}
        >
            <View>
                <View>
                    <Text style={styles.heading}>Discover</Text>
                </View>
                <View style={styles.form}>
                    <View style={{ flexDirection: "row", gap: 5, marginVertical: 15, borderBottomColor: "#c3c7cc", borderBottomWidth: 1 }}>
                        <Tab label={"Search"} />
                        <Tab label={"Recent"} />
                    </View>
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
            </View>

            <View>
                <Pressable
                    style={styles.button}
                >
                    <Text style={styles.buttonLabel}>Find Lawyers</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 32,
        fontWeight: "700",
        // marginVertical:15
    },
    subheading: {
        fontSize: 18,
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
    input: {
        height: 40,
        color: "#000",
        // marginVertical: 4,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F0EFF5",
        paddingHorizontal: 5,
        borderRadius: 10,
        gap: 5
    },
    form: {
        gap: 10
    },
});
