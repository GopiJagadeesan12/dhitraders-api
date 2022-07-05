import { Op } from "sequelize";
import { snakeCase, camelCase } from "change-case";

class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    or(values) {
        return { [Op.or]: values };
    }

    and(values) {
        return { [Op.and]: values };
    }

    not(value) {
        return { [Op.not]: value };
    }

    notIn(values) {
        return { [Op.notIn]: values };
    }

    gt(value) {
        return { [Op.gt]: value };
    }

    lt(value) {
        return { [Op.lt]: value };
    }

    gte(value) {
        return { [Op.gte]: value };
    }

    lte(value) {
        return { [Op.lte]: value };
    }

    like(value) {
        return { [Op.like]: `%${value}%` };
    }

    ilike(value) {
        return { [Op.iLike]: `%${value}%` };
    }

    toDbObject(object) {
        const dbObject = {};

        Object.keys(object).forEach(key => {
            if (typeof object[key] === Object) {
                dbObject[snakeCase(key)] = this.toDbObject(object[key]);
            } else {
                dbObject[snakeCase(key)] = object[key];
            }
        });

        return dbObject;
    }

    toResponseObject(object) {
        const responseObject = {};

        Object.keys(object).forEach(key => {
            if (typeof object[key] === "object") {
                responseObject[camelCase(key)] = this.toResponseObject(
                    object[key]
                );
            } else {
                responseObject[camelCase(key)] = object[key];
            }
        });

        return responseObject;
    }

    async findById(id, options) {
        try {
            return this.model.findOne({
                where: { id },
                ...options,
            });
        } catch (err) {
            throw err;
        }
    }

    async findOne(query, options) {
        try {
            return this.model.findOne({
                where: query,
                ...options,
            });
        } catch (err) {
            throw err;
        }
    }

    async find(query, options) {
        try {
            return this.model.findAll({
                where: query,
                ...options,
            });
        } catch (err) {
            throw err;
        }
    }

    async findAndCount(query, options) {
        try {
            return this.model.findAndCountAll({
                where: query,
                ...options,
            });
        } catch (err) {
            throw err;
        }
    }

    async create(data, options) {
        try {
            return this.model.create(data, options);
        } catch (err) {
            throw err;
        }
    }

    async updateById(id, data, options) {
        try {
            const entity = await this.findById(id);

            if (!entity) {
                return null;
            }

            await entity.update(data, options);
            return entity.reload();
        } catch (err) {
            throw err;
        }
    }

    async updateOne(query, data, options) {
        try {
            const entity = await this.findOne(query);

            if (!entity) {
                return null;
            }

            await entity.update(data, options);
            return entity.reload();
        } catch (err) {
            throw err;
        }
    }

    async update(query, data, options) {
        try {
            return this.model.update(data, {
                where: query,
                ...options,
            });
        } catch (err) {
            throw err;
        }
    }

    async deleteById(id, options) {
        try {
            const entity = await this.findById(id);

            if (!entity) {
                return null;
            }

            await entity.destroy(options);
            return id;
        } catch (err) {
            throw err;
        }
    }

    async delete(query, options) {
        try {
            return this.model.destroy({
                where: query,
                ...options,
            });
        } catch (err) {
            throw err;
        }
    }
}

module.exports = BaseRepository;
