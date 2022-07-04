import { getProductDetailById, billService } from "./service";
import async from "async";
export default async (req, res, next) => {
    const data = req.body;
    if (!data.customer) {
        return res.status(400).send({ message: "Customer id is required" });
    }

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
                const productIds = values.product_id.split(",");
                
                let id = [];
                if (productIds && productIds.length > 0) {
                    productIds.forEach(productId => {
                        console.log("Product idv----->", productId);
                        id.push({
                            id: productId.id,
                        });
                    });
                }
                if (id) {
                    console.log("id ----->", id);
                    await async.eachSeries(id, async (value, cb) => {
                        console.log("value ---=>", id);
                        const billAmount = await billService.findOne(
                            {
                                attributes: ["id"],
                                where: { id: id },
                            }
                        );
                        console.log("billAmount =======>", billAmount);
                        // Create Permission Data
                        let createData = {
                            tracker_project_id: tracker_id,
                            project_id: tracker_id,
                            company_id: portalDetails.company_id,
                        };
                        // Update data if permission details exists
                        if (billAmount) {
                            await billAmount
                                .update(createData)
                                .then(() => {
                                    cb();
                                });
                        }
                    });
                }
            });
        });

        res.status(200).send({ message: "Product Added Successfully" });
    } catch (err) {
        res.status(400).send(err);
        next(err);
    }
};
