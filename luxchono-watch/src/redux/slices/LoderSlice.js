import { createSlice } from "@reduxjs/toolkit";

export const loderSlice = createSlice({
    name: "loder",
    initialState: {
        isLoading: null,
    },
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setLoading } = loderSlice.actions;
export default loderSlice.reducer;
