# 🎮 Real-Time Tic Tac Toe (React + Node.js + Socket.IO)

A **real-time multiplayer Tic Tac Toe** game built with **React.js**, **Node.js**, and **Socket.IO**.  
This app supports **authenticated gameplay**, **room-based matchmaking**, and **instant live board updates** — all without page refresh.

---

## 🚀 Features

✅ **Real-Time Gameplay:**  
Both players see board updates instantly using Socket.IO WebSocket connections.

✅ **JWT Authentication:**  
Only verified users can join or create game rooms.

✅ **Room Management:**  
Create, join, reset, and leave rooms dynamically.

✅ **Turn-Based Logic:**  
Each player takes turns — game enforces turn validation and prevents cheating.

✅ **Automatic Game Reset:**  
Once a match ends, you can reset the same room for a new round.

✅ **Live Connection Status:**  
Shows when a player joins, leaves, or disconnects.

✅ **Instant Reconnection Handling:**  
Socket.IO auto reconnects on reload.

---

## 🧩 Tech Stack

| Layer | Technology |
|--------|-------------|
| **Frontend** | React.js (Vite) |
| **Backend** | Node.js + Express |
| **Real-Time Engine** | Socket.IO |
| **Auth** | JWT-based authentication |
| **Database (optional)** | MongoDB |
| **Styling** | Inline CSS |

---



