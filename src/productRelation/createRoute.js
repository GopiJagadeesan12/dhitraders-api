import { productRelationService } from "./service";

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

    const createData = {
        customer_id: data.customer_id,
        product_id: data.product_id,
        price: data.price,
    };

    try {
        await productRelationService.create(createData);

        res.status(200).send({ message: "Product Added Successfully" });
    } catch (err) {
        res.status(400).send(err);
        next(err);
    }
};
