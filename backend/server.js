const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const UserRoute = require('./routes/userRoute');
const AuthRoute = require('./routes/authRoute')
const CategoryRoute = require('./routes/categoryRoute')
const ProductRoute = require('./routes/productRoute');
const CartRoute = require('./routes/cartRoute')
const OrderRoute = require('./routes/orderRoute')
const ApiError = require('./utils/apiError');
const app = express();
const cors = require('cors');

dotenv.config();
//middle ware to get & post json 
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

//Routes 
app.use("/api/v1",AuthRoute);
app.use("/api/v1/users",UserRoute);
app.use("/api/v1/product",ProductRoute)
app.use("/api/v1/category",CategoryRoute)
app.use("/api/v1/cart",CartRoute)
app.use("/api/v1/order",OrderRoute)


if (process.env.NODE_ENV === "development") {
    console.log(`mode: ${process.env.NODE_ENV}`);
    app.use(morgan('dev'));
}

app.all('*',(req,res)=>{

})

const PORT = process.env.PORT || 3000
const server = app.listen(PORT , ()=>{
    console.log(`App running on PORT ${PORT}`)
})




