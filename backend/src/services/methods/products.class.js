import {Products} from '../models/products.js';


export class Product{
    static async addProduct(data){
        const newProduct = new Products(data);
        await newProduct.save()
        return newProduct;
    }
    static async modifyProduct(id,data){
        return Products.findByIdAndUpdate(id, data, {new:true});
    }
    static async getOneProduct(id){
        return Products.findById(id);
    }
    static async deleteProducts(id){
        return Products.findByIdAndDelete(id); 
    }
    static async allProducts(){
        return Products.find();
    }
    static async getProduct(id){
        return Products.findById(id);
    }
    static async avgProduct(){
        return Products.aggregate([
            {
                $group: {
                    _id: null,
                    averagePrice: { $avg: '$price' }
                }
            }
        ]);
    }
    static async avgMargin(){
        return Products.aggregate([
            {
                $group: {
                    _id: null,
                    averageMargin: { $avg: { $subtract: ['$price', { $ifNull: ['$cost', 0] }] } }
                }
            }
        ]);
    }
    static async lowProduct(){
        return Products.find({ stock: { $lt: 10 } });
    }
    static async categoryDistribution(){
        return Products.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } }
        ]);
    }
}