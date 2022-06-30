export default (sequelize, DataTypes) => {
    const product_relation = sequelize.define(
        "product_relation",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            customer_id: DataTypes.INTEGER,
            product_id: DataTypes.INTEGER,
            price: DataTypes.STRING,
        },
        {
            freezeTableName: true,
            paranoid: true,
        }
    );
    product_relation.associate = function(models) {
        product_relation.belongsTo(models.product, {
            as: "productData",
            foreignKey: "product_id",
        });
    };

    return product_relation;
};
