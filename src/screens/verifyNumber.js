import { forwardRef, useRef, useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    useWindowDimensions,
    Image,
    SafeAreaView,
    StatusBar,
    Pressable,
    TextInput
} from "react-native";

export default function VerifyScreen() {

    const { width, height } = useWindowDimensions();


    return <SafeAreaView style={{
        gap: 15,
        marginHorizontal: 20,
        marginTop: StatusBar.currentHeight,
        // borderWidth: 5,
        // borderColor:"red",
        // padding:20


    }}>
        <View style={{marginTop: (height/10)}}>
            <Text style={{ fontWeight: "600", textAlign: "center" }}>
                We've sent you verification code email@exmaple.com
            </Text>
        </View>
        <TextInput
            placeholder="Enter a code"
            style={styles.input}
            placeholderTextColor="#000000"
        />
        <Pressable
            style={styles.button}
        >
            <Text style={styles.buttonLabel}>Verify</Text>
        </Pressable>
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 5,
                // marginVertical: 10,
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                    // marginVertical: 10,
                }}
            >
                <Text style={{ fontWeight: "600" }}>Resend code</Text>
            </View>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Text style={{ color: "#B3B3B3" }}>1:20 min left</Text>
            </View>

        </View>


    </SafeAreaView>
}

const styles = StyleSheet.create({
    heading: {

    },
    button: {
        backgroundColor: "#174AC9",
        borderRadius: 64,
        paddingVertical: 10,
        // marginVertical: 10,
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
        width: "100%"
    },
})