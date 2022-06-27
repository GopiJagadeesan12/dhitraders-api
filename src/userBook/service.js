import models from "../../db/models";
import DataBaseService from "../../common/DataBaseService";

export const userBookService = new DataBaseService(models.user_book);

export const isBookExist = async (book, id) => {
    if (!book) {
        return null;
    }
    let where = {};
    if (id) {
        const ids = [id];
        where.id = { $notIn: ids };
    }
    where.book_title = book;
    const isBookExist = await userBookService.findOne({
        where: where,
    });
    return isBookExist;
};

export const isNameExist = async (name, id) => {
    if (!name) {
        return null;
    }
    let where = {};
    if (id) {
        const ids = [id];
        where.id = { $notIn: ids };
    }
    where.author = name;
    const isNameExist = await userBookService.findOne({
        where: where,
    });
    return isNameExist;
};

export default {
    userBookService,
    isBookExist,
    isNameExist,
    // getPortalFromRequest,
};
