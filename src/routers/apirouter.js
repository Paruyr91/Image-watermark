const express = require("express");
const router = express.Router();
const { getStoreWatermark, updateStoreWatermark, deleteStoreWatermark } = require("../controllers/StoreController");
const { getProductImage, updateProductImage, deleteProductImage, getProductThumbnail } = require("../controllers/ProductController");


router.get("/store/:store_id/watermark", getStoreWatermark);
router.post("/store/:store_id/watermark", updateStoreWatermark);
router.delete("/store/:store_id/watermark", deleteStoreWatermark);

router.get("/product/:product_id/image", getProductImage);
router.post("/product/:product_id/image", updateProductImage);
router.delete("/product/:product_id/image", deleteProductImage);
router.get("/product/:product_id/thumbnail", getProductThumbnail);


module.exports = router   