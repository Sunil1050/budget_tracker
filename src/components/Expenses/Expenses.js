import React, { useState } from 'react';
import { Typography, TextField, Stack, Button, Snackbar, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { getAllExpenses, changeName, changeCost } from '../../redux/expense/expenseSlice';
const Expenses = () => {
    const [open, setOpen] = useState(false);
    const [direction, setDirection] = useState({
        vertical: "",
        horizontal: ""
    })
    const [message, setMessage] = useState("");
    const [alert, setAlert] = useState("");

    const { vertical, horizontal } = direction;
    const dispatch = useDispatch();
    const { name, cost, allExpenses, budget } = useSelector((state) => state.expenses)

    const getRemainingAmount = budget - allExpenses.reduce((total, item) => total + parseInt(item.cost), 0);
    console.log('remaining amount: ', getRemainingAmount);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const onSave = () => {
        if (name.length === 0 && cost.length === 0) {
            setOpen(true);
            setDirection(prevState => ({ ...prevState, vertical: 'top', horizontal: 'right' }))
            setMessage("Please enter your expenses..")
            setAlert("warning")
        }
        else if (getRemainingAmount === 0 || parseInt(cost) > getRemainingAmount) {
            setOpen(true);
            setDirection(prevState => ({ ...prevState, vertical: 'top', horizontal: 'right' }))
            setMessage("Your Budget Limit exceeded...")
            setAlert("error")
        }
        else {
            dispatch(getAllExpenses({ id: uuidv4(), name, cost }));
            dispatch(changeName(""));
            dispatch(changeCost(""));
        }
    }

    const onChangeName = (event) => {
        dispatch(changeName(event.target.value))
    }

    const onChangeCost = (event) => {
        dispatch(changeCost(event.target.value))
    }

    return (
        <div>
            <Typography variant="h5" sx={{ fontWeight: 600, mt: 2, mb: 1 }}>Add Expense</Typography>
            <Stack direction="row" spacing={3}>
                <div>
                    <Typography variant="body1" gutterBottom>
                        Name
                    </Typography>
                    <TextField id="demo-helper-text-misaligned-no-helper" onChange={onChangeName} label="Name" value={name} sx={{
                        width: { sm: 200, md: 400 },
                        height: { sm: 30, md: 60 }
                    }} />
                </div>
                <div>
                    <Typography variant="body1" gutterBottom>
                        Cost
                    </Typography>
                    <TextField id="demo-helper-text-misaligned-no-helper" onChange={onChangeCost} value={cost} label="Cost" sx={{
                        width: { sm: 200, md: 400 },
                        height: { sm: 30, md: 60 }
                    }} />
                </div>
            </Stack>
            <Button variant="contained" size="medium" sx={{ mt: 2 }} onClick={onSave}>
                Save
            </Button>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical, horizontal }}
            >
                <Alert onClose={handleClose} severity={alert} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Expenses;