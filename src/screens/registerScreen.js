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
    KeyboardAvoidingView,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Button } from "react-native-elements";
import { Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome6 } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import CustomInput from "../components/customInput";
import { useLazySignUpQuery } from "../store/slices/userSlice";
import { appSlice }  from "../store/slices/appSlice"
import { useDispatch } from "react-redux";

export default function RegisterScreen({ navigation }) {

    const dispatch = useDispatch()

    const [securePassword, setSecurePassword] = useState(true)
    const [terms, setTerms] = useState(false);
    const [image, setImage] = useState(null);

    const [registerForm, setRegisterForm] = useState({
        name: {
            value: "",
            error: "",
            test: /^[a-zA-Z]{3,}$/
        },
        email: {
            value: "",
            error: "",
            test: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },
        password: {
            value: "",
            error: "",
            test: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
        },
        mobile: {
            value: "",
            error: "",
            test: /^[0-9]{10}$/
        }
    })

    const [signUp, { isLoading, isSuccess, error }] = useLazySignUpQuery()

    const errorMessages = {
        name: "Enter a valid name with at least 3 letters.",
        email: "Enter a valid email address.",
        password: "Password must be 8 characters with at least one uppercase, one lowercase, one digit, and one special character.",
        mobile: "Enter a valid 10-digit mobile number."
    }

    async function resetForm() {
        setRegisterForm(
            {
                name: {
                    value: "",
                    error: "",
                    test: /^[a-zA-Z]{3,}$/
                },
                email: {
                    value: "",
                    error: "",
                    test: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                },
                password: {
                    value: "",
                    error: "",
                    test: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
                },
                mobile: {
                    value: "",
                    error: "",
                    test: /^[0-9]{10}$/
                }
            }
        )
    }
    const handleChange = (text, key) => {


        if (text.length === 0) {
            setRegisterForm({
                ...registerForm,
                [key]: {
                    ...registerForm[key],
                    error: "",
                    value: text
                }
            });
            return;

        }

        const isValid = registerForm[key]["test"].test(text);
        setRegisterForm({
            ...registerForm,
            [key]: {
                ...registerForm[key],
                error: isValid ? "" : errorMessages[key],
                value: text
            }
        })
    }

    const handleSubmit = async () => {
        try {
            let isValid = false;
            let newRegisterForm = { ...registerForm }
            for (let key in newRegisterForm) {
                if (newRegisterForm[key].error || newRegisterForm[key].value.length === 0) {
                    newRegisterForm = {
                        ...newRegisterForm,
                        [key]: {
                            ...newRegisterForm[key],
                            error: errorMessages[key]
                        }
                    }
                }
                isValid = !(newRegisterForm[key].error.length > 0)
            }
            if (!isValid) {
                setRegisterForm(newRegisterForm);
                return;
            }

            let body = {};
            for (let key in newRegisterForm) {
                body[key] = newRegisterForm[key].value
            }
            const resp = await signUp(body).unwrap();
            if (resp.status === "SUCCESS") {
                dispatch(appSlice.actions.setToken(resp?.data?.token))
                navigation.navigate("Verify", {
                    email: body.email,
                    expiresAt: resp?.data?.expiresAt
                })
            }

            let resetForm = { ... newRegisterForm }
            for (let key in newRegisterForm) {
                resetForm[key].value = "";
                resetForm[key].error = "";
            }
            setRegisterForm(resetForm)
        } catch (error) {
            // console.log(error);
        }

    }

    const { width, height } = useWindowDimensions();
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });

        // console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].base64);
        }
    };

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
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
                                <Text style={styles.heading}>Welcome User</Text>
                                <Text style={styles.subheading}>sign up to join</Text>
                            </View>
                            <Pressable style={{ ...styles.profile }} onPress={pickImage}>
                                <Image
                                    source={{
                                        uri: image ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp2LFSC9kIgG3osSzJ4CbTs8z6OWsnQHu0aN7BDR7qkGXIfJrEVqg6m_OLHQ&s",
                                    }}
                                    style={{ ...styles.profile, width: "100%" }}
                                />
                                <View style={{ position: "absolute", bottom: "10%", right: "15%", backgroundColor: "#174AC9", borderRadius: 100 }}>
                                    <MaterialIcons name="add" size={24} color="white" />
                                </View>
                            </Pressable>

                        </View>
                        <View style={styles.form}>
                            <CustomInput
                                error={registerForm.name.error}
                                handleChange={handleChange}
                                value={registerForm.name.value}
                                placeholder={"Name"}
                            />
                            <CustomInput
                                error={registerForm.password.error}
                                handleChange={handleChange}
                                value={registerForm.password.value}
                                placeholder={"Password"}
                            />
                            <CustomInput
                                error={registerForm.email.error}
                                handleChange={handleChange}
                                value={registerForm.email.value}
                                placeholder={"Email"}
                            />
                            <CustomInput
                                error={registerForm.mobile.error}
                                handleChange={handleChange}
                                value={registerForm.mobile.value}
                                placeholder={"Mobile"}
                            />
                            {error && <Text style={{ color: "red" }}>
                                {error?.data?.message}
                            </Text>}

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
                                <Text>I agree to the</Text>
                                <Text style={{ fontWeight: "600" }}>Term of Services</Text>
                            </View>
                            <Pressable
                                style={styles.button}
                                onPress={async () => await handleSubmit()}
                            >
                                {isLoading ?
                                    <ActivityIndicator size="small" />
                                    :
                                    <Text style={styles.buttonLabel}>Sign Up</Text>}
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
                        onPress={() => navigation.navigate("Login")}
                    >
                        <Text>Have an account</Text>
                        <Text style={{ fontWeight: "600" }}>sign in</Text>
                    </Pressable>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </ScrollView>
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
        marginVertical: 10,
        width: "100%",
        alignItems: "center",
    },
    buttonLabel: {
        fontSize: 12,
        fontWeight: "600",
        color: "#fff",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F0EFF5",
        paddingHorizontal: 10,
        borderRadius: 10,
        gap: 5
    },
    input: {
        height: 40,
        // backgroundColor: "#F0EFF5",
        paddingHorizontal: 5,
        borderRadius: 10,
        color: "#000",
        marginVertical: 4,
        width: "80%"
    },
    form: {
        gap: 10
    },
});
