import models from "../../db/models";
import DataBaseService from "../../common/DataBaseService";

export const productService = new DataBaseService(models.product);
// Models
const { product } = models;

export const getProductDetailBySku = async email => {
    const productDetails = await product.findOne({
        where: { email: email },
    });
    if (!productDetails) {
        return null;
    }
    return productDetails;
};
export const getProductDetailById = async id => {
    const productDetails = await product.findOne({
        where: { id: id },
    });
    if (!productDetails) {
        return null;
    }
    return productDetails;
};

export default {
    productService,
    getProductDetailBySku,
    getProductDetailById,
};
