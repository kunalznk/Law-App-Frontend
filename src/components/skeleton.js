import { useEffect, useRef, useState } from "react"
import { Animated, Text, View } from "react-native"


export default function Skeleton( { style, circle, dark }) {

    const opacity = useRef(new Animated.Value(0, 3));

    useEffect(() => {

        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity.current, {
                    toValue: 1,
                    useNativeDriver: true,
                    duration: 500
                }),
                Animated.timing(opacity.current, {
                    toValue: 0.3,
                    useNativeDriver: true,
                    duration: 500
                })
            ])
        ).start()


    }, [opacity])

    return <Animated.View style={{
        opacity: opacity.current,
        height: 100, 
        width: 100, 
        aspectRatio: circle ? 1 : undefined,
        backgroundColor: dark ? "#9CA3AF" : "#D1D5DB",
        borderRadius: circle ? 100 : 0,
        ...style
    }} />

}