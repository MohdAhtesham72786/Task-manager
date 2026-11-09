CREATE DATABASE IF NOT EXISTS task_manager_db;
USE task_manager_db;

CREATE TABLE IF NOT EXISTS tasks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'Pending',
  due_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tasks (title, description, status, due_date) VALUES
('Content QA Checklist', 'Communication team review of all published pages.', 'Pending', '2026-11-12'),
('Stakeholder Alignment Meeting', 'Engineering sync on sprint goals and blockers.', 'In Progress', '2026-11-10'),
('UX Review & Bug Prioritization', 'Review open UX issues and assign owners.', 'Completed', '2026-11-08'),
('Redesign Homepage Banner', 'Update hero section copy and artwork.', 'Pending', '2026-11-15'),
('Write Quarterly Report', 'Summarize product metrics for Q4 leadership review.', 'Completed', '2026-11-07');
