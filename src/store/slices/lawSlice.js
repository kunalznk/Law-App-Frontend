import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "../../utils/customBaseQuery";

export const LawAPI = createApi({
    reducerPath: "lawAPI",
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({
        // getLawyers: builder.query({
        //     query: (params) => ({
        //         url: "law/filters",
        //         method: "GET",
        //         params
        //     }),
        // }),
        getLaws: builder.query({
            query: (params) => {
                return {
                    url: "law/laws",
                    method: "GET",
                    params
                }
            },
        }),
        getLaw: builder.query({
            query: (id) => {
                return {
                    url: "law/laws/" + id,
                    method: "GET"
                }
            },
        }),
        getChapterByLaw: builder.query({
            query: (id) => {
                return {
                    url: "law/laws/" + id + "/chapter",
                    method: "GET"
                }
            },
        }),
        // /laws/section/:sectionId
        getSectionBySectionId: builder.query({
            query: (id) => {
                return {
                    url: "law/laws/chapter/section/" + id,
                    method: "GET"
                }
            },
        })
    }),
});

export const {
    useGetLawQuery,
    useGetLawsQuery,
    useLazyGetLawQuery,
    useLazyGetChapterByLawQuery,
    useGetChapterByLawQuery,
    useGetSectionBySectionIdQuery,
    useLazyGetSectionBySectionIdQuery
} = LawAPI;

export default LawAPI;