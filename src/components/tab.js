import { Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native";

export default Tab = ({ label, active, ...props }) => {
    return <Pressable style={{ gap: 10 }} { ...props }>
        <Text style={{ ...styles.subheading, color: "#000" }}>
            {label}
        </Text>
        <View style={{...styles.highlight, backgroundColor : !active ? "#C3C5C7":  "#59ADFD"}} />
    </Pressable>
}

const styles = StyleSheet.create({
    subheading: {
        fontSize: 18,
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
    }
});