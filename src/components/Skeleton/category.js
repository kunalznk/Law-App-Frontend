import { Text, View, Image, StyleSheet } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import {
    useNavigation
} from "@react-navigation/native";
import { Pressable } from "react-native";
import Skeleton from "../skeleton";

export default CategoryCardSkeleton = () => {

    const navigation = useNavigation()

    return <Pressable style={styles.container}
    
    onPress={() => navigation.navigate("Articles")}

    >
        <Skeleton
            style={styles.image}
        />
        <View style={styles.infoContainer}>
            <View style={styles.textContainer}>
                <Skeleton style={{...styles.heading, height:16, borderRadius:5}}></Skeleton>
                <Skeleton style={{...styles.heading, height:10, width:75, borderRadius:5}}></Skeleton>
            </View>
            <View>
            <Skeleton style={{...styles.heading, height:16, width:16,borderRadius:100}}></Skeleton>
            </View>
        </View>
    </Pressable>
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap:10,
        marginVertical:5
    },
    image: {
        width: "25%",
        aspectRatio: 1,
        borderRadius: 10
    },
    infoContainer: {
        flex:1,
        flexDirection: "row",
        justifyContent:"space-between",
        alignItems:"start",
        gap:10,
        marginTop:15
    },
    textContainer: {
        gap:10
    },
    heading: {
        fontWeight:"700",
        fontSize:16
    },
    subHeading: {
        color:"#B3B3B3",
        fontWeight:"400",
    }
})