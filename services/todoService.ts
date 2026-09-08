import { apiClient } from './api'
import { ApiTodo } from '../types/api-todo'

export async function createTodo(
  todo: string,
  completed = false,
  userId = 1
) {
  return apiClient<ApiTodo>('/todos/add', {
    method: 'POST',
    body: JSON.stringify({
      todo,
      completed,
      userId,
    }),
  })
}

export async function updateTodo(
  id: number,
  completed: boolean
) {
  return apiClient<ApiTodo>(`/todos/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      completed,
    }),
  })
}