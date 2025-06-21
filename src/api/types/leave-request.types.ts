import { LeaveRequest, LeaveRequestStatus } from "../../models";
import { PaginationResponse } from "./common.types";

export interface ListLeaveRequestInput {
  status?: LeaveRequestStatus;
  skip: number;
  take: number;
}

export type ListLeaveRequestResponse = PaginationResponse<LeaveRequest>

export interface CreateLeaveRequestInput {
  startDate: string;
  endDate: string;
  reason: string;
}

export interface ListPendingLeaveRequestToReviewInput {
  skip: number;
  take: number;
}

export type ListPendingLeaveRequestToReviewResponse = PaginationResponse<LeaveRequest & {
  employee: {
    id: string;
    name: string;
  }
}>
