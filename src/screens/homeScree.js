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
import {
    useNavigation
} from "@react-navigation/native";
import Skeleton from "../components/skeleton";
import { useSelector } from "react-redux";
import { useGetLawyersQuery } from "../store/slices/lawyerSlice";
import SkeletonCard from '../components/Skeleton/card';
import TopLawyer from "../components/TopLawyer";

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
    const navigation = useNavigation()
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
            <Pressable
                style={{
                    flexDirection: "row",
                    alignItems: "flex-end",
                    gap: 5
                }}
                onPress={() => navigation.navigate("Lawyers")}

            >
                <Text style={{ color: "#B3B3B3", fontWeight: "500" }}>See all</Text>
                <AntDesign name="right" size={14} color="#B3B3B3" />
            </Pressable>

        </View>
        <FlatList
            horizontal
            data={[1, 2, 3, 4, 5, 6, 7]}
            renderItem={(props) => <Card {...props} />}
            showsHorizontalScrollIndicator={false}
        />
    </View>
}

export default function HomeScreen({ navigation }) {

    const { isLoading, isFetching, error, refetch, data: lawyersResp } = useGetLawyersQuery(
        undefined,
        {
            refetchOnMountOrArgChange: true
        }
    )
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
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <View>
                    <Text style={styles.heading}>Browse</Text>
                </View>
                <Section />

                {/* Top Lawyers */}
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
                        }}>Top Lawyers</Text>
                    </View>
                    <Pressable
                        style={{
                            flexDirection: "row",
                            alignItems: "flex-end",
                            gap: 5
                        }}
                        onPress={() => navigation.navigate("Lawyers")}

                    >
                        <Text style={{ color: "#B3B3B3", fontWeight: "500" }}>See all</Text>
                        <AntDesign name="right" size={14} color="#B3B3B3" />
                    </Pressable>

                </View>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={(isLoading || isFetching) ? new Array(10).fill(1) : lawyersResp?.data}
                    renderItem={(props) => (isLoading || isFetching) ? <SkeletonCard /> : <TopLawyer {...props} />}
                    refreshing={isLoading || isFetching}
                    onRefresh={() => refetch()}
                    // onEndReached={() => refetch({
                    //     page: filter?.page + 1
                    // })}
                >

                </FlatList>
                <Section />

            </ScrollView>
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


{/*

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

*/ }