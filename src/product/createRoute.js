import { productService } from "./service";

export default async (req, res, next) => {
    const data = req.body;
    const isExist = await productService.findOne({
        where: { name: data.name },
    });
    if (isExist) {
        return res.status(400).send({ message: "Product Name already exist" });
    }

    try {
        const createData = productService.toDbObject(data);
        await productService.create(createData);

        res.status(200).send({ message: "Product Added Successfully" });
    } catch (err) {
        res.status(400).send(err);
        next(err);
    }
};
