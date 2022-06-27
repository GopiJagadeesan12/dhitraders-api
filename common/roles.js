const roles = (module.exports = {
    USER_ROLE_ID_GUEST: -1,
    USER_ROLE_ID_SUPER_ADMIN: 1,
    USER_ROLE_ID_COMPANY_ADMIN: 2,
    USER_ROLE_ID_COMPANY_USER: 3,
    USER_ROLE_GUEST: "Guest",
    USER_ROLE_SUPER_ADMIN: "Super Admin",
    USER_ROLE_COMPANY_ADMIN: "Company Admin",
    USER_ROLE_COMPANY_USER: "Company User",

    /**
     * Get Role Name By Role
     */
    getRoleNameByRoleId: roleId => {
        if (roleId === roles.USER_ROLE_ID_SUPER_ADMIN) {
            return roles.USER_ROLE_SUPER_ADMIN;
        }
        if (roleId === roles.USER_ROLE_ID_COMPANY_ADMIN) {
            return roles.USER_ROLE_COMPANY_ADMIN;
        }
        if (roleId === roles.USER_ROLE_ID_COMPANY_USER) {
            return roles.USER_ROLE_COMPANY_USER;
        }
        if (roleId === roles.USER_ROLE_ID_GUEST) {
            return roles.USER_ROLE_GUEST;
        }

        return "";
    },
});
