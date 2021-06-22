import express from 'express';
import productRouter from './routers/productRouter.js';
import mongoose from 'mongoose'
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';
import dotenv from 'dotenv';

dotenv.config();
const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/SalehShop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// app.get('/api/products/:id',(req,res)=>{
//     const product =data.products.find((x)=> x._id===req.params.id)
//     if (product){
//         res.send(product)
//     }
//     else {
//         res.status(404).send({message : 'Product not found'})
//     }
    
// })
app.use('/api/products', productRouter);
// app.get('/api/products',(req,res)=>{
//     res.send(data.products)
// })

  app.use('/api/users', userRouter);
  app.use('/api/orders', orderRouter);
  app.get('/',(req,res)=>{
    res.send('Server is ready')
}
);
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
  });
const port=process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`server at http://localhost:${port}`)
})