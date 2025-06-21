import { LeaveRequestStatus } from "../../models";
import axiosInstance from "../axios";
import { CreateLeaveRequestInput, ListLeaveRequestInput, ListLeaveRequestResponse, ListPendingLeaveRequestToReviewInput, ListPendingLeaveRequestToReviewResponse } from "../types/leave-request.types";

export const leaveRequestService = {
  currentUserLeaveRequests: async (params: ListLeaveRequestInput) => {
    const response = await axiosInstance.get<ListLeaveRequestResponse>('/leave-request', {
      params: {
        skip: params.skip,
        take: params.take,
      }
    });

    return response.data;
  },

  createLeaveRequest: async (leaveRequest: CreateLeaveRequestInput) => {
    await axiosInstance.post<CreateLeaveRequestInput>('/leave-request', leaveRequest);
  },

  reviewLeaveRequest: async (leaveRequestId: string, status: LeaveRequestStatus) => {
    await axiosInstance.patch(`/leave-request/${leaveRequestId}`, { status });
  },

  listPendingLeaveRequestToReview: async (params: ListPendingLeaveRequestToReviewInput) => {
    const response = await axiosInstance.get<ListPendingLeaveRequestToReviewResponse>('/leave-request/pending-to-review', {
      params: {
        skip: params.skip,
        take: params.take,
      }
    });

    return response.data;
  },
}
