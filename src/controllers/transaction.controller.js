const{
    createTransaction,
    getTransactions,
}=require('../services/transaction.service');

const create=async(req,res)=>{
    console.log("BODY:", req.body);
    console.log("USER:", req.user);     
    try{
        const data=await createTransaction(req.body,req.user);
        res.status(201).json(data);
    } catch(err){
        res.status(400).json({error:err.message});
    }
};

const getAll=async(req,res)=>{
    try{
        const data=await getTransactions(req.query,req.user);
        res.json(data);
    } catch(err){
        res.status(400).json({error:err.message});
    }
};

module.exports={create,getAll};
