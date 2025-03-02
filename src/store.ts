import { create } from "zustand";
import { Todo, TodoStatus, TodoCategory } from "./types/todo";

interface TodoState {
  todos: Todo[];
  addTodo: (text: string, description: string, category: TodoCategory, status: TodoStatus) => void;
  editTodo: (id: number, text: string, description: string, category: TodoCategory, status: TodoStatus) => void;
  removeTodo: (id: number) => void;
  updateStatus: (id: number) => void;
  clearCompleted: () => void;
}

const useTodoStore = create<TodoState>((set) => ({
  todos: [],

  addTodo: (text, description, category, status) => set((state) => ({
    todos: [...state.todos, { id: Date.now(), text, description, category, status }]
  })),

  editTodo: (id, text, description, category, status) => set((state) => ({
    todos: state.todos.map(todo => 
      todo.id === id ? { ...todo, text, description, category, status } : todo
    )
  })),

  removeTodo: (id) => set((state) => ({
    todos: state.todos.filter(todo => todo.id !== id)
  })),

  updateStatus: (id) => set((state) => ({
    todos: state.todos.map(todo =>
      todo.id === id
        ? { ...todo, status: getNextStatus(todo.status) }
        : todo
    )
  })),

  clearCompleted: () => set((state) => ({
    todos: state.todos.filter(todo => todo.status !== TodoStatus.COMPLETED)
  }))
}));

const getNextStatus = (status: TodoStatus): TodoStatus => {
  switch (status) {
    case TodoStatus.PENDING: return TodoStatus.IN_PROGRESS;
    case TodoStatus.IN_PROGRESS: return TodoStatus.COMPLETED;
    case TodoStatus.COMPLETED: return TodoStatus.PENDING;
    default: return TodoStatus.PENDING;
  }
};

export default useTodoStore;
