import { Text, View, Image, StyleSheet } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Skeleton from "../skeleton";


export default SkeletonCard = () => {
    return <View style={styles.container}>
        <Skeleton
            style={styles.image}
        />
        <View style={styles.infoContainer}>
            <View style={styles.textContainer}>
                <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
                    <Skeleton style={{ ...styles.heading, height: 16, width: 150, borderRadius: 5 }}></Skeleton>
                    <Skeleton style={{ ...styles.heading, height: 16, width: 16, borderRadius: 100 }}></Skeleton>
                </View>
                <View style={{ flexDirection: "row", gap: 5 }}>
                    <Skeleton style={{ ...styles.heading, height: 10, width: 75,borderRadius: 5 }}></Skeleton>
                </View>
                <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
                    <Skeleton style={{ ...styles.heading, height: 12, borderRadius: 5 }}></Skeleton>
                    <Skeleton style={{ ...styles.heading, height: 12, width: 12, borderRadius: 100 }}></Skeleton>
                    <Skeleton style={{ ...styles.heading, height: 12, width: 12, borderRadius: 100 }}></Skeleton>

                </View>
            </View>
            {/* <View>
                <AntDesign name="right" size={14} color="#B3B3B3" />
            </View> */}
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        // borderWidth: 1,
        gap: 15,
        marginVertical: 5,
        // borderRadius:25,
        borderBottomColor: "#C8C7CC",
        borderBottomWidth: 1,
        paddingBottom: 10

    },
    image: {
        width: "25%",
        aspectRatio: 1,
        borderRadius: 100
    },
    infoContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 15,

        // borderWidth: 1
    },
    textContainer: {
        gap: 10
    },
    heading: {
        fontWeight: "700",
        fontSize: 16
    },
    subHeading: {
        color: "#B3B3B3",
        fontWeight: "400",
    }
})