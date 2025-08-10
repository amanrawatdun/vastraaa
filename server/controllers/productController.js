const Product = require("../models/Product");
const {uploadToCloudinary, deleteFromCloudinary} = require("../config/cloudinary"); // Adjust path if necessary

// Get Products (no change)
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products' });
    }
};

const getProductByPages = async(req , res)=>{
    try{
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 10;
        const skip = (page -1)*limit;

        const products = await Product.find({}).limit(limit).skip(skip);
        const totalProducts = await Product.countDocuments();

        res.json({
            products,
            currentPage:page,
            totalPages:Math.ceil(totalProducts/limit),
            totalProducts,
        })

    }catch(error){
        res.status(500).json({message:'Error fetching products'});
    }
}

const getNewArrivalProducts = async(req ,res)=>{
    try{
        const newProducts = await Product.find({category:"newArival"})
        if(!newProducts)return res.json({message:"no product found"});
        res.json(newProducts);
    }catch(error){
        res.status(500).json({message:"Error in fetching newArival Products"})
    }
}

const getSaleProducts = async(req ,res)=>{
    try{
        const newSaleProducts = await Product.find({category:"sale"})
        if(!newSaleProducts)return res.json({message:"no products found of sale"})
        res.json(newSaleProducts)
    }catch(error){
        res.status(500).json({message:"Error in fetching sales products"})
    }
}

const getProductByBrand = async (req, res) => {
    const brandname = req.query.brands;
    try {
        const products = await Product.find({brand:brandname});

        if (products.length === 0) {
            return res.status(404).json({ message: "No product found for this brand" });
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const getProductBySearch = async(req ,res)=>{
    const data = req.query.category;
    try{
        const product = await Product.find({category:{
            $regex:new RegExp(`^${data}$`,"i")}
        });
    if(product.length ===0) return res.json({message:"no data found"});
        console.log(product)
        return res.status(200).json(product)
    }catch(error){
        return res.status(500).json({message:"internal server error"})
    }
}

// Create a product (admin) 
const createProduct = async (req, res) => {
    const { name, brand, description, category, costPrice, sellingPrice, sizes, stock } = req.body;
    const createdBy = req.user._id;

    console.log(sizes)


    if (!req.file) {
        return res.status(400).json({ message: 'Product image is required.' });
    }

    try {
       
        const result = await uploadToCloudinary(req.file.buffer);

      
        const product = await Product.create({
            name,
            brand,
            description,
            category,
            costPrice,
            sellingPrice,
           
            sizes,
           
            stock,
            image: {
                public_id: result.public_id, 
                url: result.secure_url    
            },
            createdBy,
        });

        res.status(201).json(product);

    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: 'Failed to create product. Please try again.' });
    }
};

const updateProduct = async(req , res)=>{
    try{
        
        const {id} = req.params;
        console.log(id);
        // // const id = req.params;
        // const id = '688cea10f0d6959e2ffe05dc';
        const {name, brand, description, category, costPrice, sellingPrice, sizes, stock} = req.body;

        const product = await Product.findById(id);

        if(!product){
            return res.status(404).json({
                success:false,
                message:`Product with ID ${id} not found. `
            });
    } 

        const updateData = {
            name,
            brand,
            description,
            category,
            costPrice,
            sellingPrice,
            sizes,
            stock
        }

        if(req.file){
            if(product.image && product.image.public_id){
                await deleteFromCloudinary(product.image.public_id);
            }

            const result = await uploadToCloudinary(req.file.buffer);

            updateData.image={
                public_id:result.public_id,
                url:result.url
            }
        }
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            updateData,
            {new:true , runValidators:true}
        );
        res.status(200).json({
            success:true,
            message:'Product updated Successfully',
            data:updatedProduct
        });

    }catch(error){
        console.error("Error updating product:",error);
        res.status(500).json({
            success:false,
            message:'Server Error. Could not update product. ',
            error:error.message
        })
    }
}

const deleteProduct = async(req ,res)=>{
    try{
        const {id} = req.params;
       console.log(id);
        const product = await Product.findById(id);

        if(!product){
            return res.status(404).json({
                success:false,
                message:`Product with ID ${id} not found. `
            });
        }

        if (product.image && product.image.public_id) {
            await deleteFromCloudinary(product.image.public_id);
        }

        await Product.findByIdAndDelete(id);

        const productS= await Product.find({});
        
        res.status(200).json(productS);
    }catch(error){
        console.error("Error deleting product:", error);
        res.status(500).json({
            success: false,
            message: 'Server Error. Could not delete product.',
            error: error.message
        });
    }
}

module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getNewArrivalProducts,
    getSaleProducts,
    getProductByBrand,
    getProductBySearch,
    getProductByPages
};

