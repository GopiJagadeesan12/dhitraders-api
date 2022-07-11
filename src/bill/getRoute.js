//Service
import { billService } from "./service";

// Common
import { defaultDateFormat, getUserMediaUrl } from "../../common/utils";
import { getRoleNameByRoleId } from "../../common/roles";
import { isInteger } from "../../common/validator";
import { getPortalFromRequest } from "../portal/service";

export default async (req, res) => {
    let { id } = req.query;

    const where = {};
    if (isInteger(id)) {
        where.id = id;
    }

    const portalDetail = await getPortalFromRequest(req);
    let portalId = portalDetail && portalDetail.id;

    if (!req.isSuperAdmin && id && req.user && !(req.user.id == id)) {
        res.status(404).send({ message: "Page not found" });
    }

    billService
        .findOne({
            where,
        })
        .then(userDetails => {
            if (!userDetails) {
                return res.status(400).send({ message: "Product not found" });
            }

            const {
                id,
                customer_id,
                price,
                createdAt,
                updatedAt,
            } = userDetails.get();

            const data = {
                id,
                customer_id,
                price,
                createdAt: defaultDateFormat(createdAt),
                updatedAt: defaultDateFormat(updatedAt),
            };

            res.status(200).send(data);
        })
        .catch(err => res.status(400).send({ message: err.message }));
};
