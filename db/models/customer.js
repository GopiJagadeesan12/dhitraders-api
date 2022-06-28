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
            address: DataTypes.STRING,
            street: DataTypes.STRING,
            city: DataTypes.STRING,
            state: DataTypes.STRING,
            pin_code: DataTypes.INTEGER,
        },
        {
            freezeTableName: true,
            paranoid: true,
        }
    );

    return customer;
};
