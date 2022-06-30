// import service
import { productRelationService } from "./service";

export default async (req, res, next) => {
    const data = req.body;

    // Validate id
    if (!data.id) {
        return res.status(400).send({ message: "Relation id is required" });
    }
    // Validate id
    if (!data.customer_id) {
        return res.status(400).send({ message: "Customer id is required" });
    }
    // Validate id
    if (!data.product_id) {
        return res.status(400).send({ message: "Product id is required" });
    }
    // Validate id
    if (!data.price) {
        return res.status(400).send({ message: "Price is required" });
    }

    // Update Product Relation Data
    const updateData = {
        customer_id: data && data.customer_id,
        product_id: data && data.product_id,
        price: data && data.price,
    };

    try {
        await productRelationService.update(updateData, {
            where: { id: data.id },
        });

        res.status(200).send({ message: "Product details saved successfully" });
    } catch (err) {
        res.status(400).send(err);
        next(err);
    }
};
