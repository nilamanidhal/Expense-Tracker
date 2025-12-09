import React, { useEffect, useState } from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import ExpenseSummary from '../components/ExpenseSummary';
import ChartComponent from '../components/ChartComponent'; // <--- Import this
import { getExpenses, addExpense } from '../services/expenseService';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (error) {
      console.error("Failed to fetch expenses", error);
    }
  };

  const handleAddExpense = async (expense) => {
    try {
      await addExpense(expense);
      loadExpenses();
    } catch (error) {
      console.error("Failed to add expense", error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
        Expense Tracker
      </h1>

      {/* Top Section: Form + Chart/Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Left Column: Input Form */}
        <div className="lg:col-span-2">
           <ExpenseForm onAddExpense={handleAddExpense} />
           <div className="mt-8">
             <ExpenseSummary expenses={expenses} />
           </div>
        </div>

        {/* Right Column: Chart */}
        <div>
          <ChartComponent expenses={expenses} />
        </div>
      </div>

      {/* Bottom Section: List Table */}
      <ExpenseList expenses={expenses} />
    </div>
  );
};

export default Dashboard;