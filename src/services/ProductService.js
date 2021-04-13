const DB = require('../models/DB_associations');
const fs=require('fs');
const Jimp = require('jimp')

class ProductService {

   async getProductImage(product_id){
        const product = await DB.Product.findOne({
            where:{
                id:product_id
            }
        });

        if(!product){
            throw new Error('Product Not Found');
        }

        return {image:product.image};
    }

   async updateProductImage(product_id, file){
        const product = await DB.Product.findOne({
            where:{ id:product_id }
        });

        if(!product){
            fs.unlink(file.path, (err) => {
                if(err)console.error(err);
            }) 
            throw new Error('Product Not Found');
        }
        if(!file){
            throw new Error('Image Not Found');
        }
        if(product.image){
            fs.unlink(product.image, (err) =>{
                if(err)console.error(err);
            }); 
        }
        if(product.thumbnail){
            fs.unlink(product.thumbnail, (err) =>{
                if(err)console.error(err);
            }); 
        }
        const thumbnail = file.destination + '/thumbnail-' + file.filename
        await Jimp.read(file.path)
            .then(lenna => {
                 return lenna
                   .cover(512, 512)
                   .quality(60)
                   .write(thumbnail);
            })
            .catch(err => {
                console.error(err);
            });

        product.thumbnail = thumbnail
        product.image = file.path;
        await product.save()
        this.addWatermarkOnThumbnail(product.id)

        return {image:product.image};
    }

   async deleteProductImage(product_id){
        const product = await DB.Product.findOne({
            where:{
                id:product_id
            }
        });
        if(!product){
            throw new Error('Store Not Found');
        }
        if(product.image){
            fs.unlink(product.image, (err) => {
                if(err)console.error(err)
            }) 
        }
        product.image = null;
        product.save();
    } 
    
    async getProductThumbnail(product_id){
        const product = await DB.Product.findOne({
            where:{ id:product_id }
        });

        if(!product){
            throw new Error('Product Not Found');
        }

        return { thumbnail:product.thumbnail };
    }
    
    async addWatermarkOnThumbnail(product_id){
        const product = await DB.Product.findOne({
            where:{ id:product_id },
            include: [{
                required:true,
                model:DB.Store 
              }]
        });
        const logo = product.store?.watermark_image

        if(product.thumbnail && logo){
            let imgActive = product.thumbnail;
            Jimp.read(product.image)
                .then((tpl) => tpl.cover(512, 512).clone().write(imgActive))
                .then(() => Jimp.read(imgActive))
                .then((tpl) =>
                    Jimp.read(logo).then((logoTpl) => {
                        logoTpl.cover(51, 51).opacity(0.8)
                        return tpl.composite(logoTpl, 10 ,10)
                    }),
                )
                .then((tpl) => tpl.write(product.thumbnail))
                .catch(err => {
                    console.error(err);
                });
        }
    }
}

module.exports = new ProductService