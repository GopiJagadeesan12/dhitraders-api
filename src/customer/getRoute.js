//Service
import { customerService } from "./service";

// Common
import { defaultDateFormat, getUserMediaUrl } from "../../common/utils";
import { getRoleNameByRoleId } from "../../common/roles";
import { isInteger } from "../../common/validator";
import { getPortalFromRequest } from "../portal/service";

export default async (req, res) => {
    let { id } = req.query;
    if (!id) {
        id = req.params.id;
    }
    const where = {};
    if (isInteger(id)) {
        where.id = id;
    }

    const portalDetail = await getPortalFromRequest(req);
    let portalId = portalDetail && portalDetail.id;

    if (!req.isSuperAdmin && id && req.user && !(req.user.id == id)) {
        res.status(404).send({ message: "Page not found" });
    }

    customerService
        .findOne({
            where,
        })
        .then(userDetails => {
            if (!userDetails) {
                return res.status(400).send({ message: "User not found" });
            }

            const {
                id,
                first_name,
                phone_number,
                role_id,
                avatar,
                last_loggedin_at,
                createdAt,
                updatedAt,
                // address,
                city,
                pin_code,
                state,
                street,
            } = userDetails.get();

            const data = {
                id,
                firstName: first_name,
                phone_number,
                roleId: role_id,
                roleName: role_id && getRoleNameByRoleId(parseInt(role_id, 10)),
                avatar,
                // address,
                city,
                pin_code,
                state,
                street,
                avatarUrl: avatar ? getUserMediaUrl(avatar) : "",
                portalId: portalId,
                lastLoggedinAt: defaultDateFormat(last_loggedin_at),
                createdAt: defaultDateFormat(createdAt),
                updatedAt: defaultDateFormat(updatedAt),
            };

            res.status(200).send(data);
        })
        .catch(err => res.status(400).send({ message: err.message }));
};
