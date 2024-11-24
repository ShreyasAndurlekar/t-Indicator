const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

require('dotenv').config();

const app = express();
const port = 5000;

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


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
