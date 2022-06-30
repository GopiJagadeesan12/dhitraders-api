// import service
import { customerService } from "./service";

export default async (req, res, next) => {
    const id = parseInt(req.params.id, 10);

    // Validate id
    if (!id) {
        return res.status(400).send({ message: "Customer Id is required" });
    }

    try {
        //  Get Book Details
        const productRelationDetails = await customerService.findOne({
            attributes: ["id"],
            where: { id },
        });

        // Book Not Found
        if (!productRelationDetails) {
            return res.status(400).send({ message: "Customer not found" });
        }

        // Delete The Book Details
        await productRelationDetails.destroy();

        // Success
        res.send({
            message: "Customer deleted successfully",
        });
    } catch (err) {
        err => res.status(400).send({ message: err.message });
    }
};
