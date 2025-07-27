# 📚 Bookstore App

A full-stack 3-tier Bookstore application with user registration, JWT-based authentication, role-based access control (Admin/User), book management, and a clean React UI.

## 🏗️ Architecture

```
[ React Frontend ]  <---->  [ Node.js + Express API ]  <---->  [ MongoDB ]
                          |                             |
                      Swagger UI                    JWT Authentication
```

## ⚙️ Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js (Express.js)
- **Database:** MongoDB
- **Authentication:** JWT (Role-based)
- **Containerization:** Docker & Docker Compose
- **API Documentation:** Swagger
- **Orchestration (optional):** Kubernetes via Minikube

## ✅ Features

- 🔐 JWT login & registration
- 👥 Role-based access (User / Admin)
- 📘 Add / Edit / Delete books (Admin only)
- 📖 View books (All logged-in users)
- 📜 Swagger documentation
- 🐳 Fully containerized with Docker
- ☸️ Kubernetes manifests (optional)

## 🚀 Quick Start

### 🔧 Local (Docker Compose)

```bash
# Step 1: Clone the repo
git clone https://github.com/yourusername/bookstore-app.git
cd bookstore-app

# Step 2: Build and run containers
docker-compose up --build
```

> Access:
> - Frontend: http://localhost:3000
> - Backend: http://localhost:5000
> - Swagger Docs: http://localhost:5000/api-docs

### ☸️ Kubernetes Setup (Optional via Minikube)

```bash
# Start Minikube
minikube start

# Build Docker images inside Minikube
eval $(minikube docker-env)
docker build -t bookstore-frontend:latest ./frontend
docker build -t bookstore-backend:latest ./backend

# Apply all manifests
kubectl apply -f k8s/

# Access service URLs
minikube service frontend-service
```

## 🛠️ API Endpoints

| Method | Endpoint            | Description               | Auth     |
|--------|---------------------|---------------------------|----------|
| POST   | `/api/register`     | Register new user         | ❌ Public |
| POST   | `/api/login`        | Login and receive JWT     | ❌ Public |
| GET    | `/api/books`        | List all books            | ✅ Token |
| POST   | `/api/books`        | Add a book                | ✅ Admin |
| PUT    | `/api/books/:id`    | Update book details       | ✅ Admin |
| DELETE | `/api/books/:id`    | Delete a book             | ✅ Admin |

## 🔐 JWT Token

After login, copy the token and use it in requests:

```
Authorization: Bearer <your_token_here>
```

## 📑 Swagger

API docs available at:

```
http://localhost:5000/api-docs
```

To authorize:

1. Click "Authorize"
2. Paste JWT token (`Bearer <token>`)
3. Enjoy testing!

## 👤 Default Roles

| Role  | Permissions                |
|-------|----------------------------|
| User  | View books                 |
| Admin | Add, Edit, Delete books    |

## 🧪 Sample Users

You can register via `/api/register` or use existing seeded users (if seeded):

```
Admin: admin / admin123
User:  user  / user123
```

## 📂 Project Structure

```
bookstore-app/
├── backend/           # Express API
│   ├── server.js
│   ├── Dockerfile
│   └── ...models, routes...
├── frontend/          # React UI
│   ├── src/
│   ├── Dockerfile
│   └── ...
├── docker-compose.yml
├── k8s/               # Kubernetes manifests
├── README.md
```

## 📚 Further Ideas

- Add GraphQL layer
- Implement pagination & search
- Add email verification
- Integrate Redis + BullMQ (background jobs)

## 🙌 Credits

Built with ❤️ by [Your Name].