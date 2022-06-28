export function up(queryInterface, Sequelize) {
    console.log("Creating product_relation table");
    return queryInterface.createTable("product_relation", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        customer_id: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        product_id: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        price: {
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
    console.log("Dropping product_relation table");
    return queryInterface.dropTable("product_relation");
}
