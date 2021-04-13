const StoreService = require('../services/StoreService')
let upload = require('../middlewares/multer').single('image')

class StoreController {
  constructor(){
  }

  async getStoreWatermark(req,res){
        try {
            const watermark = await StoreService.getStoreWatermark(req.params?.store_id);
            return res.send(watermark);
        } catch (err) {
            return res.status(400).send({ success: false, error:err.message });
        }
    }
  
  async updateStoreWatermark(req, res){
    upload(req, res, async (err)=> {
        try {
            if (err) throw err
            const watermark = await StoreService.updateStoreWatermark(req.params?.store_id, req.file);
            return res.send(watermark);
        } catch (err) {
            return res.status(400).send({ success: false, error: err.message });
        }
    });
  }

  async deleteStoreWatermark(req,res){
        try {
            await StoreService.deleteStoreWatermark(req.params?.store_id);
            return res.status(201).send();
        } catch (err) {
            return res.status(400).send({ success: false, error:err.message });
        }
    }  
 


}

module.exports = new StoreController