const pool = require('../models/database');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    const filename = `product-${uuidv4()}-${Date.now()}.${ext}`;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Only Images Allowed'), false);
  }
};

const uploadImage = multer({ storage, fileFilter });

const createProduct = async (req, res) => {
  try {
    const { name, price, description, category_id } = req.body;
    const imageUrl = `/uploads/${req.file.filename}`;

    const query = `
      INSERT INTO products (name, price, description, category_id, image_url)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id;
    `;

    const result = await pool.query(query, [name, price, description, category_id, imageUrl]);

    const response = {
      message: 'created',
      productId: result.rows[0].id,
      imageUrl,
    };

    res.status(201).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

  



const getAllProducts = async(req,res)=>{
    try{
        const result = await pool.query('SELECT * FROM products');
        res.status(201).json(result.rows)
    }catch(err){
        console.error(err);
        res.status(500).json({message:'Internal Server Error'})
    }
}

const DeleteProducts = async(req,res)=>{
    try{
        const id= parseInt(req.params.id);
        const result = await pool.query(`DELETE from products where id=${id}`);
        if (result.rowCount === 0 ){
            return res.sendStatus(404).json({message:'not found'});
            };
        res.status(201).json({message:'deleted'});

    }catch(err){
        console.error(err);
        res.status(500).json({message:'Internal Server Error'})
    }
}

const getProductById = async(req,res)=>{
    try{
        const id = parseInt(req.params.id);
        const query = 'SELECT * FROM products WHERE id = $1';
        const values = [id];
    
        const result = await pool.query(query, values);
    
        if (result.rows.length === 0) {
          res.status(404).json({ message: 'Product not found' });
        } else {
          res.status(200).json(result.rows[0]);
        }

    }catch(err){
        console.error(err);
        res.status(500).json({message:'Internal Server Error'})
    }
}

const updateProduct = async(req,res)=>{
    try{
        const id = parseInt(req.params.id);
        const { name, price} = req.body; 
        const query = 'UPDATE products SET name = $1, price = $2 WHERE id = $3';
        const values = [name, price, id];
        await pool.query(query, values);
        res.status(200).json({ message: 'Product updated successfully' });
    }catch(err){
        console.error(err);
        res.status(500).json({message:'Internal Server Error'})
    }
}

const getAllProductsForCategory = async (req, res) => {
    try {
      const category = req.params.category; 
  
      const query = 'SELECT * FROM products WHERE category = $1';
      const values = [category];
  
      const result = await pool.query(query, values);
  
      res.status(200).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

module.exports = {
    DeleteProducts,createProduct,
    getAllProducts,getAllProductsForCategory
    ,getProductById,uploadImage,updateProduct
}