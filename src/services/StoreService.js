const DB = require('../models/DB_associations');
const fs=require('fs');
const ProductService = require("../services/ProductService")

class StoreService {

   async getStoreWatermark(store_id){
        const store = await DB.Store.findOne({
            where:{
                id:store_id
            }
        });

        if(!store){
            throw new Error('Store Not Found');
        }

        return {watermark:store.watermark_image};
    }

   async updateStoreWatermark(store_id, file){
        const store = await DB.Store.findOne({
            where:{
                id:store_id
            }
        });

        if(!store){
            throw new Error('Store Not Found');
        }
        if(!file){
            throw new Error('Image Not Found');
        }

        if(store.watermark_image){
            fs.unlink(store.watermark_image,function(err){
                if(err)console.error(err)
                console.log('file deleted')
            }) 
        }
        store.watermark_image = file.path;
        await store.save();

        const products = await DB.Product.findAll({
            where:{
                store_id:store.id
            }
        })

        products.forEach(element => {
              ProductService.addWatermarkOnThumbnail(element.id)           
        }); 

        return {watermark:store.watermark_image};
    }

   async deleteStoreWatermark(store_id){
        const store = await DB.Store.findOne({
            where:{ id:store_id }
        });

        if(!store){
            throw new Error('Store Not Found');
        }

        if(store.watermark_image){
            fs.unlink(store.watermark_image,function(err){
                if(err)console.error(err)
                console.log('file deleted')
            }) 
        }

        store.watermark_image = null;
        store.save();
        
    }    
}

module.exports = new StoreService