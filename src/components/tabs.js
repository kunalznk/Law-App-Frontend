import * as React from 'react';
import { View, useWindowDimensions, Text, SafeAreaView, StyleSheet, Platform, StatusBar } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Tab from './tab';

const FirstRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
);

const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

const renderScene = SceneMap({
    search: FirstRoute,
    recent: SecondRoute,
});



export default function Tabs() {

    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'search', title: 'Search' },
        { key: 'recent', title: 'Recent' },
    ]);



    return (
        <SafeAreaView
            style={styles.container}
        >
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width, height: layout.height }}
                renderTabBar={({ navigationState, ...rest }) => {
                    return <View style={{
                        flexDirection:"row", 
                        alignItems: "center",
                        gap: 5,
                        marginVertical: 10,
                        }}>
                        {navigationState?.routes?.map(({ title }, index ) => <Tab
                            label={title}
                            onPress={() => setIndex(index)}
                        />)}
                    </View>
                }}
            />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        borderWidth: 5,
        borderColor: "red"
    }
})