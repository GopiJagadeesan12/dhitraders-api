import models from "../../db/models";
import DataBaseService from "../../common/DataBaseService";

export const customerService = new DataBaseService(models.customer);
// Models
const { customer } = models;

export const isCustomerExistByEmail = async (email, callback) => {
    await customer
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
    const customerDetails = await customer.findOne({
        where: { email: email },
    });
    if (!customerDetails) {
        return null;
    }
    return customerDetails;
};
export const getCustomerDetailById = async id => {
    const customerDetails = await customer.findOne({
        where: { id: id },
    });
    if (!customerDetails) {
        return null;
    }
    return customerDetails;
};

export default {
    customerService,
    isCustomerExistByEmail,
    getCustomerDetailByEmail,
    getCustomerDetailById,
};
