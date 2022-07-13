import models from "../../db/models";
import DataBaseService from "../../common/DataBaseService";
// Models
const { bill, product, product_relation, bill_relation } = models;
export const billService = new DataBaseService(models.bill);

export const isCustomerExistByEmail = async (email, callback) => {
    await bill
        .findAll({
            attributes: ["id", "email"],
        })
        .then(async userList => {
            let customerEmail = "";
            await userList.forEach(customerDetails => {
                if (
                    customerDetails.email.toLowerCase().trim() ===
                    email.toLowerCase().trim()
                ) {
                    customerEmail = customerDetails.email;
                }
            });

            if (customerEmail) {
                return callback(true, customerEmail);
            } else {
                return callback(false, "");
            }
        });
};
export const getCustomerDetailByEmail = async email => {
    const customerDetails = await bill.findOne({
        where: { email: email },
    });
    if (!customerDetails) {
        return null;
    }
    return customerDetails;
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

export const getCustomerProductPriceById = async (product_id, customer_id) => {
    const customerProductDetails = await product_relation.findOne({
        where: { product_id: product_id, customer_id: customer_id },
    });
    if (!customerProductDetails) {
        return null;
    }
    return customerProductDetails.price;
};


export const getProductNameById = async (product_id) => {
    const ProductDetails = await product.findOne({
        where: { id: product_id },
    });
    if (!ProductDetails) {
        return null;
    }
    return ProductDetails.name;
};

export default {
    billService,
    isCustomerExistByEmail,
    getCustomerDetailByEmail,
    getCustomerProductPriceById,
    getProductDetailById,
};
