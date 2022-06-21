"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("books", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            s_no: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            account_number: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            book_title: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            author: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            cost: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            rack: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: true,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: true,
                type: Sequelize.DATE,
            },
            deletedAt: {
                allowNull: true,
                type: Sequelize.DATE,
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("books");
    },
};
