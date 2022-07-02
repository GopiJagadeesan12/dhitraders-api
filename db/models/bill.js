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
            product_id: DataTypes.STRING,
        },
        {
            freezeTableName: true,
            paranoid: true,
        }
    );
    bill.associate = function(models) {
        bill.belongsTo(models.product, {
            as: "productData",
            foreignKey: "product_id",
        });
    };

    return bill;
};
