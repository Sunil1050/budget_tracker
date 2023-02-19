import React from 'react';
import { Typography, TextField } from '@mui/material';
import { searchExpense, deleteExpense } from "../../redux/expense/expenseSlice"
import { useSelector, useDispatch } from 'react-redux';
import ExpenseItem from '../ExpenseItem/ExpenseItem';

const ExpensesList = () => {
    const dispatch = useDispatch();
    const { allExpenses, searchTerm } = useSelector((state) => state.expenses)

    const searchedExpenses = allExpenses.filter((expense) => expense.name.toLowerCase().includes(searchTerm.toLowerCase()))

    const onSearch = (event) => {
        dispatch(searchExpense(event.target.value))
    }

    const removeExpense = (expenseId) => {
        const updatedExpensesList = allExpenses.filter((expense) => expense.id !== expenseId)
        dispatch(deleteExpense(updatedExpensesList))
    }

    return (
        <div>
            <Typography variant="h5" sx={{ fontWeight: 600, mt: 2, mb: 1 }}>Expenses</Typography>
            <TextField fullWidth label="Search" id="Search" size="small" placeholder="Type to Search" sx={{ mb: 2 }} onChange={onSearch} value={searchTerm} />
            {searchedExpenses.map(expense => (
                <ExpenseItem expense={expense} removeExpense={removeExpense} />
            ))}
        </div>
    );
};

export default ExpensesList;