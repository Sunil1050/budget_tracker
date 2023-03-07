import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBudget } from "../../redux/expense/expenseSlice"
import { Typography, Grid, Card, Button, Modal, Box, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

const BudgetButtons = () => {
    const dispatch = useDispatch();
    const { budget, allExpenses } = useSelector((state) => state.expenses)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '80%',
        maxWidth: 400,
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        '@media (min-width: 600px)': {
            width: '60%',
            maxWidth: 600,
        },
        '@media (min-width: 960px)': {
            width: '40%',
            maxWidth: 960,
        },
        '@media (min-width: 1280px)': {
            width: '30%',
            maxWidth: 1280,
        },
    };


    const [expenseBudget, setExpenseBudget] = useState(budget);

    const onChangeBudget = (event) => {
        setExpenseBudget(event.target.value)
    }

    const onSaveBudget = () => {
        dispatch(setBudget(expenseBudget))
        handleClose()
    }

    const expensesAmount = allExpenses.reduce((total, item) => total + parseInt(item.cost), 0);

    return (
        <Grid container spacing={2}>
            <Grid item xs={6} sm={4} md={4}>
                <Card variant="outlined" sx={{ p: 2.3, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8f9fa' }}>
                    <Typography variant="body2" gutterBottom>{`Budget: Rs.${budget}`}</Typography>
                    <Button variant="contained" color="primary" onClick={handleOpen} sx={{ display: { xs: 'none', sm: 'none', md: 'inline' } }}
                    >
                        Edit
                    </Button>
                    <IconButton color="dark" aria-label="edit budget" size="medium" sx={{ display: { xs: 'inline', sm: 'inline', md: 'none' } }} onClick={handleOpen}>
                        <EditIcon />
                    </IconButton>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 1 }}>
                                Set your Budget
                            </Typography>
                            <TextField id="outlined-basic" label="Budget" variant="outlined" onChange={onChangeBudget} value={expenseBudget} />
                            <br />
                            <Button variant="contained" color="primary" onClick={onSaveBudget} sx={{ mt: 1 }}>
                                Save
                            </Button>
                            <Button variant="contained" color="error" onClick={handleClose} sx={{ ml: 1, mt: 1 }}>
                                Close
                            </Button>
                        </Box>
                    </Modal>
                </Card>
            </Grid>
            <Grid item xs={6} sm={4} md={4}>
                <Card variant="outlined" sx={{ p: 3, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#28a745', color: 'white' }}>
                    <Typography variant="body2" gutterBottom>{`Remaining: Rs.${budget - expensesAmount}`}</Typography>
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

export default BudgetButtons;