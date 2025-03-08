import React, { useState, useEffect } from "react";
import { TodoStatus, TodoCategory, Todo } from "../types/todo";

interface TodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    id: number | null,
    title: string,
    description: string,
    category: TodoCategory,
    status: TodoStatus
  ) => void;
  editingTodo?: Todo | null;
}

const categoryIcons: Record<TodoCategory, string> = {
  [TodoCategory.WORK]: "💼",
  [TodoCategory.GYM]: "🏋️",
  [TodoCategory.HOSPITAL]: "🏥",
  [TodoCategory.STUDY]: "📚",
};

const TodoModal: React.FC<TodoModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingTodo,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<TodoCategory>(TodoCategory.WORK);
  const [status, setStatus] = useState<TodoStatus>(TodoStatus.PENDING);
  const [taskId, setTaskId] = useState<number | null>(null);

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.text);
      setDescription(editingTodo.description);
      setCategory(editingTodo.category);
      setStatus(editingTodo.status);
      setTaskId(editingTodo.id);
    } else {
      setTitle("");
      setDescription("");
      setCategory(TodoCategory.WORK);
      setStatus(TodoStatus.PENDING);
      setTaskId(null);
    }
  }, [editingTodo, isOpen]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "10px",
          width: "400px",
        }}
      >
        <h2>{taskId ? "Editar Tarea" : "Nueva Tarea"}</h2>

        <label>Título</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Descripción</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Categoría</label>
        <div>
          {Object.values(TodoCategory).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                padding: "10px",
                margin: "5px",
                fontSize: "20px",
                backgroundColor: category === cat ? "#ddd" : "#fff",
              }}
            >
              {categoryIcons[cat]}
            </button>
          ))}
        </div>

        <label>Estado</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as TodoStatus)}
        >
          {Object.values(TodoStatus).map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            onSave(taskId, title, description, category, status);
            onClose();
          }}
          disabled={!title.trim()}
          style={{cursor: !title.trim() ? 'not-allowed' : 'pointer'}}
        >
          Guardar
        </button>

        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};

export default TodoModal;
