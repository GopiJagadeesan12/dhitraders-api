import { getHashPassword, defaultDateFormat } from "../../common/utils";
import { customerService } from "./service";

export default async (req, res, next) => {
    const data = req.body;

    const isEmail = await customerService.findOne({
        where: { email: data.email },
    });
    if (isEmail) {
        return res.status(400).send({ message: "Email already exist" });
    }
    data.role_id = 2;

    try {
        await getHashPassword(
            "Password01*",
            async (err, password, hashPassword) => {
                data.password = hashPassword;
                const createData = customerService.toDbObject(data);
                await customerService.create(createData);
            }
        );
        res.status(200).send({ message: "Customer Added Successfully" });
    } catch (err) {
        res.status(400).send(err);
        next(err);
    }
};
