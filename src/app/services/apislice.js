import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import CookieServies from '../../../services/CookieServies';

export const apiSlice = createApi({
    reducerPath: "api",
    tagTypes: ["Products"],
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_URL }),
    endpoints: (builder) => ({
        getDashProducts: builder.query({
            query: arg => {
                const { page } = arg;
                return {
                    url: `api/products?populate=thumbnail,category&pagination[page]=${page}&pagination[pageSize]=7`
                }
            },

            providesTags: (result) =>
                result
                    ? [
                        ...result.data.map(({ id }) => ({ type: 'products', id })),
                        { type: 'products', id: 'LIST' },
                    ]
                    : [{ type: 'products', id: 'LIST' }],
        }),
        delteDashProducr: builder.mutation({
            query(id) {
                return {
                    url: `/api/products/${id}`,
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${CookieServies.get("jwt")}`
                    }
                }
            },
            invalidatesTags: [{ type: 'products', id: 'LIST' }],

        })
    })
})

export const { useGetDashProductsQuery, useDelteDashProducrMutation } = apiSlice