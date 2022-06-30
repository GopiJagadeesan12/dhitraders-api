// import service
import { productRelationService } from "./service";

export default async (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    // Validate id
    if (!id) {
        return res.status(400).send({ message: "Relation is required" });
    }

    try {
        //  Get Book Details
        const productRelationDetails = await productRelationService.findOne({
            attributes: ["id"],
            where: { id },
        });

        // Book Not Found
        if (!productRelationDetails) {
            return res.status(400).send({ message: "Product Relation not found" });
        }

        // Delete The Book Details
        await productRelationDetails.destroy();

        // Success
        res.send({
            message: "Product Relation deleted successfully",
        });
    } catch (err) {
        err => res.status(400).send({ message: err.message });
    }
};
