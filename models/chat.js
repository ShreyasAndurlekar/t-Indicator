const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({

    sender: String,
    message: {

        type: String,
        maxLength: 50
    },
    createdAt: {

        type: Date,
        default: () => Date.now()
    }
})

const chatSchema = new mongoose.Schema({

    route : String,
    messages: {
        
        type: [messageSchema],
        required: true

    }
})

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;