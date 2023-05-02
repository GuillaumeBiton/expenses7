
import { createStore } from 'framework7';

const store = createStore({
  state: {
    loading: false,
    expenseAccount: [],
    expense: [{
      id: '1',
      date: '10/03/2023',
      category : 'Péage',
      by: 'Guillaume Biton',
      amount: '10,02 €'
    }]
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
