import {Product} from '../services/methods/products.class.js';


const getProducts = async (req,res)=>{
    try {
        const products = await Product.allProducts()
        if(!products){
            res.status(404).json({message:'Error al obtener productos'});
            return;
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message:'Error interno del servidor: ' + error});
    }
}

const getProduct = async(req,res)=>{
    try{
        const id = req.params.id;
        const product = await Product.getOneProduct(id);
        if(!product){
            res.status(404).json({message:'Producto inválido o no encontrado'});
            return;
        }
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message:'Error interno del servidor: ' + error});
    }
}

const addProduct = async(req,res)=>{
    try {
        const data = req.body;
        const newProduct = await Product.addProduct(data);
        if(!newProduct){
            res.status(404).json({message:'Error al añadir productos'});
            return;
        }
        res.status(201).json({message:'Agregado con éxito: ' + newProduct});
    } catch (error) {
        res.status(500).json({message:'Error interno de servidor: ' + error});
    }
}

const updateProduct = async(req,res)=>{
    try {
        const data = req.body;
        const id = req.params.id;
        const updateProduct = await Product.modifyProduct(id,data);
        if(!updateProduct){
            res.status(404).json({message:'Error al modificar el producto'});
            return;
        }
        res.status(200).json({message:'Modificado con éxito: ' + updateProduct});
    } catch (error) {
        res.status(500).json({message:'Error interno del servidor: ' + error});
    }
}

const deleteProduct = async(req,res)=>{
    try {
        const id = req.params.id;
        const deleteProduct = await Product.deleteProducts(id);
        if(!deleteProduct){
            res.status(404).json({message:'Error al eliminar producto'});
            return;
        }
        res.status(200).json({message:'Eliminado con éxito.'})
    } catch (error) {
        res.status(500).json({message:'Error interno del servidor: ' + error});
    }
}

const avgProduct = async(req,res)=>{
    try {
        const avgPrice = await Product.avgProduct();
        if(!avgPrice){
            res.status(404).json({message:'No se puede sacar el promedio de productos'});
            return;
        }
        res.status(200).json({avgPrice: avgPrice[0]?.averagePrice || 0});
    } catch (error) {
        res.status(500).json({message:'Error interno de servidor: ' + error});
    }
}

const avgMargin = async(req,res)=>{
    try {
        const avgMargin = await Product.avgMargin();
        if(!avgMargin){
            res.status(404).json({message:'Sin datos para sacar margen promedio'});
            return;
        }
        res.status(200).json({avgMargin: avgMargin[0]?.averageMargin || 0});
    } catch (error) {
        res.status(500).json({message:'Error interno de servidor: ' + error});
    }
}

const lowStockProducts = async (req, res) => {
    try {
        const lowStock = await Product.lowProduct(); 
        if (lowStock.length === 0) {
            res.status(404).json({ message: 'No hay productos con stock bajo.' });
            return;
        }
        res.status(200).json(lowStock);
    } catch (error) {
        res.status(500).json({ message: 'Error interno de servidor: ' + error });
    }
};

const categoryDistribution = async (req, res) => {
    try {
        const categories = await Product.categoryDistribution();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error interno de servidor: ' + error });
    }
};
 


export {
    getProducts,
    updateProduct,
    addProduct,
    deleteProduct,
    avgProduct,
    avgMargin,
    lowStockProducts,
    categoryDistribution,
    getProduct
}