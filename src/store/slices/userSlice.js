import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "../../utils/customBaseQuery";

export const UserAPI = createApi({
    reducerPath: "useAPI",
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({
        signUp: builder.query({
            query: (registerForm) => ({
                url: "user/signUp",
                method: "POST",
                body: registerForm
            }),
        }),
        signIn: builder.query({
            query: (loginForm) => ({
                url: "user/signin",
                method: "POST",
                body: loginForm
            }),
        }),
        verifyEmail: builder.query({
            query: (body) => ({
                url: "user/verify",
                method: "POST",
                body
            }),
        }),
        resendOtp: builder.query({
            query: (loginForm) => ({
                url: "user/verify/resend",
                method: "POST",
                body: loginForm
            }),
        }),
        getUser: builder.query({
            query: () => ({
                url: "user/currentUser",
                method: "GET",
            }),
        }),
    }),
});

export const { 
    useLazySignUpQuery,
    useSignUpQuery,
    useLazySignInQuery,
    useLazyVerifyEmailQuery,
    useLazyResendOtpQuery,
    useLazyGetUserQuery
}  = UserAPI;

export default UserAPI;