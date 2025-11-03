import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { useNavigate } from 'react-router-dom'

export default function TicTacToeAuth() {
  const [socket, setSocket] = useState(null)
  const [roomId, setRoomId] = useState('')
  const [board, setBoard] = useState(Array(9).fill(''))
  const [players, setPlayers] = useState([])
  const [currentTurn, setCurrentTurn] = useState(null)
  const [status, setStatus] = useState('')
  const [gameOver, setGameOver] = useState(false)
  const [mySymbol, setMySymbol] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token =
      localStorage.getItem('accessToken') ||
      localStorage.getItem('token') ||
      localStorage.getItem('accesstoken')

    if (!token) {
      alert('Please sign in to play.')
      navigate('/signin')
      return
    }

    const s = io('http://localhost:5000/tic-tac-toe', {
      auth: { token },
      transports: ['websocket'],
    })
    setSocket(s)

    // ✅ Try auto rejoin
    const saved = JSON.parse(localStorage.getItem('tictactoe'))
    if (saved?.roomId && saved?.userId) {
      s.emit('rejoin', saved)
    }

    s.on('connect', () => {
      console.log('Connected to game server:', s.id)
      setStatus('Connected to game server')
    })

    s.on('rejoin-success', (data) => {
      setRoomId(data.roomId)
      setBoard(data.board)
      setPlayers(data.players)
      setCurrentTurn(data.currentTurn)
      const me = data.players.find((p) => p.socketId === s.id)
      setMySymbol(me ? me.symbol : null)
      setStatus('Rejoined successfully 🎮')
    })

    s.on('room-created', ({ roomId }) => {
      setStatus(`Room ${roomId} created. Waiting for opponent...`)
      localStorage.setItem('tictactoe', JSON.stringify({ roomId, userId: s.id }))
    })

    s.on('room-status', (data) => {
      setBoard(data.board || Array(9).fill(''))
      setPlayers(data.players || [])
      setCurrentTurn(data.currentTurn || null)
      setStatus('Room status updated')
      setGameOver(false)
    })

    s.on('update-board', (data) => {
      setBoard(data.board || [])
      setCurrentTurn(data.currentTurn || null)
    })

    s.on('game-over', ({ winner, board }) => {
      setBoard(board || [])
      setGameOver(true)
      setStatus(winner === 'draw' ? 'Game draw!' : `Winner: ${winner}`)
    })

    s.on('room-reset', (room) => {
      setBoard(room.board || Array(9).fill(''))
      setPlayers(room.players || [])
      setCurrentTurn(room.currentTurn || null)
      setGameOver(false)
      setStatus('Room reset. New game started!')
    })

    s.on('player-left', ({ message, players: updatedPlayers }) => {
      setPlayers(updatedPlayers || [])
      setStatus(message || 'Player left temporarily')
    })

    s.on('error', (err) => {
      console.error('Server error:', err)
      setStatus(err?.message || String(err))
    })

    return () => s.disconnect()
  }, [navigate])

  const createRoom = () => {
    if (!roomId.trim()) return alert('Enter room id')
    socket.emit('create-room', roomId)
  }

  const joinRoom = () => {
    if (!roomId.trim()) return alert('Enter room id')
    socket.emit('join-room', roomId)
    localStorage.setItem('tictactoe', JSON.stringify({ roomId, userId: socket.id }))
  }

  const makeMove = (idx) => {
    if (gameOver || !socket) return
    if (board[idx] !== '') return
    if (currentTurn !== socket.id) {
      alert('Not your turn!')
      return
    }
    socket.emit('make-move', { roomId, index: idx })
  }

  const resetRoom = () => {
    if (!roomId.trim()) return alert('Enter room id')
    socket.emit('reset-room', roomId)
  }

  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('token')
    localStorage.removeItem('tictactoe')
    if (socket) socket.disconnect()
    navigate('/signin')
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2>Tic Tac Toe — Verified Users</h2>
        <div>
          <span style={{ marginRight: 12 }}>{status}</span>
          <button onClick={logout} style={styles.logout}>Logout</button>
        </div>
      </header>

      <div style={styles.controls}>
        <input
          placeholder="room id"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          style={styles.input}
        />
        <button onClick={createRoom} style={styles.btn}>Create</button>
        <button onClick={joinRoom} style={styles.btn}>Join</button>
        <button onClick={resetRoom} style={styles.btn}>Reset</button>
      </div>

      <div style={{ marginTop: 12 }}>
        <strong>Your symbol: </strong>{mySymbol || '—'}
      </div>

      <div style={styles.board}>
        {board.map((cell, i) => (
          <div key={i} style={styles.cell} onClick={() => makeMove(i)}>
            {cell}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 12 }}>
        <strong>Players:</strong>
        <ul>
          {players.length > 0 ? (
            players.map((p) => (
              <li key={p.userId}>
                {p.userId} — {p.symbol || '—'}{' '}
                {p.socketId === (socket && socket.id) ? '(you)' : ''}
              </li>
            ))
          ) : (
            <li>Waiting for players...</li>
          )}
        </ul>

        <div style={{ marginTop: 8 }}>
          <strong>
            {gameOver
              ? status
              : currentTurn
              ? currentTurn === socket?.id
                ? 'Your turn'
                : 'Opponent’s turn'
              : 'Waiting for turn info...'}
          </strong>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: { padding: 20, fontFamily: 'Inter, sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  controls: { marginTop: 12, display: 'flex', gap: 8, alignItems: 'center' },
  input: { padding: 8, borderRadius: 6, border: '1px solid #ddd' },
  btn: { padding: '8px 12px', borderRadius: 6, border: 'none', background: '#2563eb', color: '#fff', cursor: 'pointer' },
  logout: { padding: '6px 10px', borderRadius: 6, border: 'none', background: '#ef4444', color: '#fff', cursor: 'pointer' },
  board: { display: 'grid', gridTemplateColumns: 'repeat(3, 100px)', gap: 8, marginTop: 16 },
  cell: { width: 100, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #333', fontSize: 28, cursor: 'pointer', borderRadius: 8 },
}
