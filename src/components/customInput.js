import { Text, View, TextInput, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';



export default function CustomInput({ value, error, handleChange, placeholder , ...rest }) {
    return <View>
        <View style={{
            ...styles.inputContainer,
            backgroundColor: value ? "white" : "#F0EFF5",
            borderWidth: (value || error) ? 1 : 0,
            borderColor: (value && error) ? "red" : "#86C3FF"
        }}>
            <MaterialIcons name="date-range" size={18} color="#C8C7CC" />
            <TextInput
                placeholder={placeholder}
                style={styles.input}
                placeholderTextColor="#C8C7CC"
                onChangeText={(text) => handleChange(text, placeholder?.toLowerCase())}
                value={value}
                {...rest}
            />
            {(!error && value.length > 0) ? <AntDesign name="checkcircle" size={18} color="green" /> :
                (error && value.length > 0) && <MaterialIcons name="error-outline" size={18} color="red" />
            }
        </View>
        {error && <Text style={{ color: "red", marginVertical: 10, marginLeft:5 }}>
            {error}
        </Text>}
    </View>
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F0EFF5",
        paddingHorizontal: 10,
        borderRadius: 10,
        gap: 5
    },
    input: {
        height: 40,
        // backgroundColor: "#F0EFF5",
        paddingHorizontal: 5,
        borderRadius: 10,
        color: "#000",
        marginVertical: 4,
        width: "80%"
    }
});