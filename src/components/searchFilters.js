import { FlatList, Pressable, Text, View, StyleSheet } from "react-native"
import Select from "./select";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { queryArgsSliceActions } from "../store/slices/queryArgsSlice";

const SearchFilters = ( {  }) => {


    const dispatch = useDispatch();
    const lawyersFilters = useSelector((state) => state?.queryArgsSlice?.lawyersFilters);
    const [filters, setFilters] = useState( [
        [{
            label: "Experience Level",
            value: null,
            field: "experience"
        },
        {
            label: "Intern",
            value: 1
        },
        {
            label: "Associate",
            value: 3
        },
        {
            label: "Mid-Level",
            value: 5
        },
        {
            label: "Lead",
            value: 10
        }]
        ,
        [{
            label: "Rating",
            value: null,
            field: "rating"

        },
        {
            label: "1+",
            value: 1
        },
        {
            label: "2+",
            value: 2
        },
        {
            label: "3+",
            value: 3
        },
        {
            label: "4+",
            value: 4
        },
        {
            label: "Top Rated",
            value: 5
        }
        ]
        ,
        [{
            label: "Type Of Lawyers",
            value: null,
            field: "typeOfLawyers"

        },
        {
            label: "Family",
            value: "Family Law"
        },
        {
            label: "Criminal",
            value: "Criminal Law"
        }
        ]
        ,
        [{
            label: "Location",
            value: null,
            field: "location"

        },
        {
            label: "India",
            value: "India"
        }
        ]
    ]
    )

    const onFiltersChange = ( { field, value }) => {
        console.log(field, value, "onFiltersChange");
        console.log(lawyersFilters);

        // return;
        dispatch(queryArgsSliceActions.setLawyersFilters({
            ...lawyersFilters,
            [field]: value
        }))
    }

    return <View>
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={filters}
            renderItem={({ item }) => {
            const selectedValue = lawyersFilters ? lawyersFilters[item[0].field] : null;
            return <View style={{ padding: 5 }}>
                <Select
                    data={item}
                    onChangeHandler={onFiltersChange}
                    selectedValue={selectedValue}
                />
            </View>}
            }
        />
    </View>
}

export default SearchFilters;

const styles = StyleSheet.create({
    filter: {
        backgroundColor: "#174AC9",
        borderRadius: 100,
        paddingVertical: 10,
        marginVertical: 10,
        marginHorizontal: 5,
        alignItems: "center",
        width: "auto",
        borderWidth: 1
    },
    filterLabel: {
        fontSize: 10,
        fontWeight: "500",
        color: "#fff",
        marginHorizontal: 10,
        borderWidth: 1,
        height: 20
    },
})


/*

[
                    [{
                    label: "Experience Level",
                    value: null
                },
                {
                    label: "Intern",
                    value: 1
                },
                {
                    label: "Associate",
                    value: 3
                },
                {
                    label: "Mid-Level",
                    value: 5
                },
                {
                    label: "Lead",
                    value: 10
                }]
                , 
                [{
                    label: "Rating",
                    value: null
                },
                {
                    label: "1+",
                    value: 1
                },
                {
                    label: "2+",
                    value: 2
                },
                {
                    label: "3+",
                    value: 3
                },
                {
                    label: "4+",
                    value: 4
                },
                {
                    label: "Top Rated",
                    value: 5
                }
            ]
                , 
                [{
                    label: "Type Of Lawyers",
                    value: null
                },
                {
                    label: "Family",
                    value: "Family Law"
                },
                {
                    label: "Criminal",
                    value: "Criminal Law"
                }
            ]
                , 
                [{
                    label: "Location",
                    value: null
                },
                {
                    label: "India",
                    value: "India"
                }
                ]
           
]
*/