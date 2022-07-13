// Common
import { isInteger } from "../../common/validator";
import models from "../../db/models";
const { bill_relation } = models;
export default async (req, res) => {
    let { id } = req.params.id;

    const where = {};
    if (isInteger(id)) {
        where.id = id;
    }

    bill_relation
        .findAll({
            where,
        })
        .then(productDetails => {
            if (!productDetails) {
                return res.status(400).send({ message: "Product not found" });
            }

            let productData = [];
            if (productDetails) {
                productDetails.forEach(data => {
                    productData.push({
                        id: data.id,
                        product_id: data.product_id,
                        product_name: data.product_name,
                        amount: data.amount,
                        bill_id: data.bill_id,
                        quantity: data.quantity,
                    });
                });
            }

            res.status(200).send(productData);
        })
        .catch(err => res.status(400).send({ message: err.message }));
};
