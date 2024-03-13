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
    FlatList,
    SectionList,
    TouchableNativeFeedback
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
import ArticleCard from "../components/articleCard";
import { useGetLawsQuery, useLazyGetLawQuery } from "../store/slices/lawSlice";
import SearchBar from "../components/searchBar";
import SearchFilters from "../components/searchFilters";
import { useSelector } from "react-redux";
import { queryArgsSliceActions } from "../store/slices/queryArgsSlice";
import CategoryCardSkeleton from '../components/Skeleton/category';

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


export default function ArticlesScreen({ navigation ,route }) {

    const layout = useWindowDimensions();

    const [isSearch, setIsSearch] = useState(false);


    const query = useSelector((state) => state?.queryArgsSlice?.lawyersFilters?.query);

    const { isLoading, isFetching, error, refetch, data: lawResp } = useGetLawsQuery(
        { query },
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
                marginHorizontal: 10
                // borderWidth: 10,
                // borderColor: "red"
            }}
        >
            <View>
                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.heading}>Browse</Text>
                    <TouchableNativeFeedback onPress={() => setIsSearch(!isSearch)}>
                        <Entypo name="magnifying-glass" size={28} color="#C8C7CC" style={{ marginVertical: 10 }} />
                    </TouchableNativeFeedback>
                </View>
                {isSearch && <SearchBar />}
            </View>
           {!query ? <FlatList
                // ListHeaderComponent={() =>}
                showsVerticalScrollIndicator={false}
                data={(isLoading || isFetching) ? new Array(10).fill(1) : lawResp?.data}
                renderItem={(props) => (isLoading || isFetching) ? <CategoryCardSkeleton /> : 
                <ArticleCard {...props} />
            }
                refreshing={isLoading || isFetching}
                onRefresh={() => refetch()}
            />
            : <SectionList 
            sections={
                (isLoading || isFetching) ? new Array(10).fill({ title: "", data: []}) : lawResp?.data
            }
            keyExtractor={(item, index) => item + index}
            renderItem={({ section, item} ) => {
                const routeMap = {
                    "Law": "Article",
                    "Sections": "Section",
                    "chapters": "Chapters"
                }
               return <Pressable onPress={() => {
                navigation.navigate(
                    routeMap[section?.title],
                    {
                        id: item?._id
                    }
                )
               }}>
               <View style={{backgroundColor:"white", padding:5}}>
                    <Text>{item?.longTitle ?? item?.title}</Text>
                </View>
               </Pressable>
            }}
            renderSectionHeader={({section: {title}}) => {
                 return (isLoading || isFetching ) ? <CategoryCardSkeleton />  : <View style={{backgroundColor:"white", padding:5}}>
                    <Text style={{fontSize:16, fontWeight:"600"}}>{title}</Text>
                </View>
                }}
            />}
        </SafeAreaView>
    );
}


function SearchResultCard ({ item }) {
    console.log(item);

    return <View>
        <Text style={{fontWeight:"500", fontSize:14}}>
          {item?.title}
        </Text>
        
    </View>
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
