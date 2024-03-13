import { Image, StyleSheet, View, useWindowDimensions } from "react-native";
import { Text } from "react-native-elements";
import Skeleton from "./skeleton";

export default function Card ( { item , index}) {

    const { width }  = useWindowDimensions()

    return <Skeleton style={{ width: width/2, aspectRatio:9/16, padding:10, marginHorizontal:10, borderRadius:15}}>
        <Image 
        source={{
            uri:`https://i.pravatar.cc/150?img=${10*index}`
        }}
        style={{...styles.container, width: width/2, aspectRatio:9/16, borderRadius:10}}
        />
    </Skeleton>
        
}

const styles = StyleSheet.create({
    container: {
        flex:1
    }
})