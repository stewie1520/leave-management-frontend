import { LeaveRequestStatus } from "./enums";

export interface LeaveRequest {
  id: string;
  employeeId: string;
  startDate: Date;
  endDate: Date;
  reason: string;
  status: LeaveRequestStatus;
  reviewerId?: string;
  reviewedAt?: Date;
  createdAt: Date;
}
