const asyncHandler = require('async-handler');
const pool = require('../models/database');

const createCategory = async(req,res)=>{
    const {name} = req.body;
    try{
        result = await pool.query('INSERT INTO categories (name) VALUES ($1)',[name])
        
        res.status(201).json({message:'created'})
    }catch(err){
        console.error(err.array);
        res.status(500).json({message: 'Failed to create category' })
    }
}

const getAllCategory = async(req,res)=>{
    try{
        result = await pool.query('SELECT * FROM categories');
        res.status(200).json(result.rows)
    }catch(err){
        console.error(err.array);
        res.status(500).json({message: 'Failed to get all categories' })
    }
}

module.exports = {
    createCategory ,getAllCategory  
};
