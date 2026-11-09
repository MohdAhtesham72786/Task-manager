from datetime import date, datetime
from typing import Optional

from pydantic import BaseModel, Field


class TaskBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None
    status: str = Field(default="Pending")
    due_date: Optional[date] = None


class TaskCreate(TaskBase):
    """Body used when creating a task."""


class TaskUpdate(BaseModel):
    """All fields optional so the client can update only what changed."""

    title: Optional[str] = Field(default=None, min_length=1, max_length=255)
    description: Optional[str] = None
    status: Optional[str] = None
    due_date: Optional[date] = None


class TaskOut(TaskBase):
    id: int
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True
