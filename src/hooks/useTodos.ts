import useTodoStore from "../store";
import { Todo, TodoStatus } from "../types/todo";

const useTodos = () => {
  const { todos, addTodo, removeTodo, updateStatus, clearCompleted } = useTodoStore();

  // Filtrar tareas por estado
  const getTodosByStatus = (status: TodoStatus): Todo[] => {
    return todos.filter(todo => todo.status === status);
  };

  return { todos, addTodo, removeTodo, updateStatus, clearCompleted, getTodosByStatus };
};

export default useTodos;
