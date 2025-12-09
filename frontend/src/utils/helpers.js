/**
 * Formats a number into Indian Currency (INR).
 * @param {number} amount - The numeric amount
 * @returns {string} Formatted string (e.g., "₹500.00")
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(amount);
};




// export const formatCurrency = (amount) => {
//   return new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
//   }).format(amount);
// };