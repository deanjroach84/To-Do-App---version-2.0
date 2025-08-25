# To-Do App (Full Stack)

A full-stack To-Do application with authentication, persistent storage, and Docker setup.

## Features

- User registration and login (JWT Auth)
- Add, toggle, and delete personal to-dos
- Persistent storage via SQLite
- React frontend, Express backend API
- Fully containerized with Docker Compose

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)

### Running the App

1. Clone the repo:

   ```
   git clone https://github.com/deanjroach84/todo-app.git
   cd todo-app
   ```

2. Start the stack:

   ```
   docker-compose up
   ```

3. The frontend will be available at [http://localhost:3000](http://localhost:3000)  
   The backend API will be at [http://localhost:4000](http://localhost:4000)

## Project Structure

```
todo-app/
  backend/
    app.js
    package.json
    Dockerfile
  frontend/
    public/
      index.html
    src/
      App.js
      components/
        Login.js
        Register.js
        TodoList.js
      index.js
    package.json
    Dockerfile
  docker-compose.yml
  .gitignore
  README.md
```

## License

MIT