import { getProductDetailById, productRelationService } from "./service";

export default async (req, res, next) => {
    const data = req.body;

    if (!data.product_id) {
        return res.status(400).send({ message: "Product id is required" });
    }
    if (!data.customer_id) {
        return res.status(400).send({ message: "Customer id is required" });
    }

    const isExist = await productRelationService.findOne({
        where: {
            customer_id: data.customer_id,
            product_id: data.product_id,
        },
    });
    if (isExist) {
        return res
            .status(400)
            .send({ message: "Product Relation already exist" });
    }
    let createData;
    if (!data.default_price && !data.price) {
        return res.status(400).send({ message: "Product price is required" });
    }
    
    createData = {
        customer_id: data.customer_id,
        product_id: data.product_id,
    };
    if (data.price && !data.default_price == true) {
        createData.price = data.price;
    } else {
        const defaultPrice = await getProductDetailById(data.product_id);
        createData.price = defaultPrice.price;
    }

    try {
        await productRelationService.create(createData);

        res.status(200).send({ message: "Product Added Successfully" });
    } catch (err) {
        res.status(400).send(err);
        next(err);
    }
};
