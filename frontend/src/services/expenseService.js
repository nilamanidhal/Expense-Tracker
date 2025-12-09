import axios from 'axios';

const API_URL = 'http://localhost:5000/api/expenses';

/**
 * Fetches all expenses from the backend.
 * @returns {Promise<Array>} List of expense objects
 */
export const getExpenses = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

/**
 * Adds a new expense to the backend.
 * @param {Object} expenseData - The expense object (amount, category, date, description)
 * @returns {Promise<Object>} The saved expense
 */
export const addExpense = async (expenseData) => {
  const response = await axios.post(API_URL, expenseData);
  return response.data;
};