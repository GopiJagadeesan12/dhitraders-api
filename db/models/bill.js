export default (sequelize, DataTypes) => {
    const bill = sequelize.define(
        "bill",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            customer_id: DataTypes.INTEGER,
            total_amount: DataTypes.STRING,
            amount_paid: DataTypes.STRING,
            due_amount: DataTypes.STRING,
            status: DataTypes.STRING,
        },
        {
            freezeTableName: true,
            paranoid: true,
        }
    );
    bill.associate = function(models) {
        bill.belongsTo(models.customer, {
            as: "customerData",
            foreignKey: "customer_id",
        });
    };

    return bill;
};
