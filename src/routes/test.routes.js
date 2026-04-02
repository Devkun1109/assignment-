const express =require('express');
const {authenticate}=require('../middlewares/auth.middleware');
const {authorize}=require('../middlewares/roles.middleware');

const router=express.Router();

router.get(
    '/admin',
    authenticate,
    authorize('admin'),
    (req,res)=>{
        res.json({message:'Admin access granted'});
    }
);

router.get(
  '/analytics',
  authenticate,
  authorize('analyst','admin'),
  (req, res)=>{
    res.json({ message:'Analytics access granted'});
  }
);

module.exports = router;