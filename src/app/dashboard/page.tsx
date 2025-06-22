"use client"


import { CalendarDays, Clock, User } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useIsAuthenticated } from "../../hooks/api/auth.hooks"
import { useCurrentUserLeaveBalance } from "../../hooks/api/leave-balance.hooks"
import { EmployeeRole, getEmployeeRoleColor } from "../../models"
import { TableMyLeaveRequests } from "./_components/table-my-leave-requests"
import { TablePendingLeaveRequestsToReview } from "./_components/table-pending-leave-requests-to-review"
import { DialogCreateLeaveRequest } from "./_components/dialog-create-leave-request"

export default function EmployeeDashboard() {
  const { user } = useIsAuthenticated()
  const { data: leaveBalance } = useCurrentUserLeaveBalance()
  const remainingDays = leaveBalance ? (leaveBalance.totalDays - leaveBalance.usedDays) : 0

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Leave Management</h1>
            <p className="text-gray-600">Manage your leave requests and view your leave balance</p>
          </div>
          <DialogCreateLeaveRequest />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Employee Info</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.name}</div>
              <div className="mt-2">
                <Badge className={getEmployeeRoleColor(user.role)}>{user.role}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Leave Days</CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{leaveBalance?.totalDays}</div>
              <p className="text-xs text-muted-foreground">Annual allocation</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Remaining Days</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{remainingDays}</div>
              <p className="text-xs text-muted-foreground">{leaveBalance?.usedDays} days used</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Leave Requests</CardTitle>
            <CardDescription>View and track your leave request history</CardDescription>
          </CardHeader>
          <CardContent>
            <TableMyLeaveRequests />
          </CardContent>
        </Card>

        {
          user.role === EmployeeRole.MANAGER && (
            <Card>
              <CardHeader>
                <CardTitle>Review Leave Requests</CardTitle>
                <CardDescription>Review and approve leave requests</CardDescription>
              </CardHeader>
              <CardContent>
                <TablePendingLeaveRequestsToReview />
              </CardContent>
            </Card>
          )
        }
      </div>
    </div>
  )
}
