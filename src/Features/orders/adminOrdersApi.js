import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

// get orders with filter (fromDate-toDate & search query)

export const adminOrdersApi = createApi({
    reducerPath: 'adminOrdersApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    
    // 💥 Searching is working figure out how to do date filtering (create another api for date)💥 
    endpoints:(builder) => ({
        getOrdersWithFilter : builder.query({
          query: (params) => {
            const queryParams = {
              search: params.search,
            };
    
            if (params.fromDate !== null) {
              queryParams.fromDate = params.fromDate;
            }
    
            if (params.toDate !== null) {
              queryParams.toDate = params.toDate;
            }
    
            return {
              url: '/orders',
              params: queryParams,
            };
          },
        })
    })
})
  
  export const { useGetOrdersWithFilterQuery } = adminOrdersApi;
