import { billService, getCustomerProductPriceById } from "./service";
import async from "async";
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
                    if (data.id) {
                        productList.push(data.id);
                    }
                });
        }
    }

    // Create data
    const createData = {};
    if (productList) {
        createData.product_id = productList && productList.join(", ");
    }
    if (data.customer) {
        createData.customer_id = data && data.customer;
    }

    try {
        await billService.create(createData).then(values => {
            res.on("finish", async () => {
                let bill_id = values && values.id;
                const productIds = values.product_id.split(",");

                // Get product Ids
                let id = [];
                if (productIds && productIds.length > 0) {
                    productIds.forEach(productId => {
                        id.push({
                            id: productId,
                        });
                    });
                }

                // Get the price details
                let price = [];
                if (id) {
                    await async.eachSeries(id, async (value, cb) => {
                        const productDetails = await getCustomerProductPriceById(
                            value.id,
                            data.customer
                        );
                        price.push(productDetails);
                        cb();
                    });
                }

                // Add the product price
                let value = 0;
                price.forEach(data => {
                    value = value + parseInt(data);
                });
                //Update price in db
                const updateData = {
                    total_amount: value ? value : "",
                };
                await billService.update(updateData, {
                    where: { id: bill_id },
                });
            });
        });

        res.status(200).send({ message: "Bill Created Successfully" });
    } catch (err) {
        res.status(400).send(err);
        next(err);
    }
};
