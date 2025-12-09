import React, { useState } from 'react';
import { formatCurrency } from '../utils/helpers';

const ExpenseList = ({ expenses }) => {
  // 1. State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // 2. Filter Logic
  // We filter the original 'expenses' prop based on the state above
  const filteredExpenses = expenses.filter((expense) => {
    // Check if category matches (or if "All" is selected)
    const matchesCategory = 
      selectedCategory === 'All' || expense.category === selectedCategory;

    // Check if description contains the search text (case insensitive)
    const matchesSearch = 
      expense.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Get unique categories for the dropdown (optional dynamic approach)
  // Or you can hardcode them ['Food', 'Transport', etc.]
  const categories = ['All', 'Food', 'Transport', 'Utilities', 'Entertainment', 'Health', 'Other'];

  return (
    <div className="bg-white shadow rounded-lg p-4">
      
      {/* --- Filter Controls Section --- */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        
        {/* Search Input */}
        <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search by description..."
              className="w-full pl-4 pr-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>

        {/* Category Dropdown */}
        <div className="relative w-full md:w-1/4">
          <select
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500 bg-white"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'All' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* --- Table Section --- */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Category
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Description
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.length > 0 ? (
              // NOTE: We map over 'filteredExpenses' now, not 'expenses'
              filteredExpenses.map((expense) => (
                <tr key={expense._id} className="hover:bg-gray-50 transition duration-150">
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {new Date(expense.date).toLocaleDateString('en-IN')}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                      <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                      <span className="relative">{expense.category}</span>
                    </span>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {expense.description}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right font-bold text-gray-700">
                    {formatCurrency(expense.amount)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No matching expenses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseList;