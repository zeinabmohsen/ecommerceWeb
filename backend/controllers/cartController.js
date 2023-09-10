const pool = require("../models/database");

const AddToCart = async (req, res) => {
  try {
    // Get user_id from decoded token using the protect middleware
    const user_id = req.user.id;
    console.log(req.user)
    const { product_id, quantity } = req.body;
    const query = 'INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, $3)';
    const result = await pool.query(query, [user_id, product_id, quantity]);
    console.log('Received data: user_id:', user_id, 'product_id:', product_id, 'quantity:', quantity);

    if (result.rowCount === 1) {
      res.status(201).send('Item added to cart successfully.');
    } else {
      console.error('Failed to insert item into cart:', result);
      res.status(500).send('Error adding item to cart.');
    }
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).send('Error adding item to cart.');
  }
};

const getUserCart = async(req,res)=>{
  try{
    const user_id = req.user.id ;
    const query = `
      SELECT cart.id, cart.user_id, cart.product_id, cart.quantity, products.name, products.price
      FROM cart
      JOIN products ON cart.product_id = products.id
      WHERE cart.user_id = $1;
    `;
    const result = await pool.query(query,[user_id])
    res.status(200).json(result.rows);

  }catch(error){
    console.error('Error User Cart:', error);
    res.status(500).send('User Cart Error');
  }
}



module.exports = { AddToCart ,getUserCart};

