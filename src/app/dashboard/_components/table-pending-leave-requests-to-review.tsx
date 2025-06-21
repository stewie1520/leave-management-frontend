import { Check, X } from "lucide-react"
import { useState } from "react"
import { Badge } from "../../../components/ui/badge"
import { Button } from "../../../components/ui/button"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import { useListPendingLeaveRequestToReview, useReviewLeaveRequest } from "../../../hooks/api/leave-request.hooks"
import { getLeaveRequestStatusColor, LeaveRequestStatus } from "../../../models"
import { EmptyLeaveRequest } from "./empty-leave-request"

export const TablePendingLeaveRequestsToReview = () => {
  const [skip, setSkip] = useState(0)

  const { data: leaveRequestsResponse } = useListPendingLeaveRequestToReview({ skip })
  const leaveRequests = leaveRequestsResponse?.items ?? [];

  const { mutateAsync: reviewLeaveRequest } = useReviewLeaveRequest()

  if (leaveRequests.length === 0) {
    return <EmptyLeaveRequest />
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Request ID</TableHead>
          <TableHead>Employee Name</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>End Date</TableHead>
          <TableHead>Reason</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leaveRequests.map((request) => (
          <TableRow key={request.id}>
            <TableCell className="font-mono text-sm">{request.id.substring(0, 8)}...</TableCell>
            <TableCell>{request.employee.name}</TableCell>
            <TableCell>{new Date(request.startDate).toLocaleDateString()}</TableCell>
            <TableCell>{new Date(request.endDate).toLocaleDateString()}</TableCell>
            <TableCell className="max-w-xs truncate">{request.reason}</TableCell>
            <TableCell>
              <Badge className={getLeaveRequestStatusColor(request.status)}>{request.status}</Badge>
            </TableCell>
            <TableCell>
              <Button variant="outline" className="mr-2" onClick={() => reviewLeaveRequest({ leaveRequestId: request.id, status: LeaveRequestStatus.APPROVED })}>
                <Check className="text-green-500" />
              </Button>
              <Button variant="outline" onClick={() => reviewLeaveRequest({ leaveRequestId: request.id, status: LeaveRequestStatus.REJECTED })}>
                <X className="text-red-500"/>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableHead colSpan={7} className="text-center">
            <Button variant="outline" onClick={() => setSkip(skip - 1)} disabled={skip === 0}>
              Previous
            </Button>
            <Button variant="outline" onClick={() => setSkip(skip + 1)} disabled={skip === (leaveRequestsResponse?.totalPage ?? 0) - 1}>
              Next
            </Button>
          </TableHead>
        </TableRow>
      </TableFooter>
    </Table>
  )
}