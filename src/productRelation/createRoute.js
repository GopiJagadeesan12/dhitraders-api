import { productRelationService } from "./service";

export default async (req, res, next) => {
    const data = req.body;
    console.log("data ------>", data);
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
