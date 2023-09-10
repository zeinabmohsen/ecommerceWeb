const pool = require("../models/database");


const createRating = async(req,res)=>{
    try {
        const { user_id, product_id, rating, comment } = req.body;
        const query = 'INSERT INTO ratings (user_id, product_id, rating, comment) VALUES ($1, $2, $3, $4)';
        await pool.query(query, [user_id, product_id, rating, comment]);
        res.status(201).send('Rating added successfully.');
      } catch (error) {
        console.error(error);
        res.status(500).send('Error adding rating.');
      }
}

module.exports = createRating

