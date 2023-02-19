import { Container, Typography } from '@mui/material';
import BudgetButtons from './components/BudgetButtons';
import Expenses from './components/Expenses/Expenses';
import ExpensesList from './components/ExpensesList/ExpensesList';

const App = () => {
  return (
    <>
      <Container>
        <Typography variant='h4' align='left' sx={{ mb: 2, mt: 2, fontWeight: 600 }}>Budget Planner</Typography>
        <BudgetButtons />
        <Expenses />
        <ExpensesList />
      </Container>
    </>
  )
}
export default App;