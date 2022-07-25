export default (sequelize, DataTypes) => {
    const product = sequelize.define(
        "product",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: DataTypes.STRING,
            image: DataTypes.STRING,
            product_sku: DataTypes.STRING,
            price: DataTypes.STRING,
        },
        {
            freezeTableName: true,
            paranoid: true,
        }
    );

    return product;
};
