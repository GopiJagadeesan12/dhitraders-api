import models from "../../db/models";
import DataBaseService from "../../common/DataBaseService";

export const productRelationService = new DataBaseService(models.product_relation);
// Models
const { product_relation, product } = models;

export const isCustomerExistByEmail = async (email, callback) => {
    await product_relation
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
    const customerDetails = await product_relation.findOne({
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

export default {
    productRelationService,
    isCustomerExistByEmail,
    getCustomerDetailByEmail,
    getProductDetailById,
};
