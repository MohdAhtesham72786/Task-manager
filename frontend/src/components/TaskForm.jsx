import { useState } from "react";

const emptyForm = {
  title: "",
  description: "",
  status: "Pending",
  due_date: "",
};

function TaskForm({ initialTask, onClose, onSave }) {
  const [form, setForm] = useState(initialTask || emptyForm);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSave({
      ...form,
      due_date: form.due_date || null,
    });
  }

  return (
    <div className="overlay">
      <form className="modal" onSubmit={handleSubmit}>
        <h2>{initialTask ? "Edit Task" : "Create Task"}</h2>
        <div className="form-grid">
          <label>
            Title
            <input
              className="text-input"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Description
            <textarea
              className="textarea-input"
              name="description"
              value={form.description || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Status
            <select
              className="select-input"
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </label>
          <label>
            Due date
            <input
              className="text-input"
              type="date"
              name="due_date"
              value={form.due_date || ""}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-actions">
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save Task
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
