import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBudget } from "../../redux/expense/expenseSlice"
import { Typography, Grid, Card, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const BudgetButtons = () => {
    const dispatch = useDispatch();
    const { budget, allExpenses } = useSelector((state) => state.expenses)
    
    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
            padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
            padding: theme.spacing(1),
        },
    }));

    const [open, setOpen] = useState(false);
    const [expenseBudget, setExpenseBudget] = useState(budget);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const onChangeBudget = (event) => {
        setExpenseBudget(event.target.value)
    }

    const onSaveBudget = () => {
        dispatch(setBudget(expenseBudget))
        handleClose()
    }

    const expensesAmount = allExpenses.reduce((total, item) => total + parseInt(item.cost), 0);
    console.log("Hi: ", expensesAmount);

    return (
        <Grid container spacing={2}>
            <Grid item xs={6} sm={4} md={4}>
                <Card variant="outlined" sx={{ p: 2.3, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8f9fa' }}>
                    <Typography variant="body2" gutterBottom>{`Budget: Rs.${budget}`}</Typography>
                    <Button variant="contained" color="primary" onClick={handleClickOpen}>
                        Edit
                    </Button>
                    <BootstrapDialog
                        onClose={handleClose}
                        aria-labelledby="customized-dialog-title"
                        open={open}
                    >
                        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                            Modal title
                        </BootstrapDialogTitle>
                        <DialogContent dividers>
                            <Typography variant="h5" gutterBottom>Set your Budget</Typography>
                            <TextField id="outlined-basic" label="Budget" variant="outlined" onChange={onChangeBudget} defaultValue={expenseBudget} />
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={onSaveBudget}>
                                Save changes
                            </Button>
                        </DialogActions>
                    </BootstrapDialog>
                </Card>
            </Grid>
            <Grid item xs={6} sm={4} md={4}>
                <Card variant="outlined" sx={{ p: 3, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#28a745', color: 'white' }}>
                    <Typography variant="body2" gutterBottom>{`Remaining: Rs.${budget-expensesAmount}`}</Typography>
                </Card>
            </Grid>
            <Grid item xs={6} sm={4} md={4}>
                <Card variant="outlined" sx={{ p: 3, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#17a2b8', color: 'white' }}>
                    <Typography variant="body2" gutterBottom>{`Spent so far: Rs.${expensesAmount}`}</Typography>
                </Card>
            </Grid>
        </Grid>
    );
};

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}
export default BudgetButtons;