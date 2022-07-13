export function up(queryInterface, Sequelize) {
    console.log("Creating customer table");
    return queryInterface.createTable("customer", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        phone_number: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        first_name: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        last_name: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        avatar: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        role_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        token: {
            type: Sequelize.STRING,
        },
        last_loggedin_at: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        password_token: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        address: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        street: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        city: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        state: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        pin_code: {
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
    console.log("Dropping customer table");
    return queryInterface.dropTable("customer");
}
