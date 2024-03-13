import { View, Text, TextInput, Pressable, StyleSheet } from "react-native"
import { Entypo } from "@expo/vector-icons"
import SearchFilters from "./searchFilters";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { queryArgsSliceActions } from "../store/slices/queryArgsSlice";
import { useDebouncedCallback } from 'use-debounce';

const SearchBar = () => {


    const dispatch = useDispatch();
    const [query, setQuery] = useState(useSelector((state) => state?.queryArgsSlice?.lawyersFilters?.query) ?? query);
    const lawyersFilters = useSelector((state) => state?.queryArgsSlice?.lawyersFilters);

    const debounced = useDebouncedCallback(
        // function
        (value) => {
            dispatch(queryArgsSliceActions.setLawyersFilters({
                ...lawyersFilters,
                query: value,
            }));
        },
        // delay in ms
        2000
    );


    return <>
        <View style={styles.searchContainer}>
            <View style={styles.inputContainer}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                    <Entypo name="magnifying-glass" size={18} color="#C8C7CC" />
                    <TextInput
                        placeholder="Search"
                        style={styles.input}
                        placeholderTextColor="#C8C7CC"
                        value={query}
                        onChangeText={(text) => {
                            setQuery(text)
                            debounced(text)
                        }}
                    />
                </View>
                {query && <Pressable onPress={() => {
                    setQuery()
                    debounced()
                }}>
                    <Entypo name="cross" size={18} color="#C8C7CC" />
                </Pressable>}

            </View>
            <View>
                <Text>Cancel</Text>
            </View>
        </View>
        {/* <SearchFilters filters={filters} setFilters={setFilters}/> */}
    </>
}

export default SearchBar;

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        // backgroundColor: "#F0EFF5",
        paddingHorizontal: 5,
        borderRadius: 10,
        marginVertical: 10,
        // marginHorizontal:5,
        // borderWidth:1,
        gap: 5
    },
    input: {
        height: 35,
        color: "#000",
        fontSize: 16,
        fontWeight: "300",
        width: "80%"
        // marginVertical: 4,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#F0EFF5",
        paddingHorizontal: 5,
        borderRadius: 10,
        // gap: 5,
        flex: 1,

    },
    filter: {
        backgroundColor: "#174AC9",
        borderRadius: 100,
        paddingVertical: 10,
        marginVertical: 10,
        marginHorizontal: 5,
        alignItems: "center",
        width: "auto"
    },
    filterLabel: {
        fontSize: 10,
        fontWeight: "500",
        color: "#fff",
        marginHorizontal: 10
    },
});