export enum LeaveRequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export function getLeaveRequestStatusColor(status: LeaveRequestStatus) {
  switch (status) {
    case LeaveRequestStatus.APPROVED:
      return "bg-green-100 text-green-800 hover:bg-green-100"
    case LeaveRequestStatus.PENDING:
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
    case LeaveRequestStatus.REJECTED:
      return "bg-red-100 text-red-800 hover:bg-red-100"
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100"
  }
}