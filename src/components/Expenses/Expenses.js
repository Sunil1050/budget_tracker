import React from 'react';
import { Typography, TextField, Stack, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { getAllExpenses, changeName, changeCost } from '../../redux/expense/expenseSlice';
const Expenses = () => {
    const dispatch = useDispatch();
    const { name, cost } = useSelector((state) => state.expenses)

    const onSave = () => {
        dispatch(getAllExpenses({ id: uuidv4(), name, cost }));
        dispatch(changeName(""));
        dispatch(changeCost(""));
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
                        "& .MuiInputBase-root": {
                            height: 60
                        }
                    }} />
                </div>
                <div>
                    <Typography variant="body1" gutterBottom>
                        Cost
                    </Typography>
                    <TextField id="demo-helper-text-misaligned-no-helper" onChange={onChangeCost} value={cost} label="Cost" sx={{
                        width: { sm: 200, md: 400 },
                        "& .MuiInputBase-root": {
                            height: 60
                        }
                    }} />
                </div>
            </Stack>
            <Button variant="contained" size="medium" sx={{ mt: 2 }} onClick={onSave}>
                Save
            </Button>
        </div>
    );
};

export default Expenses;