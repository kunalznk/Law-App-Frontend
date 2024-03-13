import { useEffect, useState } from "react"
import { Pressable, Text, View } from "react-native"

export const CountDown = ({ remainingSeconds }) => {

    const [remSeconds, SetRemSeconds] = useState(remainingSeconds)
    // Math.floor((expiresAt - new Date())/1000)

    useEffect(() => {
        const timeExpiring = setInterval(() => {
            SetRemSeconds((prev) => prev - 1);
        }, 1000)

        return () => clearInterval(timeExpiring)
    }, [])


    return <View
        style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 5,
            // marginVertical: 10,
        }}
    >
        <Pressable
            style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                // marginVertical: 10,
            }}
        >
            <Text style={{ fontWeight: "600", color: remSeconds > 0 ? "#B3B3B3" : "#000" }}>Resend code</Text>
        </Pressable>
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
               
            }}
        >
            {Math.floor(remSeconds % 60) >= 0 && <Text style={{
                fontWeight: "600",
                 color: remSeconds < 0 ? "#B3B3B3" : "#000"
             }}>
                {/* {`${remSeconds / 60 > 0 ? Math.floor(remSeconds / 60) + ' : ' : ""} ${remSeconds % 60 > 0 ? Math.floor(remSeconds % 60) : ""}  ${Math.floor(remSeconds / 60)  ?  'min' : "second"} left`} */}
                {`${Math.floor(remSeconds / 60)} : ${Math.floor(remSeconds % 60)} ${Math.floor(remSeconds / 60)  ?  'min' : "second"} left`}
                </Text>}
        </View>

    </View>
}