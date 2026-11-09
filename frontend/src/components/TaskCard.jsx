function TaskCard({ task, onEdit, onDelete }) {
  const statusClass =
    task.status === "Completed" ? "badge-completed" : "badge-pending";

  return (
    <article className="task-card">
      <div>
        <h3 className="task-title">{task.title}</h3>
        <p className="task-desc">{task.description || "No description"}</p>
        <div className="task-meta">
          <span className={`badge ${statusClass}`}>{task.status}</span>
          <span className="due-date">Due: {task.due_date || "Not set"}</span>
        </div>
      </div>
      <div className="card-actions">
        <button className="btn btn-ghost" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </article>
  );
}

export default TaskCard;
