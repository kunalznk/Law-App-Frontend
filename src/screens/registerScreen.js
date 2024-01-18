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
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Button } from "react-native-elements";
import { Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function RegisterScreen() {
    const { width, height } = useWindowDimensions();

    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: "space-evenly",
            }}
        >
            <View style={{ paddingHorizontal: 20 }}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                        marginVertical: 15,
                    }}
                >
                    <View style={{ width: "50%", gap: 5 }}>
                        <Text style={styles.heading}>Welcome Back</Text>
                        <Text style={styles.subheading}>Sign in to continue</Text>
                    </View>
                    {/* <Image
                        source={{
                            uri: "https://fastly.picsum.photos/id/47/200/200.jpg?hmac=dF66rvzPwuJCh4L7IjS6I0D5xrpPvqhAjbE7FstnEnY",
                        }}
                        style={styles.profile}
                    /> */}
                </View>
                <View style={styles.form}>
                    <TextInput
                        placeholder="Email"
                        style={styles.input}
                        placeholderTextColor="#000000"
                    />
                    <TextInput
                        placeholder="Password"
                        style={styles.input}
                        placeholderTextColor="#000000"
                    />

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: 5,
                            marginVertical: 10,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 5,
                                marginVertical: 10,
                            }}
                        >
                            <AntDesign name="checkcircle" size={14} color="green" />
                            <Text>Remember me</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 5,
                                marginVertical: 10,
                            }}
                        >
                            <Text style={{ color: "#B3B3B3" }}>Forgot password ?</Text>
                        </View>

                    </View>
                    <Pressable
                        style={styles.button}
                    >
                        <Text style={styles.buttonLabel}>Sign in</Text>
                    </Pressable>
                    <Pressable
                        style={{ ...styles.button, backgroundColor: "#FFF", borderWidth: 1, flexDirection: "row", justifyContent: "center", gap: 5, alignItems: "flex-end" }}
                    >
                        <AntDesign name="facebook-square" size={15} color="black" />
                        <Text style={{ ...styles.buttonLabel, color: "#174AC9" }}>Sign in with Facebook</Text>
                    </Pressable>
                    <Pressable
                        style={{ ...styles.button, backgroundColor: "#FFF", borderWidth: 1, flexDirection: "row", justifyContent: "center", gap: 5, alignItems: "flex-end" }}
                    >
                        <AntDesign name="google" size={15} color="black" />
                        <Text style={{ ...styles.buttonLabel, color: "#174AC9" }}>Sign in with Google</Text>
                    </Pressable>
                </View>
            </View>

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: 5,
                    marginVertical: 15,
                }}
            >
                <Text>Have an account</Text>
                <Text style={{ fontWeight: "600" }}>sign in</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 32,
        fontWeight: "700",
    },
    subheading: {
        fontSize: 15,
        color: "#B3B3B3"
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
        marginVertical: 5,
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
        backgroundColor: "#F0EFF5",
        paddingHorizontal: 15,
        borderRadius: 10,
        color: "#000",
        marginVertical: 4,
    },
    form: {},
});
