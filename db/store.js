const { createSlice, configureStore } = require("@reduxjs/toolkit")

const initialState = {
    plan: {},
    client:{},
}

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        setPlan: (state, action) => {
            state.plan = action.payload;
        },
        setClient: (state, action) => {
            state.client = action.payload;
        },
        removePlan: (state) => {
            state.plan = {};
        },
        removeClient: (state) => {
            state.client = {};
        }
    }
})

const store = configureStore({
    reducer: paymentSlice.reducer
})

export default store;
export const { setPlan, setClient, removePlan, removeClient } = paymentSlice.actions;