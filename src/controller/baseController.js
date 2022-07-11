class BaseController {
    constructor(service) {
        this.service = service;
    }

    getPagination(req) {
        if (req.query.pagination) {
            return {
                page: req.query.search ? 1 : parseInt(req.query.page, 10),
                pageSize: parseInt(req.query.pageSize, 10),
            };
        }

        return {};
    }

    getSortOrder(req) {
        if (req.query.sort) {
            return [
                ...req.query.sort
                    .split(",")
                    .map(sortParam => [
                        ...sortParam.split("."),
                        req.query.sortDir || "ASC",
                    ]),
            ];
        }

        return [];
    }
}

module.exports = BaseController;
