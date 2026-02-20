# Simple To-Do List API build with Next.js (App Router).

# Features

- CRUD operations
  - Create Todo
  - Update (Title / Status)
  - Read Todos
  - Delete Todo

- In-memory storage (Array)
- Api returns & Error handling
  - Api (return status codes & message)
  - Toaster (show message error from api)

- API Key authentication (x-api-key)
- Rate limiting per HTTP method
  - Get 20 per minute
  - Post 5 per minute
  - Put 5 per minute
  - Delete 5 per minute

# Setup

    1. npm install
    2. create .env from .env.example
    3. npm run dev

# TechStack

- Next.js 16
- Tailwind CSS
- Shadcn UI
