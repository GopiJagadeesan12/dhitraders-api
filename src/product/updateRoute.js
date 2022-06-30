// import service
import { productService } from "./service";

export default async (req, res, next) => {
    const data = req.body;

    // Validate id
    if (!data.id) {
        return res.status(400).send({ message: "Product id is required" });
    }

    // Update Portal Data
    const updateData = productService.toDbObject(data);

    try {
        await productService.update(updateData, {
            where: { id: data.id },
        });

        res.status(200).send({ message: "Product saved successfully" });
    } catch (err) {
        res.status(400).send(err);
        next(err);
    }
};
