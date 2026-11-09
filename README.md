# Task Manager App

Beginner-friendly full stack project:

- Frontend: React.js + CSS (Vite)
- Backend: Python FastAPI
- Database: MySQL
- API docs: Swagger at `http://localhost:8000/docs`

## Project structure

```
ASW/
  frontend/          React UI
  backend/           FastAPI REST API
  database/schema.sql  MySQL database + sample tasks
```

### Backend files

| File | Purpose |
| --- | --- |
| `backend/app/main.py` | Starts FastAPI, CORS, and Swagger |
| `backend/app/database.py` | MySQL connection with SQLAlchemy |
| `backend/app/models.py` | `tasks` table mapping |
| `backend/app/schemas.py` | Pydantic request/response validation |
| `backend/app/crud.py` | Create, read, update, delete helpers |
| `backend/app/routers/tasks.py` | REST API routes |
| `backend/.env` | Database username, password, and db name |
| `backend/requirements.txt` | Python packages |

### Frontend files

| File | Purpose |
| --- | --- |
| `frontend/src/pages/Dashboard.jsx` | Main page: stats, search, filters, list |
| `frontend/src/components/` | Reusable UI pieces |
| `frontend/src/api/tasks.js` | Axios calls to FastAPI |
| `frontend/src/index.css` | Simple responsive styles |

## Step 1: Create the MySQL database

1. Open **MySQL Workbench** or **phpMyAdmin**.
2. Open `database/schema.sql`.
3. Run the whole file.

Or from a MySQL terminal:

```sql
SOURCE C:/Users/suchi/Desktop/ASW/database/schema.sql;
```

Then edit `backend/.env`:

```
DB_ENGINE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=task_manager_db
```

If MySQL is not installed yet, keep `DB_ENGINE=sqlite`. The API still works and stores data in `backend/task_manager.db`. Switch to `mysql` after you create `task_manager_db`.

## Step 2: Start the backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Open:

- API: http://localhost:8000
- Swagger: http://localhost:8000/docs

## Step 3: Start the frontend

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

## APIs

| Method | URL | Action |
| --- | --- | --- |
| POST | `/api/tasks/` | Create task |
| GET | `/api/tasks/` | Get all tasks |
| GET | `/api/tasks/{id}` | Get one task |
| PUT | `/api/tasks/{id}` | Update task |
| DELETE | `/api/tasks/{id}` | Delete task |

Example JSON for create/update:

```json
{
  "title": "Prepare demo",
  "description": "Show CRUD flow",
  "status": "Pending",
  "due_date": "2026-11-12"
}
```

Status values used by the UI: `Pending` or `Completed`.
