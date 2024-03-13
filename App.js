import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import GettingStarted from "./src/screens/gettinStarted";
import LoginScreen from "./src/screens/registerScreen";
import RegisterScreen from "./src/screens/loginScreen";
import VerifyScreen from "./src/screens/verifyNumber";
import Filters from "./src/components/filters";
import HomeScreen from "./src/screens/homeScree";
import Skeleton from "./src/components/skeleton";
import Tabs from "./src/components/tabs";
import CategoriesScreen from "./src/screens/lawyersScreen";
import SearchScreen from "./src/screens/articleScreen";
import ArticleScreen from "./src/screens/articleScreen";
import ChaptersScreen from "./src/screens/chaptersScreen";
import SectionScreen from "./src/screens/sectionScreen";
import LawyerCard from "./src/components/lawyerCard";
import LawyerScreen from "./src/screens/lawyerScreen";
import Navigation from "./src/routes";
import store from "./src/store";

export default function App() {
  return (
    <Provider store={store}>
    <SafeAreaProvider style={styles.container}>
      <Navigation />
    </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
