const Chat = require('../models/chat');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {

    const username = req.body.username
    const message = req.body.message
    const routename = req.body.routename

    try {

        let chat = await Chat.findOne({ route: routename });
        if (!chat) {
            chat = new Chat({ route: routename });
        }

        
        const newMessage = {
            sender: username,
            message: message
        };


        chat.messages.push(newMessage);

        await chat.save();
        res.status(201).json({ message: "Created successfully"});
    }
    catch (error) {

        console.error('Error saving message:', error);
        res.status(400).json({ message: error.message });
    }

})

module.exports = router