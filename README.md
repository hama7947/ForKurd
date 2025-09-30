# ikurd-clone (minimal full-stack)
This is a minimal full-stack sample for an "app store" clone built with:
- Backend: Node.js, Express, MongoDB, Multer (file uploads)
- Frontend: Vite + React

How to run (local):
1. Backend
   - cd backend
   - npm install
   - copy .env.example to .env and set MONGO_URI and JWT_SECRET
   - npm run dev

2. Frontend
   - cd frontend
   - npm install
   - npm run dev

Notes:
- The upload route in backend requires auth (JWT). For quick testing you can remove 'auth' middleware in backend/routes/apps.js
- Uploaded files are stored in backend/uploads (development). In production use S3 or similar.
