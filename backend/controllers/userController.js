const pool = require('../models/database');

const getUser = async (req, res) => {
    try {
        const results = await pool.query("SELECT * FROM users");
        res.status(200).json(results.rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getUserById = async (req,res) =>{
    try{
        const id = parseInt(req.params.id)
        const results = await pool.query("SELECT * FROM users WHERE id=$1",[id]);
        res.status(200).json(results.rows);
    }catch(err){
        console.error(err)
        res.status(500).json({error:'Internal Server Error'})
    }
}
const addUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const insertQuery = `
            INSERT INTO users ("username", "email", "password", "role")
            VALUES ($1, $2, $3, $4)
        `;
        await pool.query(insertQuery, [username, email, password, role]);

        res.status(201).json({ message: 'User Created Successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteUser = async (req,res)=>{
    try{
       const id = parseInt(req.params.id);
       const addUser = await pool.query("DELETE FROM users WHERE id=$1",[id]);
       if(!addUser.rowCount > 0 ){
        return   res.status(404).json({"message":"No User Found"});
       }
       res.status(200).json('User Deleted');

       //not found

    }catch(err){
        console.error(err)
        res.status(500).json({error:'Internal Server Error'})
    }
}

const updateUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { username, email, role, password } = req.body;

        // Check if the user exists
        const findUserQuery = "SELECT * FROM users WHERE id = $1";
        const findUserResult = await pool.query(findUserQuery, [id]);
        const foundUser = findUserResult.rows[0];

        if (!foundUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        const updateUserQuery = `
            UPDATE users
            SET username = $1, email = $2, role = $3, password = $4
            WHERE id = $5
        `;
        await pool.query(updateUserQuery, [username, email, role, password, id]);

        res.status(201).json({ message: 'User updated successfully',  updateUserQuery});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getUser,
    getUserById,
    addUser,
    deleteUser,
    updateUser
}

