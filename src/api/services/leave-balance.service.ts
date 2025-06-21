import axiosInstance from "../axios";
import { LeaveBalanceResponse } from "../types/leave-balance.types";

export const leaveBalanceService = {
  currentUserLeaveBalance: async () => {
    const response = await axiosInstance.get<LeaveBalanceResponse>('/leave-balance');

    return response.data;
  },
}

export default leaveBalanceService;
