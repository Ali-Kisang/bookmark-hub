# 📚 BookmarkHub - Dockerized Bookmark Management System

![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

A modern, containerized bookmark management application built with FastAPI, PostgreSQL, and Docker.

## ✨ Features

- **🔐 Secure Authentication** - JWT-based user authentication
- **📁 Bookmark Management** - Organize, categorize, and search bookmarks
- **🏷️ Tag System** - Tag bookmarks for easy filtering
- **🔍 Full-Text Search** - Powerful search across titles, URLs, and descriptions
- **🌐 RESTful API** - Clean, documented API built with FastAPI
- **🐳 Dockerized** - Easy deployment with Docker Compose
- **📱 Responsive Frontend** - Modern React/Vite frontend

## 🏗️ Architecture

```
bookmarkhub/
├── backend/           # FastAPI application
│   ├── app/
│   │   ├── main.py    # FastAPI app entry point
│   │   ├── database.py # Database configuration
│   │   ├── models.py  # SQLAlchemy models
│   │   ├── schemas.py # Pydantic schemas
│   │   └── routes/    # API routes
├── frontend/          # React/Vite frontend
├── docker-compose.yml # Multi-container orchestration
└── .env.example       # Environment variables template
```

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Git

### 1. Clone and Setup
```bash
# Clone the repository
git clone https://github.com/Ali-Kisang/bookmark-hub.git
cd bookmarkhub

# Copy environment file
cp .env.example .env

# Edit .env with your configuration
nano .env
```

### 2. Start the Application
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Check service status
docker-compose ps
```

### 3. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Database (pgAdmin)**: http://localhost:5050 (if configured)

## ⚙️ Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
# Database
DB_USER=Kisang
DB_PASSWORD=Kisang@1996  # Use quote() for special characters
DB_NAME=bookmarkhub
DB_HOST=postgres
DB_PORT=5432

# Backend
SECRET_KEY=your-secret-key-here
CORS_ORIGINS=http://localhost:5173,http://frontend:4173

# Frontend
VITE_API_URL=http://localhost:8000
```

### PostgreSQL Connection Notes
Special characters in passwords (like `@`) are automatically URL-encoded in the connection string:
- Password `Kisang@1996` becomes `Kisang%401996` in the connection URL
- The system handles this encoding automatically

## 🐳 Docker Services

| Service | Port | Description |
|---------|------|-------------|
| postgres | 5432 | PostgreSQL database |
| backend | 8000 | FastAPI REST API |
| frontend | 5173 | React development server |
| nginx | 80 | Production web server (optional) |

### Common Docker Commands
```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Rebuild containers
docker-compose up -d --build

# Access container shell
docker-compose exec backend bash
docker-compose exec postgres psql -U Kisang -d bookmarkhub
```

## 🔧 Development

### Backend Development
```bash
# Access backend container
docker-compose exec backend bash

# Install new Python packages
pip install <package-name>
# Update requirements.txt
pip freeze > requirements.txt

# Run tests
pytest

# Apply migrations
alembic upgrade head
```

### Frontend Development
```bash
# Access frontend container
docker-compose exec frontend bash

# Install new npm packages
npm install <package-name>

# Development build
npm run dev

# Production build
npm run build
```

## 📁 Project Structure Details

### Backend (FastAPI)
```
backend/app/
├── main.py              # FastAPI application initialization
├── database.py          # Database connection and session management
├── models.py            # SQLAlchemy ORM models
├── schemas.py           # Pydantic schemas for request/validation
├── routes/              # API route modules
│   ├── auth.py          # Authentication endpoints
│   ├── bookmarks.py     # Bookmark CRUD operations
│   └── tags.py          # Tag management
├── core/                # Core application logic
│   ├── config.py        # Configuration management
│   └── security.py      # Authentication and security utilities
└── utils/               # Utility functions
```

### Database Schema
```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    hashed_password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookmarks table
CREATE TABLE bookmarks (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    description TEXT,
    user_id UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tags table with many-to-many relationship
CREATE TABLE tags (
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    user_id UUID REFERENCES users(id),
    UNIQUE(name, user_id)
);

CREATE TABLE bookmark_tags (
    bookmark_id UUID REFERENCES bookmarks(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (bookmark_id, tag_id)
);
```

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   ```bash
   # Check PostgreSQL logs
   docker-compose logs postgres
   
   # Test database connection
   docker-compose exec backend python -c "
   import psycopg2
   try:
       conn = psycopg2.connect(
           host='postgres',
           database='bookmarkhub',
           user='Kisang',
           password='Kisang@1996',
           port=5432
       )
       print('✅ Connection successful')
   except Exception as e:
       print(f'❌ Error: {e}')
   "
   ```

2. **Port Already in Use**
   ```bash
   # Check what's using the port
   sudo lsof -i :8000
   sudo lsof -i :5432
   sudo lsof -i :5173
   
   # Change ports in docker-compose.yml if needed
   ```

3. **Container Won't Start**
   ```bash
   # Force rebuild
   docker-compose down -v
   docker-compose up -d --build
   
   # Check container logs
   docker-compose logs --tail=50 backend
   ```

4. **Permission Issues with Volumes**
   ```bash
   # Fix volume permissions
   sudo chown -R $USER:$USER .
   ```

### Health Checks
```bash
# Check all services
docker-compose ps

# Check specific service health
curl http://localhost:8000/health

# Check database connectivity
docker-compose exec postgres pg_isready -U Kisang
```

## 📈 API Examples

### Authentication
```bash
# Register user
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","username":"testuser","password":"password123"}'

# Login
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'

# Use token for authenticated requests
curl -X GET http://localhost:8000/bookmarks \
  -H "Authorization: Bearer <your-jwt-token>"
```

### Bookmark Management
```bash
# Create bookmark
curl -X POST http://localhost:8000/bookmarks \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "GitHub",
    "url": "https://github.com",
    "description": "Code hosting platform",
    "tags": ["programming", "git"]
  }'

# Get all bookmarks
curl -X GET http://localhost:8000/bookmarks \
  -H "Authorization: Bearer <token>"

# Search bookmarks
curl -X GET "http://localhost:8000/bookmarks/search?q=github" \
  -H "Authorization: Bearer <token>"
```

## 🚢 Deployment

### Production Deployment
1. Update `.env` with production values
2. Set `DEBUG=False` in backend configuration
3. Build frontend for production:
   ```bash
   docker-compose exec frontend npm run build
   ```
4. Use nginx service for static file serving

### Docker Production Build
```bash
# Build optimized images
docker-compose -f docker-compose.prod.yml up -d --build

# Run database migrations
docker-compose exec backend alembic upgrade head
```

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 🙏 Acknowledgments

- [FastAPI](https://fastapi.tiangolo.com/) for the amazing Python framework
- [SQLAlchemy](https://www.sqlalchemy.org/) for ORM
- [PostgreSQL](https://www.postgresql.org/) for the reliable database
- [Docker](https://www.docker.com/) for containerization

---

**Made with ❤️ by Kisang** | [Report Issue](issues) | [View on GitHub](repository)

---

*Note: Remember to keep your `.env` file secure and never commit it to version control. Use `.env.example` as a template for required environment variables.*