import React, { useState } from 'react';
import { Typography, TextField, Stack, Button, Snackbar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { getAllExpenses, changeName, changeCost } from '../../redux/expense/expenseSlice';
const Expenses = () => {
    const [open, setOpen] = useState(false);
    const [direction, setDirection] = useState({
        vertical: "",
        horizontal: ""
    })
    const { vertical, horizontal } = direction;
    const dispatch = useDispatch();
    const { name, cost } = useSelector((state) => state.expenses)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    const onSave = () => {
        if (name.length === 0 && cost.length === 0) {
            setOpen(true);
            setDirection(prevState => ({ ...prevState, vertical: 'top', horizontal: 'right' }))
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
            <Snackbar
                open={open}
                anchorOrigin={{ vertical, horizontal }}
                autoHideDuration={3000}
                onClose={handleClose}
                message="Please enter your expenses"
                action={action}
            />
        </div>
    );
};

export default Expenses;