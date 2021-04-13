const ProductService = require('../services/ProductService')
let upload = require('../middlewares/multer').single('image')

class ProductController {
  constructor(){
  }

  async getProductImage(req,res){
        try {
            const image = await  ProductService.getProductImage(req.params?.product_id);
            return res.send(image);
        } catch (err) {
            return res.status(400).send({ success: false, error:err.message });
        }
    }
  
  async updateProductImage(req, res){
    upload(req, res, async (err)=> {
        try {
            if (err) throw err
            const image = await  ProductService.updateProductImage(req.params?.product_id, req.file);
            return res.send(image);
        } catch (err) {
            return res.status(400).send({ success: false, error: err.message });
        }
    });
  }

  async deleteProductImage(req,res){
        try {
            await  ProductService.deleteProductImage(req.params?.product_id);
            return res.status(201).send();
        } catch (err) {
            return res.status(400).send({ success: false, error:err.message });
        }
    }  

   async getProductThumbnail(req,res){
    try {
        const thumbnail = await  ProductService.getProductThumbnail(req.params?.product_id);
        return res.send(thumbnail);
    } catch (err) {
        return res.status(400).send({ success: false, error:err.message });
    }
}
}

module.exports = new ProductController