const pool = require('../models/database');


const placeOrder = async (req, res) => {
    const { user_id } = req.user.id;
    const { address, first_name, last_name, email, phone_number } = req.body;
    try {
      const query = `
        INSERT INTO orders (user_id, address, first_name, last_name, email, phone_number)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id;
      `;
  
      const result = await pool.query(query, [user_id, address, first_name, last_name, email, phone_number]);
  
      res.status(201).json({ message: 'Order placed successfully', orderId: result.rows[0].id });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error placing order.');
    }
  };

module.exports = {
  placeOrder,
};

const CancelOrder = async(req,res)=>{
    try {
        const { order_id } = req.params;
        const query = 'UPDATE orders SET status = $1 WHERE order_id = $2';
        await pool.query(query, ['Cancelled', order_id]);
        res.send('Order cancelled successfully.');
      } catch (error) {
        console.error(error);
        res.status(500).send('Error cancelling order.');
      }
    
}

const AllOrder = async(req,res)=>{
    try {
        const query = 'SELECT * FROM orders';
        const { rows } = await pool.query(query);
        res.json(rows);
    }catch (error) {
        console.error(error);
        res.status(500).send('Error fetching orders.');
    }
}

const OrderById = async(req,res)=>{
    try {
        const { order_id } = req.params;
        const query = 'SELECT * FROM orders WHERE order_id = $1';
        const { rows } = await pool.query(query, [order_id]);
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching order.');
      }
}

module.exports= {
    AllOrder,CancelOrder,OrderById,placeOrder
}