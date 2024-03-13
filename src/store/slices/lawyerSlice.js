import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "../../utils/customBaseQuery";

export const LawyerAPI = createApi({
    reducerPath: "lawyerAPI",
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({
        getLawyers: builder.query({
            query: (params) => ({
                url: "lawyer/filters",
                method: "GET",
                params
            }),
        }),
        getLawyer: builder.query({
            query: (id) => {
                console.log(id, "id for single");
             return {
                url: "lawyer/single/"+id,
                method: "GET"
            }},
        })
    }),
});

export const { 
    useGetLawyersQuery,
    useLazyGetLawyersQuery,
    useGetLawyerQuery,
    useLazyGetLawyerQuery
}  = LawyerAPI;

export default LawyerAPI;