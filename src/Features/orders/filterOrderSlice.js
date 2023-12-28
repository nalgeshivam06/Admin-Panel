import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    search: "",
    fromDate: null,
    toDate: new Date().toISOString().split('T')[0]
}

const filterOrderSlice = createSlice({
    name: "filterOrders",
    initialState,
    reducers: {
        searchContent(state, action) {
            state.search = action.payload
        },
        fromDate(state, action) {
            state.fromDate = action.payload
        },
        toDate(state, action) {
            state.toDate = action.payload
        }
    }
})

export const selectSearch = (state) => state.filterOrders.search;
export const selectFromDate = (state) => state.filterOrders.fromDate;
export const selectToDate = (state) => state.filterOrders.toDate;

export const { searchContent } = filterOrderSlice.actions;
export const { fromDate } = filterOrderSlice.actions;
export const { toDate } = filterOrderSlice.actions;

export default filterOrderSlice.reducer;