export function up(queryInterface, Sequelize) {
    console.log("Creating bill relation table");
    return queryInterface.createTable("bill_relation", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        bill_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        product_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        product_name: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        amount: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        quantity: {
            type: Sequelize.INTEGER,
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
    console.log("Dropping bill relation table");
    return queryInterface.dropTable("bill_relation");
}
