import { EmployeeRole } from "./enums";

export interface Employee {
  id: string;
  name: string;
  role: EmployeeRole;
  accountId: string;
}
