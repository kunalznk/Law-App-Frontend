import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://192.168.0.103:3007/api",
  prepareHeaders(headers, { getState }) {
    const token = getState()?.appSlice?.token;
    headers.set("Authorization", token)
    return headers;
  },
});

const customBaseQuery = async (args, api, extraOptions) => {
  const { dispatch } = api;
  const getState = api.getState;

  try {

    const result = await baseQuery(args, api, extraOptions);
    return result;

  } catch (error) {

    // dispatch(appLoaderActions.setIsLoading(false));

    console.log(error, "error")
    return { error: { status: 500, data: error } };
  }
};

export default customBaseQuery;
