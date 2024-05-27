const { createSlice, configureStore } = require("@reduxjs/toolkit")

const initialState = {
    plan: {},
    client: {},
    isPaid: false
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
        },
        setPaidTrue: (state) => {
            state.isPaid = true;
        },
        setPaidFalse: (state) => {
            state.isPaid = false;
        }
    }
})

const store = configureStore({
    reducer: paymentSlice.reducer
})

export default store;
export const { setPlan, setClient, removePlan, removeClient, setPaidFalse, setPaidTrue } = paymentSlice.actions;