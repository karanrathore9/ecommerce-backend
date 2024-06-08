import { ProductServices } from "../Services/products.js";


export const postProduct = async (req, res) => {
    try{
        
        const body ={
            ...req.body,
            fileName: `${req.protocol}://${req.get("host")}/public/uploads/${req.file.filename}`,
        };
        const data = await ProductServices.addProduct(body);
        res.status(200).json({
            ...data,
            code: 200,
        });
    }catch(error){
        res.status(error.output?.statusCode ?? 500).json(error);
    }
}

export const getProduct = async (req, res) => {
    try{
         const query = {
           ...req.query,
         };
        const data = await ProductServices.getProduct(query);
        res.status(200).json({
            ...data,
            code: 200,
        });
    }catch(error){
        res.status(error.output?.statusCode ?? 500).json(error);
    }
}
export const getProductById = async (req, res) => {
    try{
        console.log("Inside wrong route")
        const id = req.params.id;
        const data = await ProductServices.getProductById(id);
        res.status(200).json({
            ...data,
            code: 200,
        });
    }catch(error){
        res.status(error.output?.statusCode ?? 500).json(error);
    }
}

export const updateProductById = async (req, res) => {
    try{
        const id = req.params.id;
        const body = {
            ...req.body,
        };
        const data = await ProductServices.updateProductById(id, body);
        res.status(200).json({
            ...data,
            code: 200,
        });
    }catch(error){
        res.status(error.output?.statusCode ?? 500).json(error);
    }
}

export const deleteProduct = async (req, res) => {
    try{
        const id = req.params.id;
        const data = await ProductServices.deleteProduct(id);
        res.status(200).json({
            ...data,
            code: 200,
        });
    }catch(error){
        res.status(error.output?.statusCode ?? 500).json(error);
    }
}

export const getProductsCount = async (req, res) => {
    try{
        const data = await ProductServices.getProductsCount();
        res.status(200).json({
            ...data,
            code: 200,
        });
    }catch(error){
        res.status(error.output?.statusCode ?? 500).json(error);
    }
}

export const getFeaturedProducts = async (req, res) => {
    try{
        const data = await ProductServices.getFeaturedProducts();
        res.status(200).json({
            ...data,
            code: 200,
        });
    }catch(error){
        res.status(error.output?.statusCode ?? 500).json(error);
    }
}

export const getFeaturedProductByLimit = async (req, res) => {
    try{
        const limit = req.params.limit ? +req.params.list: 0;
        const data = await ProductServices.getFeaturedProductByLimit(limit);
        res.status(200).json({
            ...data,
            code: 200,
        });
    }catch(error){
        res.status(error.output?.statusCode ?? 500).json(error);
    }
}

export const addGallaryImages = async (req, res) => {
    try{
        const id = req.params.id;
        const body = {
            ...req.body,
        };
        let imagePaths = [];
        const files = req.files
        if(files){
            files.map((file)=>{
                imagePaths.push(`${req.protocol}://${req.get("host")}/public/uploads/${file.filename}`)

            })
        }
        const data = await ProductServices.addGallaryImages(id, imagePaths);
        res.status(200).json({
            ...data,
            code: 200,
        });
    }catch(error){
        res.status(error.output?.statusCode ?? 500).json(error);
    }
}