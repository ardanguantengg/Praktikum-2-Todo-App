import { ApiTodo } from '../types/api-todo'

export type Task = {
  id: number
  title: string
  completed: boolean
}

function formatTask(todo: ApiTodo): Task {
  return {
    id: todo.id,
    title: todo.todo,
    completed: todo.completed,
  }
}

export async function getTasks(): Promise<Task[]> {
  const response = await fetch(
    'https://dummyjson.com/todos',
    {
      cache: 'no-store',
    }
  )

  if (!response.ok) {
    throw new Error('Gagal mengambil data')
  }

  const data = await response.json()

  return data.todos.map(formatTask)
}

export async function getTaskById(
  id: number
): Promise<Task | null> {
  const response = await fetch(
    `https://dummyjson.com/todos/${id}`,
    {
      cache: 'no-store',
    }
  )

  if (!response.ok) {
    return null
  }

  const data = await response.json()

  return formatTask(data)
}

export async function getTaskStats(tasks: Task[]) {
  const total = tasks.length
  const completed = tasks.filter(
    (task) => task.completed
  ).length

  const pending = total - completed

  return {
    total,
    completed,
    pending,
  }
}