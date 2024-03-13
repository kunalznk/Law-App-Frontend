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
import CustomInput from "../components/customInput";
import { useDispatch } from "react-redux";
import { useLazySignInQuery } from "../store/slices/userSlice";
import { appSlice } from "../store/slices/appSlice"

export default function LoginScreen({ navigation }) {

    const dispatch = useDispatch()
    const [signIn, { isLoading, isSuccess, error }] = useLazySignInQuery()



    const [securePassword, setSecurePassword] = useState(true)
    const [terms, setTerms] = useState(false);
    const [image, setImage] = useState(null);

    const [loginForm, setLoginForm] = useState({
        email: {
            value: "kunalznk@gmail.com",
            error: "",
            test: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },
        password: {
            value: "Root@123",
            error: "",
            test: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
        }
    })

    const errorMessages = {
        name: "Enter a valid name with at least 3 letters.",
        email: "Enter a valid email address.",
        password: "Password must be 8 characters with at least one uppercase, one lowercase, one digit, and one special character.",
        mobile: "Enter a valid 10-digit mobile number."
    }

    const handleChange = (text, key) => {

        if (text.length === 0) {
            setLoginForm({
                ...loginForm,
                [key]: {
                    ...loginForm[key],
                    error: "",
                    value: text
                }
            });
            return;

        }

        const isValid = loginForm[key]["test"].test(text);
        setLoginForm({
            ...loginForm,
            [key]: {
                ...loginForm[key],
                error: isValid ? "" : errorMessages[key],
                value: text
            }
        })
    }

    const handleSubmit = async () => {
        try {
            let isValid = false;
            let newLoginForm = { ...loginForm }
            for (let key in newLoginForm) {
                if (newLoginForm[key].error || newLoginForm[key].value.length === 0) {
                    newLoginForm = {
                        ...newLoginForm,
                        [key]: {
                            ...newLoginForm[key],
                            error: errorMessages[key]
                        }
                    }
                }
                isValid = !(newLoginForm[key].error.length > 0)
            }
            if (!isValid) {
                setRegisterForm(newLoginForm);
                return;
            }

            let body = {};
            for (let key in newLoginForm) {
                body[key] = newLoginForm[key].value
            }
            const resp = await signIn(body).unwrap();
            if (resp.status === "SUCCESS") {
                dispatch(appSlice.actions.setToken(resp?.data?.token))
                navigation.navigate("Home")
            }

            let resetForm = { ...newLoginForm }
            for (let key in newLoginForm) {
                resetForm[key].value = "";
                resetForm[key].error = "";
            }
            setLoginForm(resetForm)
        } catch (error) {
            // console.log(error);
        }

    }


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
                    <CustomInput
                        error={loginForm.email.error}
                        handleChange={handleChange}
                        value={loginForm.email.value}
                        placeholder={"Email"}
                    />
                    <CustomInput
                        error={loginForm.password.error}
                        handleChange={handleChange}
                        value={loginForm.password.value}
                        placeholder={"Password"}
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
                            <Pressable onPress={() => setTerms(!terms)}>
                                <AntDesign name={terms ? "checkcircle" : "checkcircleo"} size={14} color={terms ? "green" : "black"} />
                            </Pressable>
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
                    {error && <Text style={{ color: "red" }}>
                        {error?.data?.message}
                    </Text>}
                    <Pressable
                        style={styles.button}
                        onPress={async () => await handleSubmit()}

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
                        onPress={async () => await handleSubmit()}

                    >
                        <AntDesign name="google" size={15} color="black" />
                        <Text style={{ ...styles.buttonLabel, color: "#174AC9" }}>Sign in with Google</Text>
                    </Pressable>
                </View>
            </View>

            <Pressable
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: 5,
                    marginVertical: 15,
                }}
                onPress={() => navigation.navigate("Register")}

            >
                <Text>Have an account</Text>
                <Text style={{ fontWeight: "600" }}>sign in</Text>
            </Pressable>
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
    form: {
        gap: 10
    },
});
