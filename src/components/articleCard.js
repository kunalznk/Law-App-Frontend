import { Text, View, Image, StyleSheet } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import {
    useNavigation
} from "@react-navigation/native";
import { Pressable } from "react-native";

export default CategoryCard = ( { item } ) => {

    const navigation = useNavigation()

    return <Pressable style={styles.container}
    
    o   nPress={() => navigation.navigate("Article", {
        id: item?._id
    })}

    >
        <Image
            source={{
                uri: "https://i.pravatar.cc/150?img=1"
            }}
            style={styles.image}
        />
        <View style={styles.infoContainer}>
            <View style={styles.textContainer}>
                <Text style={styles.heading}>{item?.title}</Text>
                <Text style={styles.subHeading}>{item?.title?.length}+ Sections</Text>
            </View>
            <View>
                <AntDesign name="right" size={14} color="#B3B3B3" />
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
        alignItems:"center",
        gap:10
    },
    textContainer: {
        gap:2
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