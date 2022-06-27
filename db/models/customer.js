export default (sequelize, DataTypes) => {
    const customer = sequelize.define(
        "customer",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            first_name: DataTypes.STRING,
            last_name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            phone_number: DataTypes.INTEGER,
            avatar: DataTypes.STRING,
            token: DataTypes.STRING,
            role_id: DataTypes.INTEGER,
            password_token: DataTypes.STRING,
            last_loggedin_at: DataTypes.DATE,
        },
        {
            freezeTableName: true,
            paranoid: true,
        }
    );

    return customer;
};
