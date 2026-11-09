from sqlalchemy import Column, Date, DateTime, Integer, String, Text, func

from .database import Base


class Task(Base):
    """SQLAlchemy model for the tasks table."""

    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    status = Column(String(50), nullable=False, default="Pending")
    due_date = Column(Date, nullable=True)
    created_at = Column(DateTime, server_default=func.now())
