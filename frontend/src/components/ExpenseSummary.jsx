import React from 'react';
import { formatCurrency } from '../utils/helpers';

const ExpenseSummary = ({ expenses }) => {
  // Calculate total per category
  const categoryTotals = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount);
    return acc;
  }, {});

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {Object.keys(categoryTotals).map((cat) => (
        <div key={cat} className="p-4 bg-gray-100 rounded shadow">
          <h3 className="font-bold text-gray-700">{cat}</h3>
          <p className="text-xl text-green-600">{formatCurrency(categoryTotals[cat])}</p>
        </div>
      ))}
    </div>
  );
};

export default ExpenseSummary;