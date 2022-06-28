"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            const tableDefinition = await queryInterface.describeTable(
                "customer"
            );
            if (tableDefinition && !tableDefinition["address"]) {
                await queryInterface.addColumn("customer", "address", {
                    type: Sequelize.STRING,
                    allowNull: true,
                });
            }
            if (tableDefinition && !tableDefinition["street"]) {
                await queryInterface.addColumn("customer", "street", {
                    type: Sequelize.STRING,
                    allowNull: true,
                });
            }
            if (tableDefinition && !tableDefinition["city"]) {
                await queryInterface.addColumn("customer", "city", {
                    type: Sequelize.STRING,
                    allowNull: true,
                });
            }
            if (tableDefinition && !tableDefinition["state"]) {
                await queryInterface.addColumn("customer", "state", {
                    type: Sequelize.STRING,
                    allowNull: true,
                });
            }
            if (tableDefinition && !tableDefinition["pin_code"]) {
                await queryInterface.addColumn("customer", "pin_code", {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                });
            }
        } catch (err) {
            console.log(err);
        }
    },

    down: async (queryInterface, Sequelize) => {
        try {
            const tableDefinition = await queryInterface.describeTable(
                "customer"
            );

            if (tableDefinition && tableDefinition["address"]) {
                await queryInterface.removeColumn("customer", "address");
            }
            if (tableDefinition && tableDefinition["street"]) {
                await queryInterface.removeColumn("customer", "street");
            }
            if (tableDefinition && tableDefinition["city"]) {
                await queryInterface.removeColumn("customer", "city");
            }
            if (tableDefinition && tableDefinition["state"]) {
                await queryInterface.removeColumn("customer", "state");
            }
            if (tableDefinition && tableDefinition["pin_code"]) {
                await queryInterface.removeColumn("customer", "pin_code");
            }
        } catch (err) {
            console.log(err);
        }
    },
};
