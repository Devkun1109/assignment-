const { z } = require('zod');

const transactionSchema = z.object({
  amount: z.number().positive(),
  type: z.enum(['income', 'expense']),
  category_id: z.number().int(),
  date: z.string(),
  notes: z.string().optional(),
});

module.exports = { transactionSchema };