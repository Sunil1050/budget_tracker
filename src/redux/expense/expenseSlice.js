import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    budget: 50000,
    allExpenses: [],
    name: "",
    cost: "",
    searchTerm: ""
};

const expenseSlice = createSlice({
    name: "expenses",
    initialState,
    reducers: {
        getAllExpenses: (state, { payload }) => {
            state.allExpenses = [...state.allExpenses, payload]
        },
        changeName: (state, { payload }) => {
            state.name = payload
        },
        changeCost: (state, { payload }) => {
            state.cost = payload
        },
        searchExpense: (state, {payload}) => {
            state.searchTerm = payload
        },
        deleteExpense: (state, {payload}) => {
            state.allExpenses = payload
        },
        setBudget: (state, {payload}) => {
            state.budget = payload
        }
    },
});

export default expenseSlice.reducer;

export const { getAllExpenses, changeName, changeCost, searchExpense, deleteExpense, setBudget } = expenseSlice.actions
