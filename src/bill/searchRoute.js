import { defaultDateFormat } from "../../common/utils";
import { billService } from "./service";
import model from "../../db/models";

const { customer } = model;

export default async (req, res, next) => {
    let { page, pageSize, search, sort, sortDir, pagination } = req.query;
    // Validate if page is not a number
    page = page ? parseInt(page, 10) : 1;
    if (isNaN(page)) {
        return res.status(400).send({ message: "Invalid page" });
    }

    // Validate if page size is not a number
    pageSize = pageSize ? parseInt(pageSize, 10) : 10;
    if (isNaN(pageSize)) {
        return res.status(400).send({ message: "Invalid page size" });
    }

    const validOrder = ["ASC", "DESC"];

    const sortDirParam = sortDir ? sortDir.toUpperCase() : "ASC";
    // Validate order is present in sortDir param
    if (!validOrder.includes(sortDirParam)) {
        return res.status(400).send({ message: "Invalid sort order" });
    }

    const where = {};
    // Search by term
    const searchTerm = search ? search.trim() : null;
    if (searchTerm) {
        where.$or = [
            {
                product_id: {
                    $ilike: `%${searchTerm}%`,
                },
            },
        ];
    }
    where.customer_id = req.params.id;

    const query = {
        // order: [[sortParam, sortDirParam]],
        // where,
        attributes: { exclude: ["deletedAt"] },
        include: [
            {
                model: customer,
                as: "customerData",
            },
        ],
    };

    if (pagination) {
        if (pageSize > 0) {
            query.limit = pageSize;
            query.offset = (page - 1) * pageSize;
        }
    }
    // Get list and count
    billService
        .findAndCount(query)
        .then(async results => {
            // Return null
            if (results.count === 0) {
                return res.status(200).send(null);
            }
            const data = [];
            await results.rows.forEach(async billData => {
                data.push({
                    id: billData.id,
                    customer_id: billData.customer_id,
                    product_id: billData.product_id,
                    customer:
                        billData &&
                        billData.customerData &&
                        billData.customerData.first_name,
                    createdAt: defaultDateFormat(billData.createdAt),
                    updatedAt: defaultDateFormat(billData.updatedAt),
                });
            });
            res.send({
                totalCount: results.count,
                currentPage: page,
                pageSize,
                data,
            });
        })
        .catch(err => {
            next(err);
        });
};
