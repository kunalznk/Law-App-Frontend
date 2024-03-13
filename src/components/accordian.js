// import Collapsible from 'react-native-collapsible';
import { StyleSheet, Text, View, Image } from "react-native";
import Accordion from 'react-native-collapsible/Accordion';
import { useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {
    useNavigation
} from "@react-navigation/native";
import { Pressable } from "react-native";


export default function CustomAccordion( { item  } ) {

    const navigation = useNavigation()

    const [active, setActive] = useState([]);

    return <Accordion
        underlayColor="white"
        activeSections={active}
        sections={[item]}
        renderHeader={(content, index, isActive, sections) => content?.title?.length > 0 ? <View style={styles.container}>
            {/* <Image
            source={{
                uri: "https://i.pravatar.cc/150?img=1"
            }}
            style={styles.image}
        /> */}
            <View style={{...styles.infoContainer, backgroundColor:"#FFF", borderTopWidth: index === 0 ? 0  : 1}}>
                <View style={styles.textContainer}>
                    <Text style={{ ...styles.heading, color: isActive ? "#174AC9" : "#000000" }}>{content?.title}</Text>
                    <Text style={styles.subHeading}>{content?.sections?.length} Subclauses</Text>
                </View>
                <View>
                    <AntDesign 
                    size={20} 
                    name={isActive ? "upcircle" : "downcircle"} 
                    color={isActive ? "#174AC9": "#C8C7CC" }
                    />
                </View>
            </View>
        </View> : <View />}
        renderSectionTitle={(content, index, isActive, sections) => null}
        renderContent={(content, index, isActive, sections) => content?.sections?.length > 0 ? <View
            style={{
                marginLeft: 10,
                marginVertical: 20,
                paddingLeft:10,
                borderLeftWidth:4,
                borderRadius:10,
                borderColor:"#174AC9"
            }}
        >
            {content?.sections?.map((section) => <Pressable style={{ flexDirection: "row", alignItems: "center", gap: 8, paddingVertical: 10, backgroundColor:"#F8F8FA" }}
                onPress={() => navigation.navigate("Section", {
                    id: section?._id
                })}

            >
                <View style={{ height: "100%", paddingTop: 6 }}>
                    <Entypo name="circle" size={14} color="#174AC9" />
                </View>
                <View style={{ height: "100%", width:"90%"}}>
                    <Text style={{ fontSize: 14, color:"#000000" }}>{section?.shortTitle}</Text>
                </View>
            </Pressable>)}

        </View> : <View />}
        onChange={(activeSession) => { setActive(activeSession) }}
        sectionContainerStyle={{
            backgroundColor:"#F8F8FA",
            borderRadius:20,
            marginVertical:5
        }}
    />
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        // gap: 10,
        // marginVertical: 5
    },
    image: {
        width: "25%",
        aspectRatio: 1,
        borderRadius: 10
    },
    infoContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingVertical: 10,
        // marginVertical:5,
        gap: 10,
        borderBottomWidth:1,
        borderColor: "#B3B3B3",
    },
    textContainer: {
        flex:1,
        gap: 5,
        // borderWidth:1
    },
    heading: {
        fontWeight: "700",
        fontSize: 18
    },
    subHeading: {
        color: "#B3B3B3",
        fontWeight: "400",
    }
})