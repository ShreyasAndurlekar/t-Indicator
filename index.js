const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const http = require('http');
const { Server } = require('socket.io');

const Chat = require('./models/chat');

require('dotenv').config();

const app = express();
const port = 5000;
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*', methods: ['GET', 'POST'] } });

const limiter = rateLimit({
    windowMs: 5 * 60 * 60 * 1000,  
    max: 20, 
    message: {
      status: 429,
      error: 'Too many requests',
      message: 'Too many requests from this IP, please try again later.'
    }
  });
  
app.use(limiter);
app.use(cors());
app.use(express.json());

const dbURI = process.env.DATABASE_URL;

mongoose.connect(dbURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));

const accountsRouter = require('./routes/accounts');
const authRouter = require('./routes/auth');
const sendRouter = require('./routes/send');
const messagesRouter = require('./routes/messages');
const nearRouter = require('./routes/near')
const displayRouter = require('./routes/display')
const timeRouter = require('./routes/time')


app.use('/', displayRouter);
app.use('/accounts', accountsRouter);
app.use('/auth', authRouter);
app.use('/messages', messagesRouter);
app.use('/send', sendRouter);
app.use('/near', nearRouter);
app.use('/time',timeRouter)


io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('join_room', (room) => {
    socket.join(room);
    console.log(`Socket ${socket.id} joined room ${room}`);
  });

  socket.on('send_message', async (data) => {
    const { route, sender, message } = data;

    try {
      const newMsg = {
        sender,
        message,
        createdAt: new Date()
      };

      // Find the chat document for that route
      let chatDoc = await Chat.findOne({ route });

      if (!chatDoc) {
        // If it doesn't exist, create it
        chatDoc = new Chat({ route, messages: [newMsg] });
      } else {
        // Else push to existing array
        chatDoc.messages.push(newMsg);
      }

      await chatDoc.save();

      // Emit just the new message to that room
      io.to(route).emit('receive_message', newMsg);
    } catch (err) {
      console.error('Error saving message:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


