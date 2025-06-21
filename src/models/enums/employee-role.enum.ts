export enum EmployeeRole {
  STAFF = 'STAFF',
  MANAGER = 'MANAGER',
}

export function getEmployeeRoleColor(role: EmployeeRole) {
  switch (role) {
    case EmployeeRole.MANAGER:
      return "bg-blue-100 text-blue-800 hover:bg-blue-100"
    case EmployeeRole.STAFF:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100"
  }
}
