import { useState } from "react";

export function Form() {
  const [task, setTask] = useState(""); // Lo que escribe el usuario
  const [tasks, setTasks] = useState([]); // Lista de tareas

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que se recargue la página
    if (task.trim() === "") return;

    // Agregar nueva tarea
    setTasks([...tasks, task]);
    setTask(""); // Limpiar input
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="flex flex-row gap-4 mb-4">
        <input
          className="bg-white rounded-lg p-1 text-black flex-1"
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Escribe una tarea"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-1 rounded-lg"
        >
          Add
        </button>
      </form>

      {/* Lista de tareas */}
      <ul className="space-y-2">
        {tasks.map((t, index) => (
          <li
            key={index}
            className="bg-gray-100 text-black p-2 rounded-lg shadow-sm"
          >
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}
