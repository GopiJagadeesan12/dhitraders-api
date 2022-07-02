export function up(queryInterface, Sequelize) {
    console.log("Creating bill table");
    return queryInterface.createTable("bill", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        customer_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        product_id: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        createdAt: {
            allowNull: false,
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
}
export function down(queryInterface, Sequelize) {
    console.log("Dropping bill table");
    return queryInterface.dropTable("bill");
}
