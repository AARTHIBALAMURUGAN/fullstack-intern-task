# Mini SaaS Template Store

A full-stack web application built as part of the **Gnxtace Technologies – Full Stack Web Developer Intern Technical Assessment**. Users can register and log in, browse available templates, search and filter templates, and save templates to their personal favorites.

## Live Demo

- **Frontend:** https://fullstack-intern-task-fkd5.vercel.app/login
- **Backend API:** https://fullstack-intern-task-2.onrender.com
- **GitHub Repository:** https://github.com/AARTHIBALAMURUGAN/fullstack-intern-task

## Features

### Core Assessment Requirements

- **User registration and login** with input validation.
- **JWT authentication** for authenticated API requests.
- **Password hashing** using bcrypt before storing passwords.
- **Template listing** with template details such as name, description, thumbnail, and category.
- **Favorites:** logged-in users can add templates to favorites and view their saved templates.
- **Protected access** to the favorites page for authenticated users.
- **Axios API integration** between the React frontend and Express backend.
- **Responsive UI** designed to work across screen sizes.
- **Seed/sample templates** to populate the store for testing.

### Additional Features

- **Debounced search:** delays the search action while the user is typing, reducing unnecessary search operations and improving the browsing experience.
- **Search and category filtering:** users can search for templates and narrow results by category.
- **API rate limiting:** limits repeated requests to help protect API endpoints from excessive traffic.
- **Favorite state indicators:** templates already saved by the user are clearly marked.
- **Logout and authentication handling:** users can log out and protected pages can redirect unauthenticated users.
- **Deployment:** frontend hosted on Vercel and backend hosted on Render.

## Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- Axios
- React Router

### Backend

- Node.js
- Express.js
- JWT (JSON Web Token) authentication
- bcrypt for password hashing
- CORS
- Rate-limiting middleware

### Database

- MongoDB
- Mongoose

### Tools and Deployment

- Git and GitHub
- Postman for API testing
- Vercel for frontend deployment
- Render for backend deployment

## Project Structure

The repository contains the frontend and backend in separate folders. The exact internal structure may vary depending on your implementation.

```text
fullstack-intern-task/
├── FrontEnd/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── Backend/
│   ├── config/
│   ├── Route/
│   ├── package.json
│   └── server.js
└── README.md
```

## Getting Started

### Prerequisites

Install the following before running the application:

- Node.js and npm
- MongoDB locally or a MongoDB Atlas database
- Git

### 1. Clone the repository

```bash
git clone https://github.com/AARTHIBALAMURUGAN/fullstack-intern-task.git
cd fullstack-intern-task
```

### 2. Set up the backend

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` directory. Use the exact environment variable names expected by your database connection and authentication code.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_jwt_secret
```

> Replace the example values with your own credentials. Never commit `.env` files or expose database credentials or JWT secrets publicly.

Start the backend using the script defined in `Backend/package.json`. For example, if your project has a `start` script:

```bash
npm start
```

If your project uses a development script, you can use:

```bash
npm run dev
```

The backend should be available at `http://localhost:5000` if port 5000 is configured.

### 3. Set up the frontend

Open a new terminal from the repository root:

```bash
cd FrontEnd
npm install
```

Create a `.env` file in `FrontEnd`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Vite will print the local frontend URL in the terminal, usually `http://localhost:5173`.

> Vite exposes client-side environment variables prefixed with `VITE_`. Use your deployed backend URL for `VITE_API_URL` in the Vercel project settings.

## API Overview

The backend uses the `/api` prefix. Based on the current route mounting, the main route groups are:

| Route group      | Purpose                     |
| ---------------- | --------------------------- |
| `/api/user`      | User registration and login |
| `/api/templetes` | Template-related operations |
| `/api/favorite`  | Favorite-related operations |

The exact endpoints and HTTP methods are defined in the corresponding route files. Consult those files for request bodies, parameters, and authentication requirements.

> **Note:** The assessment document specifies template endpoints under `/api/templates` and favorites under `/api/favorites`. The current server code mounts `/api/templetes` and `/api/favorite`. Update this README or the backend route names so they match the final, tested implementation before submission.

## Security and Validation

- Passwords are hashed before storage.
- JWTs are used to authenticate protected requests.
- Protected API operations should validate the token and authorize the user.
- Registration and login inputs should be validated.

- Rate limiting are enabled on appropriate endpoints.
- Keep secrets in environment variables and out of source control.

## Testing

You can test the application manually by checking the following flows:

1. Register a new user.
2. Log in with the registered credentials.
3. Browse the available templates.
4. Search for a template and filter by category.
5. Add a template to favorites.
6. Open the favorites page and verify the saved template appears.
7. Try to access protected favorites functionality while logged out.
8. Verify that invalid inputs and unauthorized requests are handled appropriately.

Use Postman or another API client to test backend endpoints where appropriate.

## Assessment Requirements Covered

| Assessment requirement              | Implementation                                |
| ----------------------------------- | --------------------------------------------- |
| User registration and login         | Authentication routes                         |
| JWT authentication                  | Token-based protected requests                |
| Password hashing                    | bcrypt                                        |
| List and view templates             | Template API and frontend listing             |
| Add and view favorites              | Favorite API and My Favorites page            |
| At least five sample templates      | Seed/sample data                              |
| Input validation and error handling | Backend validation and JSON responses         |
| Responsive frontend                 | React UI with Tailwind CSS                    |
| Bonus search/filter                 | Debounced search and category filtering       |
| Bonus deployment                    | Vercel frontend / Render backend, if deployed |

## Author

**Aarthi B**

- **GitHub:** https://github.com/AARTHIBALAMURUGAN
- **Email:** aarthi875@gmail.com
- **Phone:** 8667716370

---

Developed as part of the **Gnxtace Technologies Full Stack Web Developer Intern Technical Assessment**.
