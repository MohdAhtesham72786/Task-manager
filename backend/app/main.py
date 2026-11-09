from datetime import date

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from . import models
from .database import Base, SessionLocal, engine
from .routers import tasks

# Create tables if they do not exist yet
Base.metadata.create_all(bind=engine)


def seed_sample_tasks():
    db: Session = SessionLocal()
    try:
        if db.query(models.Task).count() > 0:
            return
        samples = [
            models.Task(
                title="Content QA Checklist",
                description="Communication team review of all published pages.",
                status="Pending",
                due_date=date(2026, 11, 12),
            ),
            models.Task(
                title="Stakeholder Alignment Meeting",
                description="Engineering sync on sprint goals and blockers.",
                status="Pending",
                due_date=date(2026, 11, 10),
            ),
            models.Task(
                title="UX Review & Bug Prioritization",
                description="Review open UX issues and assign owners.",
                status="Completed",
                due_date=date(2026, 11, 8),
            ),
            models.Task(
                title="Redesign Homepage Banner",
                description="Update hero section copy and artwork.",
                status="Pending",
                due_date=date(2026, 11, 15),
            ),
            models.Task(
                title="Write Quarterly Report",
                description="Summarize product metrics for Q4 leadership review.",
                status="Completed",
                due_date=date(2026, 11, 7),
            ),
        ]
        db.add_all(samples)
        db.commit()
    finally:
        db.close()


seed_sample_tasks()

app = FastAPI(
    title="Task Manager API",
    description="Simple REST API for the Task Manager web app.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tasks.router)


@app.get("/")
def root():
    return {"message": "Task Manager API is running. Open /docs for Swagger."}
