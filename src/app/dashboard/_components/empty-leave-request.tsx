export const EmptyLeaveRequest = () => {
  return (
    <div className="flex items-center justify-center flex-col gap-6">
      <img draggable={false} src="/empty.svg" alt="Empty" width={300} height={300} />
      <p className="text-center text-muted-foreground">
        You have no leave requests yet.
      </p>
    </div>
  )
}
