import TaskCard from "./TaskCard";

function TaskList({ tasks, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return <p className="status-message">No tasks found.</p>;
  }

  return (
    <section className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}

export default TaskList;
