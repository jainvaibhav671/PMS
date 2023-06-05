import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ListType } from '@/app/interfaces/Lists';

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/lists"
    }),
    endpoints(builder) {
        return {
            fetchLists: builder.query<ListType[], number|void>({
                query(limit=10) {
                    return "/";
                }
            })
        }
    }
});

export const { useFetchListsQuery, useLazyFetchListsQuery }  = apiSlice;