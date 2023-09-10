const pool = require('../models/database');

const createOrderLineController = async(req,res)=>{
    try {
        const { order_id, product_id, quantity, price } = req.body;
        const query = 'INSERT INTO orderlines (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)';
        await pool.query(query, [order_id, product_id, quantity, price]);
        res.status(201).send('Order line added successfully.');
      } catch (error) {
        console.error(error);
        res.status(500).send('Error adding order line.');
      }
}