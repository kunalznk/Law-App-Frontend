import { Text, View, StyleSheet, ScrollView, ImageBackground, Pressable, Platform, StatusBar, SafeAreaView, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useGetLawyerQuery } from '../store/slices/lawyerSlice';
import { useEffect } from 'react';
import Skeleton from '../components/skeleton';


export default function LawyerScreen({ route }) {



    const { isLoading, isFetching, data: lawyerResp, error, refetch } = useGetLawyerQuery(route?.params?.lawyerId ?? "65a21cff2397c5aabf539ae2", {
        refetchOnMountOrArgChange: true
    })

    console.log(error);

    return <SafeAreaView style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        marginVertical: StatusBar.currentHeight,
        marginHorizontal: 10,
        flex: 1
    }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>

            {(isLoading || isFetching) ? <LawyerSkeleton />
                : <>
                    {/* Actual Screen */}
                    <View style={{ flexDirection: 'row', gap: 5, width: "100%", marginVertical: 10 }}>
                        <Text style={styles.heading}>
                            {lawyerResp?.data?.typeOfLawyer}
                        </Text>
                        <View style={{ paddingHorizontal: 10, paddingVertical: 5, backgroundColor: "#86C3FF", borderRadius: 25 }}>
                            <Text style={{ fontSize: 16, fontWeight: "500" }}>
                                {lawyerResp?.data?.numberOfCases}+
                            </Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between", marginVertical: 10 }}>
                        <View style={{ gap: 5 }}>
                            <Text style={{ fontSize: 20, fontWeight: "600" }}>
                                {lawyerResp?.data?.name}
                            </Text>
                            <Text style={{ color: "#2D60DF" }}>
                                {lawyerResp?.data?.typeOfLawyer}
                            </Text>
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "flex-end", gap: 5, width: "50%" }}>
                            <Pressable
                                style={{ ...styles.button, width: "25%" }}
                            >
                                <Feather name="phone" size={14} color="white" />
                            </Pressable>
                            <Pressable
                                style={{ ...styles.button, width: "25%" }}
                            >
                                <Entypo name="mail" size={14} color="white" />
                            </Pressable>

                            <Pressable
                                style={{ ...styles.button, width: "25%" }}
                            >
                                <Ionicons name="chatbubble" size={14} color="white" />
                            </Pressable>

                        </View>
                    </View>

                    <View style={{ ...styles.imageContainer, marginVertical: 10 }}>
                        <Image
                            source={{
                                uri: lawyerResp?.data?.imageUrl ?? "https://i.pravatar.cc/150?img=1"
                            }}
                            style={styles.image}
                        >
                        </Image>
                        <View style={{ flexDirection: "row", gap: 5, margin: 10, position: "absolute", top: "5%", left: "10%" }}>
                            <AntDesign name="checkcircle" size={20} color="#0078EC" />
                            <Text style={{ fontWeight: "500", color: "white" }}>Verified</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", gap: 15, marginVertical: 10, flex: 1 }}>
                        {[{
                            label: "Cases",
                            value: lawyerResp?.data?.numberOfCases
                        },
                        {
                            label: "Experience",
                            value: lawyerResp?.data?.experience ?? 1 + "static"
                        },
                        {
                            label: "Rating",
                            value: lawyerResp?.data?.rating
                        }].map(({ label, value }) => <View style={{ gap: 5, justifyContent: "center", alignItems: "center" }}>
                            <View style={{ borderRadius: 100, backgroundColor: "#174AC9", width: 50, aspectRatio: 1, justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ color: "#ffffff", fontWeight: "500" }}>
                                    {value}+
                                </Text>
                            </View>
                            <Text style={{ color: "#2D60DF", fontWeight: "500" }}>
                                {label}
                            </Text>
                        </View>)}
                    </View>

                    <View style={{ marginVertical: 10, gap: 5 }}>
                        <Text style={{ fontSize: 20, fontWeight: "600" }}>
                            About
                        </Text>
                        <Text>
                            {lawyerResp?.data?.description}
                        </Text>
                    </View>
                </>}
        </ScrollView>
    </SafeAreaView>

    // return <SafeAreaView style={{
    //     // flex: 1,
    //     borderWidth: 10,
    //     // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    //     marginVertical: StatusBar.currentHeight,
    // }}>
    //     <Text>
    //         Kunal
    //     </Text>
    // </SafeAreaView>
}

function LawyerSkeleton() {
    return <>
        <View style={{ flexDirection: 'row', gap: 5, width: "100%", marginVertical: 10, height: 30 }}>
            <Skeleton style={{ width: "40%", height: "10", borderRadius: 10 }} />
            <Skeleton style={{ width: "15%", height: "10", borderRadius: 10 }} />
        </View>


        <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between", marginVertical: 10 }}>
            <View style={{ gap: 5 }}>
                <Skeleton style={{ width: 100, height: 20, borderRadius: 10 }} />
                <Skeleton style={{ width: 70, height: 10, borderRadius: 10 }} />
            </View>

            <View style={{ flexDirection: "row", justifyContent: "flex-end", gap: 5, width: "50%" }}>
                {[1, 2, 3].map(() => <Skeleton circle={true} style={{ width: 30 }} />)}
            </View>
        </View>


        <Skeleton style={{ width: "90%", height: 200, margin: 10, borderRadius: 10 }} />
        <View style={{ flexDirection: "row", gap: 15, marginVertical: 10, flex: 1 }}>
            {[1, 2, 3].map(({ label, value }) => <View style={{ gap: 10, justifyContent: "center", alignItems: "center" }}>
                <Skeleton circle={true} style={{ width: 30, height: 50 }} />
                <Skeleton style={{ width: 40, height: 10, borderRadius: 10 }} />

            </View>)}
        </View>

        <View style={{ marginVertical: 10, gap: 10 }}>
            <Skeleton style={{ width: 100, height: 15, borderRadius: 10 }} />
            <Skeleton style={{ width: "100%", height: 200, borderRadius: 10 }} />
        </View>
    </>
}

const styles = StyleSheet.create({
    heading: {
        fontWeight: "600",
        fontSize: 20
    },
    imageContainer: {
        paddingHorizontal: 10,
        // borderWidth:1,
        justifyContent: 'center',
        alignItems: "center"
    },
    image: {
        width: "90%",
        aspectRatio: 1,
        borderRadius: 10
    },
    button: {
        backgroundColor: "#174AC9",
        borderRadius: 64,
        paddingVertical: 10,
        marginVertical: 5,
        width: "30%",
        alignItems: "center",
    },
    buttonLabel: {
        fontSize: 12,
        fontWeight: "600",
        color: "#fff",
    },
})