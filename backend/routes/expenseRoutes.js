const express=require('express');
const router=express.Router();
const Expense=require('../model/expense');

router.get('/', async (req,res)=>{
    try {
        const expenses=await Expense.find().sort({ date: -1 });
        res.json(expenses);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

/**
 * @route   POST /api/expenses
 * @desc    Add a new expense
 * @access  Public
 */
router.post('/', async (req, res) => {
  const { description, amount, category, date } = req.body;

  const newExpense = new Expense({
    description,
    amount,
    category,
    date
  });

  try {
    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;