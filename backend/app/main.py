from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
from app import models
from app import schemas
from app import crud
from app.database import SessionLocal, engine
from contextlib import asynccontextmanager
import os

# Create tables
models.Base.metadata.create_all(bind=engine)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("Starting up...")
    yield
    # Shutdown
    print("Shutting down...")

app = FastAPI(
    title="BookmarkHub API",
    description="A bookmark management API",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware - ALLOW ALL FOR DEVELOPMENT
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for now
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Welcome to BookmarkHub API"}

@app.get("/bookmarks", response_model=List[schemas.Bookmark])
def read_bookmarks(
    skip: int = 0, 
    limit: int = 100, 
    tag: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Get all bookmarks with optional tag filtering"""
    if tag:
        bookmarks = crud.get_bookmarks_by_tag(db, tag=tag, skip=skip, limit=limit)
    else:
        bookmarks = crud.get_bookmarks(db, skip=skip, limit=limit)
    return bookmarks

@app.get("/bookmarks/{bookmark_id}", response_model=schemas.Bookmark)
def read_bookmark(bookmark_id: int, db: Session = Depends(get_db)):
    """Get a specific bookmark by ID"""
    db_bookmark = crud.get_bookmark(db, bookmark_id=bookmark_id)
    if db_bookmark is None:
        raise HTTPException(status_code=404, detail="Bookmark not found")
    return db_bookmark

@app.post("/bookmarks", response_model=schemas.Bookmark)
def create_bookmark(
    bookmark: schemas.BookmarkCreate, 
    db: Session = Depends(get_db)
):
    """Create a new bookmark"""
    return crud.create_bookmark(db=db, bookmark=bookmark)

@app.put("/bookmarks/{bookmark_id}", response_model=schemas.Bookmark)
def update_bookmark(
    bookmark_id: int, 
    bookmark: schemas.BookmarkUpdate, 
    db: Session = Depends(get_db)
):
    """Update an existing bookmark"""
    db_bookmark = crud.update_bookmark(db, bookmark_id=bookmark_id, bookmark=bookmark)
    if db_bookmark is None:
        raise HTTPException(status_code=404, detail="Bookmark not found")
    return db_bookmark

@app.delete("/bookmarks/{bookmark_id}")
def delete_bookmark(bookmark_id: int, db: Session = Depends(get_db)):
    """Delete a bookmark"""
    success = crud.delete_bookmark(db, bookmark_id=bookmark_id)
    if not success:
        raise HTTPException(status_code=404, detail="Bookmark not found")
    return {"message": "Bookmark deleted successfully"}

@app.get("/tags")
def get_tags(db: Session = Depends(get_db)):
    """Get all unique tags"""
    return crud.get_all_tags(db)
