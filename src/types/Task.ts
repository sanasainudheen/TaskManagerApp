export default interface ITaskData {
    taskId?: any | null,
    taskName: string,
    taskDescription: string,
    startDate: string,
    endDate:string,
    isActive?:string
  }