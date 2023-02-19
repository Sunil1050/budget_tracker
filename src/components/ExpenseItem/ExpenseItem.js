import React from 'react';
import {Typography, Stack, Paper} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import useStyles from "./style"

const ExpenseItem = ({ expense, removeExpense }) => {
    const { id, name, cost } = expense;
    const classes = useStyles();

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        margin: theme.spacing(1)
    }));

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
                    <IconButton aria-label="delete" size="medium" onClick={onDelete}>
                        <DeleteIcon fontSize="medium" />
                    </IconButton>
                </div>
            </Stack>
        </Item>
    );
};

export default ExpenseItem;