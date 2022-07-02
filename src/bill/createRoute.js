import { getProductDetailById, billService } from "./service";

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
                    if (data.name) {
                        productList.push(data.name);
                    }
                });
        }
    }
    let createData = {};

    if (productList) {
        createData.labels = productList && productList.join(", ");
    }
    if (data.customer) {
        createData.customer = data && data.customer;
    }

    try {
        await billService.create(createData);

        res.status(200).send({ message: "Product Added Successfully" });
    } catch (err) {
        res.status(400).send(err);
        next(err);
    }
};
