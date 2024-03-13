import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, Text, View } from "react-native";
import {
    NavigationContainer,
    useNavigation
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import GettingStarted from "../screens/gettinStarted";
import VerifyScreen from "../screens/verifyNumber";
import Filters from "../components/filters";
import HomeScreen from "../screens/homeScree";
import Skeleton from "../components/skeleton";
import Tabs from "../components/tabs";
import ArticleScreen from "../screens/articleScreen";
import ChaptersScreen from "../screens/chaptersScreen";
import SectionScreen from "../screens/sectionScreen";
import LawyerCard from "../components/lawyerCard";
import LawyerScreen from "../screens/lawyerScreen";
import Select from "../components/select";
import RegisterScreen from "../screens/registerScreen";
import LoginScreen from "../screens/loginScreen";
import LawyersScreen from "../screens/lawyersScreen";
import SearchScreen from "../screens/searchScreen";
import ArticlesScreen from "../screens/articlesScreen";




const Stack = createStackNavigator()

export default function Navigation({ colorScheme }) {

    const { Screen, Navigator } = Stack;

    return (
        <NavigationContainer
            // linking={LinkingConfiguration}
            theme={{
                colors: {
                    background: "white"
                }
            }}
        >
            <SafeAreaProvider style={styles.container}>
                <Navigator initialRouteName="Home" >
                    <Screen name="Started" component={GettingStarted} />
                    <Screen name="Register" component={RegisterScreen} />
                    <Screen name="Verify" component={VerifyScreen} />
                    <Screen name="Login" component={LoginScreen} />
                    <Screen name="Home" component={HomeScreen} />
                    <Screen name="Lawyers" component={LawyersScreen} />
                    <Screen name="Lawyer" component={LawyerScreen} />
                    <Screen name="Articles" component={ArticlesScreen} />
                    <Screen name="Article" component={ArticleScreen} />
                    <Screen name="Chapters" component={ChaptersScreen} />
                    <Screen name="Section" component={SectionScreen} />
                    <Screen name="Filters" component={Filters} />
                </Navigator>
            </SafeAreaProvider>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },
});