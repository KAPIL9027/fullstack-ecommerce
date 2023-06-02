import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connection from './config/db.js'

dotenv.config()
connection();

const importData = async ()=>{
    

    try{
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();
    
    
        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;
        const importProducts = products.map((product)=>{return {...product,user: adminUser}});
        await Product.insertMany(importProducts);
        console.log("data imported".green.inverse);
        process.exit();
    }
    catch(e)
    {
    console.error(`${e}`.red.inverse)
    process.exit(1);
    }
    
}

const destroyData = async ()=>{
    try{
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    console.log('Data destroyed'.red.inverse);
    }
    catch(error)
    {
    console.error(`${error}`.red.inverse)
    process.exit(1);
    }
}


if(process.argv[2] === '-d')
{
    destroyData();
}
else
{
    importData();
}

