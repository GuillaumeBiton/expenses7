
import { createStore } from 'framework7';

const store = createStore({
  state: {
    expenseAccount: [],
    expense: [
      'test',
      'second'
    ]
  },
  getters: {
    expenseAccount({ state }) {
      return state.expenseAccount;
    },
    expense({ state }) {
      return state.expense;
    }
  },
  actions: {
    addExpense({ state }, expense) {
      state.expense = [...state.expense, expense];
    },
    addExpenseAccount({ state }, expenseAccount) {
      state.expenseAccount = [...state.expenseAccount, expenseAccount];
    },
  },
})
export default store;
