import { StyleSheet, Text, View, TextInput, Pressable, FlatList, Alert, Modal } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { useState } from "react";

// const Select = ({ data, onChange, defaultSelected = 0 }) => {

//     const [isOpen, setIsOpen] = useState(false);
//     const [selectedValue, setSelectedValue] = useState(defaultSelected)
//     const [list, _] = useState([
//         {
//             label: "Experience Level",
//             value: undefined
//         },
//         {
//             label: "Intern",
//             value: 0
//         },
//         {
//             label: "Associate",
//             value: 3
//         },
//         {
//             label: "Mid-Level",
//             value: 5
//         },
//         {
//             label: "Lead",
//             value: 10
//         }
//     ])

//     return <>
//         <Pressable style={{
//             flexDirection: "row",
//             gap: 5,
//             alignItems: "center",
//             paddingHorizontal: 10,
//             paddingVertical: 5,
//             borderRadius: 20,
//             borderWidth: 0.2,
//             backgroundColor: selectedValue > 0 ? "#174AC9" : "#FFFFFF",
//             position: "relative",
//         }}
//             onPress={() => { setIsOpen(!isOpen) }}>
//             <Text style={
//                 {
//                     ...styles.label,
//                     color: selectedValue > 0 ? "#FFFFFF" : "#C8C7CC"

//                 }}>
//                 {list[selectedValue].label}
//             </Text>
//             <Entypo name={isOpen ? "chevron-up" : "chevron-down"} size={18} color="#C8C7CC" />
//         </Pressable>
//         {isOpen && <View style={{
//             flex: 1,
//             justifyContent: "center",
//             alignItems: "center",
//             alignContent: "center",
//         }}>
//             <FlatList
//                 data={list}
//                 renderItem={({ item, index }) => <Pressable
//                     style={{
//                         flexDirection: "row",
//                         gap: 5,
//                         alignItems: "center",
//                         marginVertical: 2,
//                         paddingHorizontal: 10,
//                         paddingVertical: 5,
//                         borderRadius: 20,
//                         borderWidth: 0.2,
//                         borderColor: "#C8C7CC",
//                         backgroundColor: (selectedValue === index && selectedValue !== 0) ? "#174AC9" : "#FFFFFF",
//                         borderRadius: 64
//                     }}
//                     onPress={() => {
//                         onChange({ item, index });
//                         setSelectedValue(index)
//                         setIsOpen(!isOpen);
//                     }}
//                 >
//                     <Text style={{
//                         ...styles.label,
//                         color: (selectedValue === index && selectedValue !== 0) ? "#FFFFFF" : "#174AC9"

//                     }}>
//                         {item.label}
//                     </Text>
//                 </Pressable>}
//                 style={{
//                     // borderWidth: 1,
//                     borderRadius: 5,
//                     // paddingHorizontal: 10,
//                     paddingVertical: 5,
//                     // borderWidth:2,
//                 }}

//             />
//         </View>
//         }
//     </>
// };

// export default Select;

// const styles = StyleSheet.create({
//     label: {
//         color: "#C8C7CC",
//         fontWeight: "600"
//     }
//     // filter: {
//     //     backgroundColor: "#174AC9",
//     //     borderRadius: 100,
//     //     paddingVertical: 10,
//     //     marginVertical: 10,
//     //     marginHorizontal: 5,
//     //     alignItems: "center",
//     //     width: "auto",
//     //     borderWidth:1
//     // },
//     // filterLabel: {
//     //     fontSize: 10,
//     //     fontWeight: "500",
//     //     color: "#fff",
//     //     marginHorizontal: 10,
//     //     borderWidth:1,
//     //     height:20
//     // },
// })

import { Dropdown } from 'react-native-element-dropdown';
import { AntDesign } from '@expo/vector-icons';

const data = [
    { label: 'Experience Level', value: null },
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
];

export default function NativeSelect({ data, selectedValue = null, onChangeHandler }) {

    const [value, setValue] = useState(selectedValue);
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                    Dropdown label
                </Text>
            );
        }
        return null;
    };


    return <>
        <View style={styles.container}>
            {/* {renderLabel()} */}
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }, value && { backgroundColor: "#174AC9" }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                // inputSearchStyle={styles.inputSearchStyle}
                // iconStyle={styles.iconStyle}
                data={data}
                // search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={data[0].label}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setValue(item.value);
                    setIsFocus(false);
                    console.log(item, "select")
                    onChangeHandler({
                        field: data[0].field , 
                        value: item?.value
                    } )
                }}
                renderRightIcon={() => (
                    <AntDesign
                        style={styles.icon}
                        color={value ? 'white' : '#C8C7CC'}
                        name={value ? "close" : "down"}
                        size={15}
                        onPress={() => {
                            if(value) {
                                setValue(null)
                            }
                        }}
                    />
                )}
            />
        </View>
    </>
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        // padding: 16,
        borderRadius: 20,
        // borderWidth: 0.2,
        borderColor: "#C8C7CC",
    },
    dropdown: {
        // height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 20,
        paddingHorizontal: 15,

    },
    icon: {
        marginHorizontal: 5
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        // fontSize: 16,
        color: "#C8C7CC",
        fontWeight: "600"
    },
    selectedTextStyle: {
        // fontSize: 16,
        color: "#FFFFFF",
        fontWeight: "600"

    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        borderWidth: 1
    },
});