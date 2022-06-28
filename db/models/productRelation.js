export default (sequelize, DataTypes) => {
    const product_relation = sequelize.define(
        "product_relation",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            customer_id: DataTypes.STRING,
            product_id: DataTypes.STRING,
            price: DataTypes.STRING,
        },
        {
            freezeTableName: true,
            paranoid: true,
        }
    );

    return product_relation;
};
