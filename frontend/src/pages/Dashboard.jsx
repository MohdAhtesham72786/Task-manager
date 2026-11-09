import { useEffect, useMemo, useState } from "react";
import FilterBar from "../components/FilterBar";
import SearchBar from "../components/SearchBar";
import Sidebar from "../components/Sidebar";
import StatCards from "../components/StatCards";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../api/tasks";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  async function loadTasks() {
    setLoading(true);
    setError("");
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError(
        "Could not load tasks. Make sure the FastAPI server is running on http://localhost:8000"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  const stats = useMemo(() => {
    const completed = tasks.filter((task) => task.status === "Completed").length;
    return {
      total: tasks.length,
      completed,
      pending: tasks.length - completed,
    };
  }, [tasks]);

  const visibleTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesFilter = filter === "All" || task.status === filter;
      const query = search.toLowerCase();
      const matchesSearch =
        task.title.toLowerCase().includes(query) ||
        (task.description || "").toLowerCase().includes(query);
      return matchesFilter && matchesSearch;
    });
  }, [tasks, filter, search]);

  async function handleSave(formData) {
    try {
      if (editingTask) {
        await updateTask(editingTask.id, formData);
      } else {
        await createTask(formData);
      }
      setShowForm(false);
      setEditingTask(null);
      await loadTasks();
    } catch (err) {
      setError("Could not save the task. Please try again.");
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm("Delete this task?");
    if (!confirmed) {
      return;
    }
    try {
      await deleteTask(id);
      await loadTasks();
    } catch (err) {
      setError("Could not delete the task. Please try again.");
    }
  }

  function openCreateForm() {
    setEditingTask(null);
    setShowForm(true);
  }

  function openEditForm(task) {
    setEditingTask(task);
    setShowForm(true);
  }

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main">
        <header className="topbar">
          <h1>Task Overview</h1>
          <div className="top-actions">
            <button className="btn btn-primary" onClick={openCreateForm}>
              + Create Task
            </button>
          </div>
        </header>

        <StatCards
          total={stats.total}
          completed={stats.completed}
          pending={stats.pending}
        />

        <div className="toolbar">
          <SearchBar value={search} onChange={setSearch} />
          <FilterBar value={filter} onChange={setFilter} />
        </div>

        {loading && <p className="status-message">Loading tasks...</p>}
        {error && <p className="status-message error">{error}</p>}
        {!loading && (
          <TaskList
            tasks={visibleTasks}
            onEdit={openEditForm}
            onDelete={handleDelete}
          />
        )}
      </main>

      {showForm && (
        <TaskForm
          initialTask={editingTask}
          onClose={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default Dashboard;
