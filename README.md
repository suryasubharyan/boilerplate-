
# Tic Tac Toe — Real‑Time Multiplayer

A minimal README with simple step-by-step install/run instructions and screenshot placeholders for a real‑time, JWT‑authenticated Tic Tac Toe app built with React (frontend) and Node.js + Express + Socket.IO (backend).

Prerequisites
- Node.js v16+ and npm
- Git

Repository layout (example)
- backend/        # Node.js + Express + Socket.IO (TypeScript)
- TicTacToe-test/ # React frontend
- README.md
- images/         # screenshots (place images here)

Quick Install & Run (step‑by‑step)

1. Clone the repository
   - git clone https://github.com/suryasubharyan/boilerplate-.git
   - cd boilerplate-

2. Backend
   - cd backend-boilerplate (1) copy
   - npm install
   - Create .env file in backend/ with:
     - given sample in .env example
   - Start the backend (development):
     - npm run dev
   - Confirm backend is running:
     - Open http://localhost:5000 in your browser (or check terminal logs)

3. Frontend
   - Open a new terminal
   - cd ../TicTacToe-test
   - npm install
   - Start the frontend:
     - npm start
   - Frontend will open at http://localhost:3000

4. Test the app (local)
   - Open two browser windows (or one normal + one incognito).
   - Sign in / obtain JWT for two different users (for development you can mock tokens in localStorage).
   - Player A → Create Room (server returns a room code).
   - Player B → Join Room using the code.
   - Play: moves sync in real time.
   - Try refreshing one tab — the player should rejoin to the same game if using the same JWT.

Basic Commands Summary
- Backend:
  - npm install
  - npm run dev
- Frontend:
  - npm install
  - npm start

Environment Variables (minimum)
- PORT=5000
- JWT_SECRET=your_secret_key

Screenshots

- images/01-login.png
- images/02-in-game.png
- images/03-game-over.png


- Login screen  
  ![Login](./images/01-login.png)

- Create room / Room code  
  ![Create Room](./images/02-create-room.png)

- In-game (board view)  
  ![In Game](./images/03-in-game.png)

- Game over / Result  
  ![Game Over](./images/04-game-over.png)

