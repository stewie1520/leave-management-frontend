import { useQuery, useQueryClient } from "@tanstack/react-query"

import leaveBalanceService from "../../api/services/leave-balance.service"
import { LeaveBalance } from "../../models"

export const useCurrentUserLeaveBalance = () => {
  return useQuery<LeaveBalance>({
    queryKey: ['user', 'leave-balance'],
    queryFn: () => leaveBalanceService.currentUserLeaveBalance().then((data) => ({
      totalDays: data.totalDays,
      usedDays: data.usedDays,
    })),
  })
}

export const useInvalidateCurrentUserLeaveBalance = () => {
  const client = useQueryClient()

  return () => {
    client.invalidateQueries({
      queryKey: ['user', 'leave-balance']
    })
  }
}
