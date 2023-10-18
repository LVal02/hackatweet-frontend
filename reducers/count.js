import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

export const countSlice = createSlice({
    name: 'count',
    initialState,
    reducers: {
        addCount: (state, action) => {
                state.value += 1
            },
    },
});

export const { addCount } = countSlice.actions;
export default countSlice.reducer;