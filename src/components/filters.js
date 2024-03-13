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
import { TabView, SceneMap } from 'react-native-tab-view';
import Tab from "./tab";

const TabContent = () => {
    return <View style={{ flex: 1 }}>
        {/* <View style={styles.inputContainer}>
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
        </View> */}
        <View style={{ flex: 1, }}>
            <NativeSelect />
            <Select />
        </View>
    </View>
}


const renderScene = SceneMap({
    search: TabContent,
    recent: TabContent,
});

export default function Filters() {

    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);

    const [routes] = useState([
        { key: 'search', title: 'Search' },
        { key: 'recent', title: 'Recent' },
    ]);

    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: "space-between",
                marginHorizontal: 20,
                paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
                marginVertical: StatusBar.currentHeight,
                // borderWidth: 10,
                // borderColor: "red"
            }}
        >
            <View style={{ flex: 2 }}>
                <View>
                    <Text style={styles.heading}>Discover</Text>
                </View>
                <View style={{
                    width: "100%",
                    flex: 2
                }}>
                    <TabView
                        navigationState={{ index, routes }}
                        renderScene={renderScene}
                        onIndexChange={setIndex}
                        initialLayout={{ width: layout.width, height: layout.height }}
                        renderTabBar={({ navigationState, ...rest }) => {
                            return <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 5,
                                marginVertical: 10,
                            }}>
                                {navigationState?.routes?.map(({ title }, i) => <Tab
                                    label={title}
                                    onPress={() => setIndex(i)}
                                    active={i === index}
                                />)}
                            </View>
                        }}
                    />
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

// const styles = StyleSheet.create({
//     heading: {
//         fontSize: 32,
//         fontWeight: "700",
//         // marginVertical:15
//     },
//     subheading: {
//         fontSize: 18,
//         color: "#B3B3B3",
//         fontWeight: "500",
//         marginHorizontal: 5
//         // marginVertical:15

//     },
//     highlight: {
//         height: 2,
//         backgroundColor: "#59ADFD",
//         borderRadius: 25,
//         marginHorizontal: 2
//     },
//     container: {
//         flex: 1,
//         justifyContent: "space-evenly",
//         alignItems: "center",
//         paddingTop: StatusBar.currentHeight,
//         paddingHorizontal: 20,
//     },
//     profile: {
//         width: "25%",
//         aspectRatio: 1,
//         borderRadius: 100,
//     },
//     text: {
//         fontSize: 14,
//         fontWeight: "400",
//         textAlign: "center",
//     },
//     pagination: {
//         // borderWidth: 5,
//         // borderColor: "red",
//     },
//     button: {
//         backgroundColor: "#174AC9",
//         borderRadius: 64,
//         paddingVertical: 10,
//         marginVertical: 10,
//         width: "100%",
//         alignItems: "center",
//     },
//     buttonLabel: {
//         fontSize: 12,
//         fontWeight: "600",
//         color: "#fff",
//     },
//     input: {
//         height: 40,
//         color: "#000",
//         width: "90%"
//         // marginVertical: 4,
//     },
//     inputContainer: {
//         flexDirection: "row",
//         alignItems: "center",
//         backgroundColor: "#F0EFF5",
//         paddingHorizontal: 5,
//         borderRadius: 10,
//         gap: 5
//     },
//     form: {
//         gap: 10
//     },
// });

import { Dropdown } from 'react-native-element-dropdown';
import Select from './select';

const data = [
    { label: 'Experience Level', value: null },
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
];

function NativeSelect() {

    const [selectedLanguage, setSelectedLanguage] = useState();

    const pickerRef = useRef();

    function open() {
        pickerRef.current.focus();
    }

    function close() {
        pickerRef.current.blur();
    }

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                    Dropdown label
                </Text>
            );
        }
        return null;
    };


    return <>
        <View style={styles.container}>
            {/* {renderLabel()} */}
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }, value && { backgroundColor: "#174AC9"}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                // inputSearchStyle={styles.inputSearchStyle}
                // iconStyle={styles.iconStyle}
                data={data}
                // search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={'Experience Level'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setValue(item.value);
                    setIsFocus(false);
                }}
            // renderLeftIcon={() => (
            //     <AntDesign
            //         style={styles.icon}
            //         color={isFocus ? 'blue' : 'black'}
            //         name="Safety"
            //         size={20}
            //     />
            // )}
            />
        </View>
    </>
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        // padding: 16,
        borderRadius: 20,
        // borderWidth: 0.2,
        borderColor: "#C8C7CC",
    },
    dropdown: {
        // height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 20,
        paddingHorizontal: 15,

    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        // fontSize: 16,
        color: "#C8C7CC",
        fontWeight: "600"
    },
    selectedTextStyle: {
        // fontSize: 16,
        color: "#FFFFFF",
        fontWeight: "600"

    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        borderWidth: 1
    },
});