const Chat = require('../models/chat');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {

    const { routename } = req.query
    
    try {
        
        const chats = await Chat.find({ route: routename })
        res.status(201).json(chats);
    }
    catch(error){

        console.error(error)
        res.status(400).json({ message: error.message });
    }

})

module.exports = router