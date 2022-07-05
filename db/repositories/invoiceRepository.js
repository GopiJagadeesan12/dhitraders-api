import models from "../models";
import BaseRepository from "./baseRepository";

// Validator
import { isInteger } from "../../utils/validator";

class InvoiceRepository extends BaseRepository {
    invoiceCustomerQuery(customerId) {
        return {
            "$project.customer_id$": customerId,
        };
    }

    invoiceSearchQuery(query, userRole) {
        let where = { ...query };
        delete where.search;

        if (query.search) {
            const search = this.ilike(query.search);
            const orArray = [
                { ["$project.name$"]: search },
                { description: search },
            ];

            if (userRole === "expert" || userRole === "admin") {
                orArray.push({
                    ["$project.projectCustomer.display_company_name$"]: search,
                });
            }

            if (userRole === "admin") {
                orArray.push({
                    ["$account.company_name$"]: search,
                });
            }

            if (userRole === "customer" || userRole === "admin") {
                const nameSearchArray = query.search.split(" ");
                const andArray = nameSearchArray.map(namePart =>
                    this.or([
                        { ["$expert.first_name$"]: this.ilike(namePart) },
                        { ["$expert.last_name$"]: this.ilike(namePart) },
                    ])
                );

                orArray.push(this.and(andArray));
            }

            if (isInteger(query.search)) {
                orArray.push({
                    id: query.search,
                });
            }

            where = {
                ...where,
                ...this.or(orArray),
            };
        }

        return where;
    }

    invoiceSearchOptions(pagination = {}, order) {
        const include = [
            {
                association: "project",
                attributes: ["id", "name", "customer_id"],
                include: [
                    {
                        association: "projectCustomer",
                        attributes: ["id", "display_company_name"],
                    },
                ],
            },
            {
                association: "expert",
                attributes: ["id", "first_name", "last_name"],
            },
            {
                association: "account",
                attributes: ["id", "company_name"],
            },
        ];

        return {
            include,
            order,
            limit: pagination.pageSize || null,
            offset: ((pagination.page || 1) - 1) * (pagination.pageSize || 1),
        };
    }

    invoiceIncludeCustomer() {
        return {
            include: [
                {
                    association: "project",
                    include: [
                        {
                            association: "projectCustomer",
                        },
                    ],
                },
                {
                    association: "account",
                    include: [
                        {
                            association: "billingInfo",
                        },
                    ],
                },
                {
                    association: "referral",
                    include: [
                        {
                            association: "partner",
                        },
                    ],
                },
            ],
        };
    }
}

module.exports = {
    InvoiceRepository,
    invoiceRepository: new InvoiceRepository(models.invoice),
};
