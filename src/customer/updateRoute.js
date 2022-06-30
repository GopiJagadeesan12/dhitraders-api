// import service
import { customerService } from "./service";

export default async (req, res, next) => {
    const data = req.body;

    // Validate id
    if (!data.id) {
        return res.status(400).send({ message: "Customer id is required" });
    }

    // Update Portal Data
    const updateData = {
        address: data && data.address,
        firstName: data && data.firstName,
        city: data && data.city,
        email: data && data.email,
        phone_number: data && data.phone_number,
        pin_code: data && data.pin_code,
        state: data && data.state,
        street: data && data.street,
    };

    try {
        await customerService.update(updateData, {
            where: { id: data.id },
        });

        res.status(200).send({ message: "Customer details saved successfully" });
    } catch (err) {
        res.status(400).send(err);
        next(err);
    }
};
