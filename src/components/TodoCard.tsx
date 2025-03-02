import React from "react";
import { Todo, TodoStatus, TodoCategory } from "../types/todo";

interface TodoCardProps {
  todo: Todo;
  updateStatus: (id: number) => void;
  removeTodo: (id: number) => void;
  onEdit: (todo: Todo) => void;
}

const statusColors: Record<TodoStatus, string> = {
  [TodoStatus.PENDING]: "#d4d4d4",      // Rojo claro
  [TodoStatus.IN_PROGRESS]: "#fff3cd",  // Amarillo claro
  [TodoStatus.COMPLETED]: "#d4edda"     // Verde claro
};

const categoryIcons: Record<TodoCategory, string> = {
  [TodoCategory.WORK]: "💼",
  [TodoCategory.GYM]: "🏋️",
  [TodoCategory.HOSPITAL]: "🏥",
  [TodoCategory.STUDY]: "📚"
};

const TodoCard: React.FC<TodoCardProps> = ({ todo, updateStatus, removeTodo, onEdit }) => {
  return (
    <div style={{
      padding: "15px",
      margin: "10px 0",
      borderRadius: "8px",
      backgroundColor: statusColors[todo.status],
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {/* Ícono de categoría */}
        <span style={{ fontSize: "24px" }}>{categoryIcons[todo.category]}</span>

        <div>
          <h3>{todo.text}</h3>
          <p>{todo.description}</p>
          <p><strong>Estado:</strong> {todo.status}</p>
        </div>
      </div>

      <div>
        <button onClick={() => updateStatus(todo.id)}>🔄 Cambiar estado</button>
        <button onClick={() => removeTodo(todo.id)}>🗑️ Eliminar</button>
        <button onClick={() => onEdit(todo)}>✏️ Editar</button>
      </div>
    </div>
  );
};

export default TodoCard;
