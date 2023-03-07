import { useState } from "react"
import { Typography, Stack, Paper, Button, Modal, Box, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { styled } from '@mui/material/styles';
import useStyles from "./style"

const ExpenseItem = ({ expense, editExpense, removeExpense }) => {
    const { id, name, cost } = expense;
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const classes = useStyles();

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

    const [updatedCost, setUpdatedCost] = useState(cost);

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        margin: theme.spacing(1)
    }));

    const onSaveExpense = () => {
        editExpense(id, updatedCost)
        handleClose()
    }

    const handleUpdateExpense = (event) => {
        setUpdatedCost(event.target.value)
    }

    const onDelete = () => {
        removeExpense(id)
    }


    return (
        <Item>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle2" gutterBottom className={classes.expenseName}>
                    {name}
                </Typography>
                <div>
                    <button type="button" className={classes.priceButton}>{cost}</button>
                    <IconButton aria-label="delete" size="medium" onClick={handleOpen}>
                        <ModeEditIcon fontSize="medium" />
                    </IconButton>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        hideBackdrop
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 1 }}>
                                Update your Expense
                            </Typography>
                            <TextField id="outlined-basic" label="Expense" variant="outlined" onChange={handleUpdateExpense} value={updatedCost} autoFocus />
                            <br />
                            <Button variant="contained" color="primary" sx={{ mt: 1 }} onClick={onSaveExpense}>
                                Save
                            </Button>
                            <Button variant="contained" color="error" onClick={handleClose} sx={{ ml: 1, mt: 1 }}>
                                Close
                            </Button>
                        </Box>
                    </Modal>
                    <IconButton aria-label="delete" size="medium" onClick={onDelete}>
                        <DeleteIcon fontSize="medium" />
                    </IconButton>
                </div>
            </Stack>
        </Item>
    );
};

export default ExpenseItem;