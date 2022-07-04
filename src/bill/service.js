import models from "../../db/models";
import DataBaseService from "../../common/DataBaseService";
// Models
const { bill, product } = models;
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

export default {
    billService,
    isCustomerExistByEmail,
    getCustomerDetailByEmail,
    getProductDetailById,
};
