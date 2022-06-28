//Service
import { productService } from "./service";

// Common
import { defaultDateFormat, getUserMediaUrl } from "../../common/utils";
import { isInteger } from "../../common/validator";
import { getPortalFromRequest } from "../portal/service";

export default async (req, res) => {
    let { id } = req.query.id;

    const where = {};
    if (isInteger(id)) {
        where.id = id;
    }

    const portalDetail = await getPortalFromRequest(req);
    let portalId = portalDetail && portalDetail.id;

    if (!req.isSuperAdmin && id && req.user && !(req.user.id == id)) {
        res.status(404).send({ message: "Page not found" });
    }

    productService
        .findOne({
            where,
        })
        .then(productDetails => {
            if (!productDetails) {
                return res.status(400).send({ message: "Product not found" });
            }

            const {
                id,
                name,
                product_sku,
                price,
                createdAt,
                updatedAt,
            } = productDetails.get();

            const data = {
                id,
                name: name,
                product_sku: product_sku,
                price,
                avatar,
                avatarUrl: avatar ? getUserMediaUrl(avatar) : "",
                createdAt: defaultDateFormat(createdAt),
                updatedAt: defaultDateFormat(updatedAt),
            };

            res.status(200).send(data);
        })
        .catch(err => res.status(400).send({ message: err.message }));
};
