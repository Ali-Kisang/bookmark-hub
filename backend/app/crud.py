from sqlalchemy.orm import Session
from sqlalchemy import func
from app import models
from app import schemas
from typing import List, Optional

def get_bookmark(db: Session, bookmark_id: int):
    return db.query(models.Bookmark).filter(models.Bookmark.id == bookmark_id).first()

def get_bookmarks(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Bookmark).offset(skip).limit(limit).all()

def get_bookmarks_by_tag(db: Session, tag: str, skip: int = 0, limit: int = 100):
    return db.query(models.Bookmark).filter(models.Bookmark.tags.any(tag)).offset(skip).limit(limit).all()

def create_bookmark(db: Session, bookmark: schemas.BookmarkCreate):
    # Convert HttpUrl to string for database storage
    db_bookmark = models.Bookmark(
        title=bookmark.title,
        url=str(bookmark.url),
        description=bookmark.description,
        tags=bookmark.tags or []
    )
    db.add(db_bookmark)
    db.commit()
    db.refresh(db_bookmark)
    return db_bookmark

def update_bookmark(db: Session, bookmark_id: int, bookmark: schemas.BookmarkUpdate):
    db_bookmark = get_bookmark(db, bookmark_id)
    if db_bookmark:
        update_data = bookmark.dict(exclude_unset=True)
        if 'url' in update_data:
            update_data['url'] = str(update_data['url'])
        for key, value in update_data.items():
            setattr(db_bookmark, key, value)
        db.commit()
        db.refresh(db_bookmark)
    return db_bookmark

def delete_bookmark(db: Session, bookmark_id: int):
    db_bookmark = get_bookmark(db, bookmark_id)
    if db_bookmark:
        db.delete(db_bookmark)
        db.commit()
        return True
    return False

def get_all_tags(db: Session):
    # Query all unique tags from bookmarks
    bookmarks = db.query(models.Bookmark).all()
    tags = set()
    for bookmark in bookmarks:
        tags.update(bookmark.tags or [])
    return sorted(list(tags))
