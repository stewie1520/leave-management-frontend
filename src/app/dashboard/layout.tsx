'use client'

import { useIsAuthenticated, useLogout } from "@/hooks/api/auth.hooks"
import { useRouter } from "next/navigation"
import { Button } from "../../components/ui/button"
import { LogOutIcon } from "lucide-react"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, status } = useIsAuthenticated()
  const router = useRouter()
  const { mutateAsync: logout } = useLogout();

  if (!isAuthenticated && status === 'success') {
    router.push('/login')
    return;
  }

  if (status === "pending") {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex items-center justify-between p-4">
        <div>
          <p className="text-lg font-bold">Dashboard</p>
        </div>
        <div>
          <Button variant="outline" onClick={() => logout()}>
            <LogOutIcon className="mr-1 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
      {children}
    </div>
  )
}