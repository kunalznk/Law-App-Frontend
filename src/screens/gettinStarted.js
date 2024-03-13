import { forwardRef, useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
  Image,
  SafeAreaView,
  StatusBar,
  Pressable
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Button } from "react-native-elements";

export default function GettingStarted( { navigation } ) {
  const { width, height } = useWindowDimensions();

  const [active, setActive] = useState(0);
  const carouselRef = useRef(null);

  const [banners, _] = useState([
    {
      text: "Find all types of legal services in one app, with an easy process and multiple benefits.",
      img: require("../../assets/getting-started/first.png"),
      buttonLabel: "Get Started",
    },
    {
      text: "Enter the name of your city and the type of consultant you're looking for. and our AI boot will  select the best candidate for your task.",
      img: require("../../assets/getting-started/second.png"),
      buttonLabel: "Next",
    },
    {
      text: "Choose the best verified lawyer profiles in your area based on qualifications, experience, and reviews.",
      img: require("../../assets/getting-started/third.png"),
      buttonLabel: "Next",
    },
  ]);

  const Banner = forwardRef(({ item, index }, ref) => {
    return (
      <View style={styles.container}>
        <View style={styles.bannerImage}>
          <Image
            source={item.img}
            style={{
              width,
              aspectRatio: 1,
              flex: 1,
            }}
          />
        </View>
        <View>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </View>
    );
  });

  return (
    <View style={{flex:1, paddingHorizontal:10}}>
      <Carousel
        ref={carouselRef}
        data={banners}
        renderItem={(props) => <Banner {...props} ref={carouselRef} />}
        sliderWidth={width}
        sliderHeight={height}
        itemWidth={width}
        itemHeight={height}
        onSnapToItem={(index) => setActive(index)}
      />
      <View style={{flex:2/4}}> 
      <View style={styles.pagination}>
        <Pagination
          carouselRef={carouselRef}
          dotsLength={banners.length}
          activeDotIndex={active}
          dotStyle={{
            backgroundColor: "#59ADFD",
            borderRadius: 25,
            height: 5,
            width: 48,
          }}
          inactiveDotStyle={{
            backgroundColor: "#D9D9D9",
            borderRadius: 25,
            height: 5,
            width: 48,
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          dotContainerStyle={{
            margin: 0,
            padding: 0,
          }}
        />
      </View>
      <Pressable
        style={styles.button}
        onPress={() => {
          if(active < 2) {
            carouselRef?.current?.snapToItem(active + 1);
          } else {
            navigation.navigate("Login")
          }
        }}
      >
        <Text style={styles.buttonLabel}>{banners[active].buttonLabel}</Text>
      </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 20,
  },
  bannerImage: {
    width: "100%",
    aspectRatio: 1,
  },
  text: {
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
  },
  pagination: {
    // borderWidth: 5,
    // borderColor: "red",
  },
  button: {
    backgroundColor: "#174AC9",
    borderRadius: 64,
    paddingVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },
});

// <View style={styles.banner}>
//             <View style={{
//                 flex: 1,
//                 justifyContent: "center",
//                 borderW
//             }}>
//                 <Image
//                     style={{
//                         width: "auto",
//                         aspectRatio: 1
//                     }}
//                     source={{
//                         uri: item.img
//                     }}
//                 />
//             </View>
//             <View style={{
//                 flex: 1,
//                 justifyContent: "space-evenly",
//                 alignContent: "center",
//                 alignItems: "center",
//                 // borderWidth: 10
//             }}>
//                 <Pagination
//                     dotsLength={banners.length}
//                     activeDotIndex={active}
//                     containerStyle={{
//                         // borderWidth: 10,
//                         // borderColor: "green",
//                         width: "100%"
//                     }}
//                     dotStyle={{
//                         backgroundColor: '#59ADFD',
//                         borderRadius: 25,
//                         height: 5,
//                         width: 48
//                     }}
//                     inactiveDotStyle={{
//                         backgroundColor: "#D9D9D9",
//                         borderRadius: 25,
//                         height: 5,
//                         width: 48
//                     }}
//                     inactiveDotOpacity={0.4}
//                     inactiveDotScale={0.6}
//                 />
//                 <Text style={{ fontSize: 16 }}>
//                     {item.text}
//                 </Text>
//                 <View
//                     style={{
//                         backgroundColor: "#174AC9",
//                         borderRadius: 64,
//                         paddingVertical: 10,
//                         width: "100%",
//                         alignItems: "center"
//                     }}
//                 >
//                     <Text
//                         style={{
//                             fontSize: 12,
//                             fontWeight: "600",
//                             color: "#fff"
//                         }}
//                     >
//                         Get Started
//                     </Text>
//                 </View>
//             </View>
//         </View>
