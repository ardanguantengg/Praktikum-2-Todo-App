export type ApiTodo = {
  id: number
  todo: string
  completed: boolean
  userId: number
}

export type ApiResponse<T> = {
  success: boolean
  data?: T
  message?: string
}