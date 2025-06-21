import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { leaveRequestService } from "../../api/services/leave-request.service";
import { PaginationResponse } from "../../api/types/common.types";
import { CreateLeaveRequestInput, ListPendingLeaveRequestToReviewResponse } from "../../api/types/leave-request.types";
import { LeaveRequest, LeaveRequestStatus } from "../../models";
import { useInvalidateCurrentUserLeaveBalance } from "./leave-balance.hooks";
import { toast } from "sonner";

export const useCurrentUserLeaveRequests = ({
  skip = 0,
  take = 10,
}: {
  skip?: number;
  take?: number;
}) => {
  return useQuery<PaginationResponse<LeaveRequest>>({
    queryKey: ['user', 'leave-requests', skip, take],
    queryFn: () => leaveRequestService.currentUserLeaveRequests({ skip, take })
  })
}

const useInvalidateCurrentUserLeaveRequests = () => {
  const client = useQueryClient()

  return () => {
    client.invalidateQueries({
      queryKey: ['user', 'leave-requests']
    })
  }
}

export const useCreateLeaveRequest = () => {
  const invalidateCurrentUserLeaveRequests = useInvalidateCurrentUserLeaveRequests()
  const invalidateCurrentUserLeaveBalance = useInvalidateCurrentUserLeaveBalance()

  return useMutation({
    mutationFn: (data: CreateLeaveRequestInput) => leaveRequestService.createLeaveRequest(data),
    onSuccess: () => {
      invalidateCurrentUserLeaveRequests()
      invalidateCurrentUserLeaveBalance()
    }
  })
}

export const useReviewLeaveRequest = () => {
  const invalidateCurrentUserLeaveRequests = useInvalidateCurrentUserLeaveRequests()
  const invalidateCurrentUserLeaveBalance = useInvalidateCurrentUserLeaveBalance()
  const invalidatePendingLeaveRequestToReview = useInvalidatePendingLeaveRequestToReview()

  return useMutation({
    mutationFn: (data: { leaveRequestId: string, status: LeaveRequestStatus }) => leaveRequestService.reviewLeaveRequest(data.leaveRequestId, data.status),
    onSuccess: () => {
      toast.success('Leave request reviewed successfully')
      invalidateCurrentUserLeaveRequests()
      invalidateCurrentUserLeaveBalance()
      invalidatePendingLeaveRequestToReview()
    }
  })
}

export const useListPendingLeaveRequestToReview = ({
  skip = 0,
  take = 10,
}: {
  skip?: number;
  take?: number;
}) => {
  return useQuery<ListPendingLeaveRequestToReviewResponse>({
    queryKey: ['user', 'leave-requests', 'pending', skip, take],
    queryFn: () => leaveRequestService.listPendingLeaveRequestToReview({ skip, take })
  })
}

export const useInvalidatePendingLeaveRequestToReview = () => {
  const client = useQueryClient()

  return () => {
    client.invalidateQueries({
      queryKey: ['user', 'leave-requests', 'pending']
    })
  }
}
