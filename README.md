# Mini Twitter

A **mini Twitter clone** built as a full-stack assessment project using **Laravel 12 API + React Vite + Tailwind CSS + MySQL**.  
The project demonstrates a modern 2025 approach for SPA development with **Sanctum authentication**, **clean code**, and **conventional commits**.

---

## 📦 Tech Stack

**Backend:**  
- Laravel 12 (API only)  
- Sanctum for SPA authentication  
- MySQL database  
- PEST for backend testing  

**Frontend:**  
- React (Vite + functional components + hooks)  
- Tailwind CSS for styling  
- Axios for API requests  
- React Router DOM for routing  
- React Hook Form for forms and validation  
- Vitest for frontend testing  

---

## 🗂 Folder Structure


minitweetui/
├── backend/ # Laravel 12 API
│ ├── app/
│ │ ├── Http/Controllers/Api/
│ │ ├── Models/
│ │ └── ...
│ ├── database/migrations/
│ └── tests/Feature/
├── front/ # React Vite frontend
│ ├── src/
│ │ ├── api/
│ │ ├── pages/
│ │ ├── App.jsx
│ │ └── index.css
│ └── vite.config.js
└── README.md


## 🎯 Features

- **User Signup:** firstname, surname, email, password  
- **User Login:** via email and password  
- **Post Tweet:** logged-in users, max 280 characters  
- **Tweet Feed:** shows all tweets from all users  
- **Like Tweet:** logged-in users can like; shows total like count  

> Only these features are implemented; no extra features added.

---

## ⚙️ Setup Instructions

### Backend (Laravel API)

1. Install dependencies:

bash
composer install
Copy .env.example to .env and configure your MySQL database.

bash
cp .env.example .env
Install Laravel API with Sanctum (2025 modern setup):

bash
php artisan install:api
Run migrations:

bash
php artisan migrate
Start backend server:

bash
php artisan serve
Frontend (React + Vite + Tailwind)
Install dependencies:

bash
cd front
npm install
Start frontend server:

bash
npm run dev
Make sure the backend server is running at http://localhost:8000.



🧪 Testing
Backend (PEST)
Run PEST tests:

bash
php artisan test
Tests include user registration/login, tweet creation, and like/unlike flows.

Ensures API returns correct JSON and enforces authentication rules.

Frontend (Vitest)
Run Vitest:

bash
npm run test
Tests include registration, login, tweet posting, feed rendering, and like/unlike functionality.



📌 Conventions
Conventional commits used for each feature/fix:

makefile
feat: add user registration API
fix: correct tweet model relationship
style: setup Tailwind config
test: add vitest for tweet component
Folder structure is modular and easy to read, following 2025 best practices.

Backend is strictly API only, no Blade templates or Inertia.

Frontend uses React functional components + hooks only.


🔑 Notes
All authentication is handled via Laravel Sanctum SPA authentication.

No manual configuration of CORS, middleware, or Sanctum is needed — handled automatically by php artisan install:api.

Follow the folder structure for modularity and clarity.

Use npm run dev and php artisan serve in separate terminals for local development.



🎨 Figma Design
Login, registration, and tweet feed designs are based on the attached Figma files.

Frontend layout uses Tailwind CSS for modern responsive styling.



✅ Final Deliverables
Fully working Laravel API with Sanctum authentication

React frontend consuming the API

Clean, readable, modern 2025 folder structure

Conventional commit history

PEST + Vitest test coverage

Made with ❤️ by Carlo

