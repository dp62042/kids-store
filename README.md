
# Kids Store

A modern, full-stack e-commerce app built with **React (Vite)** for the front-end and **Express + MongoDB** for the back-end.

Features:
- User authentication (JWT-based login/register)
- Add, remove, view items
- Persistent shopping cart (with guest & logged-in merge)
- Secure API endpoints (protected via middleware)
- Smooth UI with animations and responsive design

---

##  Tech Stack

| Layer       | Tech                         |
|-------------|------------------------------|
| Frontend    | React, Vite, Tailwind CSS    |
| Backend     | Express.js, Node.js, MongoDB |
| Auth        | JWT                          |
| Hosting     | Frontend: Netlify (or Render Static) <br> Backend: Render (Node service) |

---

##  Setup Instructions

### 🏠 Local Development

1. **Clone the repo:**
   ```bash
   git clone https://github.com/dp62042/kids-store.git
   cd kids-store
````

2. **Backend setup:**

   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Set MONGO_URI, JWT_SECRET, JWT_EXPIRES_IN in .env
   npm run dev  # or `npm start` in production
   ```

3. **Frontend setup:**

   ```bash
   cd frontend
   npm install
   cp .env.example .env
   # Set VITE_API_URL to your backend URL or `http://localhost:5000/api`
   npm run dev
   ```

4. Visit [http://localhost:5173](http://localhost:5173) for frontend and your API on port 5000.

---

## Deployment Notes

### Backend

* Hosted on **Render** (Node/Express service).
* Ensure `startCommand: npm start` and environment variables (like MONGO\_URI, JWT\_SECRET) are set.

### Frontend

* Hosted on **Netlify** or **Render static site**.

* **Add redirect rule** to support React Router:

  * **Netlify:** Put this in `frontend/public/_redirects`:

    ```
    /*    /index.html   200
    ```
  * **Render:** In static site settings:

    ```
    Source: /*
    Destination: /index.html
    Type: Rewrite
    ```

* Add environment variable in Netlify:
  `VITE_API_URL = https://<your-backend-url>/api`

---

## Important Notes

* This is a **single-page application (SPA)**; deep links or refreshes need redirect rules to serve `index.html`.
* Token is stored in `localStorage` for authentication. Expired or invalid tokens redirect the user to login automatically.
* Cart behavior includes guest cart merging — if two different users add the same item, they have separate carts (thanks to user-specific authentication and storage).



