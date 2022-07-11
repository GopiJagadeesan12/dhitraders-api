export default (sequelize, DataTypes) => {
    const bill_relation = sequelize.define(
        "bill_relation",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            product_id: DataTypes.INTEGER,
            bill_id: DataTypes.INTEGER,
            quantity: DataTypes.INTEGER,
        },
        {
            freezeTableName: true,
            paranoid: true,
        }
    );

    return bill_relation;
};
