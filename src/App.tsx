import React, { useState } from "react";
import AddTodoModal from "./components/AddTodoModal";
import TodoCard from "./components/TodoCard";
import useTodoStore from "./store";
import { Todo } from "./types/todo";

const App: React.FC = () => {
  const { todos, addTodo, editTodo, removeTodo, updateStatus, clearCompleted } = useTodoStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  return (
    <div>
      <h1>Gestión de Tareas</h1>

      {/* Botón para abrir modal de agregar tarea */}
      <button onClick={() => {
        setEditingTodo(null); // Asegura que se agregará una nueva tarea
        setIsModalOpen(true);
      }}>
        Agregar Tarea
      </button>

      {/* Modal para agregar/editar tarea */}
      <AddTodoModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTodo(null);
        }}
        onSave={(id, title, description, category, status) => {
          if (id) {
            editTodo(id, title, description, category, status); // Editar tarea existente
          } else {
            addTodo(title, description, category, status); // Agregar nueva tarea
          }
        }}
        editingTodo={editingTodo}
      />

      <h2>Lista de Tareas</h2>
      {todos.map(todo => (
        <TodoCard 
          key={todo.id} 
          todo={todo} 
          updateStatus={updateStatus} 
          removeTodo={removeTodo}
          onEdit={(todo) => {
            setEditingTodo(todo); // Cargar tarea en el modal para edición
            setIsModalOpen(true);
          }} 
        />
      ))}

      {/* Botón para limpiar tareas finalizadas */}
      <button onClick={clearCompleted}>Limpiar Finalizadas</button>
    </div>
  );
};

export default App;
