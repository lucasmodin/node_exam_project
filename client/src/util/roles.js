export const Roles = {
    ADMIN: "admin",
    SUPERVISOR: "supervisor",
    OPERATOR: "operator"
};

export function hasRole(user, ...allowedRoles) {
    return user && allowedRoles.includes(user.role);
}