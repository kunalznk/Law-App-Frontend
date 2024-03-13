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
import { CountDown } from "../components/countDown";
import { useSelector } from "react-redux";
import { useLazyVerifyEmailQuery, useLazyGetUserQuery } from "../store/slices/userSlice";

export default function VerifyScreen( { navigation, route }) {

    const { width, height } = useWindowDimensions();
    const [otp, setOtp ] = useState(null);
    const { email, expiresAt } = route?.params;

    const [ verifyEmail, { isLoading, error  }] = useLazyVerifyEmailQuery();
    // const [ getUser, { isError  }] =useLazyGetUserQuery();

    async function handleSubmit () {
        try {
            const resp = await verifyEmail({
                email,
                otp
            }).unwrap();
            if (resp.status === "SUCCESS") { 
                // await getUser().unwrap()
                navigation.navigate(
                    "Home"
                )
            }
        } catch (error) {
           console.log(error);
        }
    }

    return <SafeAreaView style={{
        flex:1,
        gap: 15,
        marginHorizontal: 20,
        // marginTop: StatusBar.currentHeight,
        // backgroundColor:"white"
        // borderWidth: 5,
        // borderColor:"red",
        // padding:20


    }}>
        <View style={{marginTop: 30}}>
            <Text style={{ fontWeight: "600", textAlign: "center" }}>
                We've sent you verification code {email}
            </Text>
        </View>
        <TextInput
            placeholder="Enter a code"
            style={styles.input}
            placeholderTextColor="#C8C7CC"
            inputMode="numeric"
            value={otp}
            onChangeText={(text) => setOtp(text)}
        />
        <Pressable
            style={{...styles.button,
            backgroundColor: otp?.length != 6 ? "#C8C7CC" : "#174AC9"
        }}
            onPress={async () => await handleSubmit()}
            disabled={otp?.length != 6}

        >
            <Text style={styles.buttonLabel}>Verify</Text>
        </Pressable>

        {error && <Text style={{ color: "red" }}>
                                {error?.data?.message}
                            </Text>}
        {/* <View
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

        </View> */}

        <CountDown remainingSeconds={Math.floor((expiresAt - new Date())/1000)}/>


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