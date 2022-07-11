import { billService, getCustomerProductPriceById } from "./service";
import async from "async";
// Models
import models from "../../db/models";

const { bill_relation } = models;
export default async (req, res, next) => {
    const data = req.body;
    if (!data.customer) {
        return res.status(400).send({ message: "Customer id is required" });
    }

    // Split the product ids
    let productList = [];
    let product;
    if (data.products) {
        product = JSON.parse(data.products);

        if (product) {
            product &&
                product.length > 0 &&
                product.forEach(data => {
                    if (data.description) {
                        productList.push({
                            product_id: data.description,
                            quantity: data.quantity,
                        });
                    }
                });
        }
    }

    // Create data
    const createData = {};

    if (data.customer) {
        createData.customer_id = data && data.customer;
    }

    try {
        await billService.create(createData).then(values => {
            res.on("finish", async () => {
                let bill_id = values && values.id;

                // Get product Ids
                let productId = [];
                if (productList && productList.length > 0) {
                    productList.forEach(productid => {
                        productId.push({
                            productId: productid.product_id,
                            quantity: productid.quantity,
                        });
                    });
                }

                // Create the product bill relations
                if (productId) {
                    await async.eachSeries(productId, async (value, cb) => {
                        const createData = {
                            bill_id: values.id,
                            product_id: value.productId,
                            quantity: value.quantity,
                        };
                        await bill_relation.create(createData);
                        cb();
                    });
                }
            });
        });

        res.status(200).send({ message: "Bill Created Successfully" });
    } catch (err) {
        res.status(400).send(err);
        next(err);
    }
};
