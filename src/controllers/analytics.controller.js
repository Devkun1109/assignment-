const {
  getSummary,
  getCategorySummary,
} = require('../services/analytics.service');

const summary = async (req, res) => {
  try {
    const data = await getSummary(req.user);
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const category = async (req, res) => {
  try {
    const data = await getCategorySummary(req.user);
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const{
  getRecentTransactions,
  getMonthlyTrends
}=require('../services/analytics.service');

const recent=async(req,res)=>{
  const data=await getRecentTransactions(req.user);
  res.json(data);
};

const monthly=async(req,res)=>{
  const data=await getMonthlyTrends(req.user);
  res.json(data);
}
module.exports = { summary, category, recent, monthly };