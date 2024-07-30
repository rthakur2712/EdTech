import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
};

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    //     removeUser: (state) => {
    //         state.user = null;
    // },
    }
});

export const { setUser } = profileSlice.actions;
export default profileSlice.reducer;