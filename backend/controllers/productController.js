import asyncHandler from "../middleware/asyncHandler.js"
import Product from "../models/productModel.js";


const getProducts = asyncHandler(
    async (req,res)=>{
        const products = await Product.find({});
        res.json(products).status(200);
        
    }
)

const getProductById = asyncHandler(async (req,res)=>{
    const id = req.params.id;
    const product = await Product.findById({_id:id});
    if(product)
    res.json(product).status(200);
    else
    {
        res.status(404);
        throw new Error('Resource not found');
    }
    
})

export {getProducts, getProductById}