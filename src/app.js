const express=require('express');
const cors=require('cors');
const morgan=require('morgan');

const app=express();
app.use(express.json());
const authRoutes=require('./routes/auth.routes');
const testRoutes=require('./routes/test.routes');
const transactionRoutes = require('./routes/transaction.routes');
app.use('/api/transactions', transactionRoutes);
app.use('/api/test',testRoutes);
app.use('/api/auth',authRoutes);
app.use(cors());
app.use(morgan('dev'));
app.get('/',(req,res)=>{
    res.send('API is running');
});
module.exports=app;

