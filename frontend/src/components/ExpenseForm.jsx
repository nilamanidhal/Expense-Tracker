import React, { useState } from 'react';

const ExpenseForm = ({ onAddExpense }) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

            /**
   * Handles form submission
   * @param {Event} e - The form event
   */
  const handleSubmit = (e) => {
              e.preventDefault();
    onAddExpense(formData);
      setFormData({ description: '', amount: '', category: 'Food', date: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded-lg mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
           name="description"
          placeholder="Description"
           value={formData.description}
          onChange={handleChange}
        className="border p-2 rounded"
          required
        />
      <div className="relative">
  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    <span className="text-gray-500 sm:text-sm">₹</span>
  </div>
  <input
    name="amount"
    type="number"
    placeholder="0.00"
    value={formData.amount}
      onChange={handleChange}
    className="border p-2 pl-7 rounded w-full" // Added pl-7 (padding-left) to make room for the symbol
    required
  />
</div>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
        </select>
        <input
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
      </div>
      <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;