
import { Text, View, Image, StyleSheet, Pressable } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Rating from "./rating";
import {
    useNavigation
} from "@react-navigation/native";


export default TopLawyer = ({ item }) => {

    const navigation = useNavigation();

    return <Pressable style={styles.container}
    onPress={() => navigation.navigate("Lawyer", { lawyerId: item?._id})}
    >
        <Image
            source={{
                uri: item?.imageUrl ?? "https://i.pravatar.cc/150?img=1"
            }}
            style={styles.image}
        />
        <View style={styles.infoContainer}>
            <View style={styles.textContainer}>
                <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
                    <Text style={styles.heading}>{item?.name}</Text>
                    <AntDesign name="checkcircle" size={12} color="green" />
                </View>
                <View style={{ flexDirection: "row", gap: 5, justifyContent:"center" }}>
                    <Entypo name="location-pin" size={18} color="#C8C7CC" />
                    <Text style={styles.subHeading}>Mumbai</Text>
                </View>
                <View style={{justifyContent:"center", flexDirection:"row"}}>
                <Rating rating={4.5} />
                </View>
            </View>
        </View>
    </Pressable>
}

const styles = StyleSheet.create({
    container: {
        gap: 5,
        borderBottomColor: "#C8C7CC",
        borderBottomWidth: 1,
        justifyContent:"center",
        alignItems:"center",
        paddingVertical:10,
        marginHorizontal:10
    },
    image: {
        width: 75,
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
        gap: 5
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