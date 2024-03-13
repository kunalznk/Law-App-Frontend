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
import CategoryCard from "../components/articleCard";
import LawyerCard from "../components/lawyerCard";
import SkeletonCard from '../components/Skeleton/card';
import SkeletonCaregoryCard from '../components/Skeleton/category';

import { useGetLawyersQuery } from "../store/slices/lawyerSlice"
import SearchBar from "../components/searchBar";
import SearchFilters from "../components/searchFilters";
import { TouchableNativeFeedback } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { queryArgsSlice, queryArgsSliceActions } from '../store/slices/queryArgsSlice';

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

export default function LawyersScreen() {


    const dispatch = useDispatch();
    const [isSearch, setIsSearch] = useState(false);


    
    const lawyersFilters = useSelector((state) => state?.queryArgsSlice?.lawyersFilters);
    // const query = useSelector((state) => state?.queryArgsSlice?.lawyersSearchQuery);


    const { isLoading, isFetching, error, refetch, data: lawyersResp } = useGetLawyersQuery(
        lawyersFilters,
        {
            refetchOnMountOrArgChange: true
        }
    )



    console.log(error);


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
            <View style={{ marginHorizontal: 10 }} showsVerticalScrollIndicator={false}>
                <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 5 }}>
                    <Text style={styles.heading}>Lawyers</Text>
                    <TouchableNativeFeedback onPress={() => setIsSearch(!isSearch)}>
                        <Entypo name="magnifying-glass" size={28} color="#C8C7CC" style={{ marginVertical: 10 }} />
                    </TouchableNativeFeedback>
                </View>

                {/* <SkeletonCard />
                <CategoryCard />
                <SkeletonCaregoryCard /> */}
                <FlatList
                    ListHeaderComponent={() => isSearch && <SearchBar 
                    />

                    }
                    showsVerticalScrollIndicator={false}
                    data={(isLoading || isFetching) ? new Array(10).fill(1) : lawyersResp?.data}
                    renderItem={(props) => (isLoading || isFetching) ? <SkeletonCard /> : <LawyerCard {...props} />}
                    refreshing={isLoading || isFetching}
                    onRefresh={() => refetch()}
                // onEndReached={() => refetch({
                //     page: filter?.page + 1
                // })}
                >

                </FlatList>



                {/*  */}
            </View>

            {/* <View>
                <Pressable
                    style={styles.button}
                >
                    <Text style={styles.buttonLabel}>Find Lawyers</Text>
                </Pressable>
            </View> */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 32,
        fontWeight: "700",
        marginVertical: 10
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

    //     {
    //     rating: undefined,
    //     age: undefined,
    //     typeOfLawyer: undefined,
    //     numberOfCases: undefined,
    //     lawFIrm: undefined,
    //     location: undefined,
    //     page: 0
    // }


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