import { EmployeeRole } from "../../models";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  value: string;
  expiresAt: Date;
  accountId: string;
}

export interface EmployeeResponse {
  id: string;
  name: string;
  role: EmployeeRole;
  accountId: string;
}
