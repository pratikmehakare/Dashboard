require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const socketio = require('socket.io');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoute');
const dashboardRoutes = require('./routes/dashboardRoute');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);

const server = http.createServer(app);
const io = socketio(server);

// Socket.io for real-time updates
io.on('connection', (socket) => {
  console.log('Client connected via Socket.io');
});

// Example: Poll Google Sheets data every 30 seconds and emit update
const { getSheetData } = require('./utils/googleSheets');
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const RANGE = 'Sheet1!A:Z';

setInterval(async () => {
  try {
    const data = await getSheetData(SPREADSHEET_ID, RANGE);
    io.emit('dataUpdate', data);
  } catch (error) {
    console.error('Error fetching Google Sheet data:', error);
  }
}, 30000);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
