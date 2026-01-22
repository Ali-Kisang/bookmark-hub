from pydantic import BaseModel, HttpUrl
from typing import List, Optional
from datetime import datetime

class BookmarkBase(BaseModel):
    title: str
    url: HttpUrl
    description: Optional[str] = None
    tags: Optional[List[str]] = []

class BookmarkCreate(BookmarkBase):
    pass

class BookmarkUpdate(BaseModel):
    title: Optional[str] = None
    url: Optional[HttpUrl] = None
    description: Optional[str] = None
    tags: Optional[List[str]] = None

class Bookmark(BookmarkBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True