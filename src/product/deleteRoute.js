// import service
import { productService } from "./service";

export default async (req, res, next) => {

    const id = parseInt(req.params.id, 10);

    // Validate id
    if (!id) {
        return res.status(400).send({ message: "Product Id is required" });
    }

    try {
        //  Get Product Details
        const productDetails = await productService.findOne({
            attributes: ["id"],
            where: { id },
        });

        // Product Not Found
        if (!productDetails) {
            return res.status(400).send({ message: "Product not found" });
        }

        // Delete The Product Details
        await productDetails.destroy();

        // Success
        res.send({
            message: "Product deleted successfully",
        });
    } catch (err) {
        err => res.status(400).send({ message: err.message });
    }
};
