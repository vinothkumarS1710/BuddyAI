import Chat from "../models/Chat.js"


// Creating new chat
export const createChat = async (req, res) => {
    try {
        const userId = req.user._id

        const chatData = {
            userId,
            messages : [],
            name : "New Chat",
            userName : req.user.name
        }

        await Chat.create(chatData)
        res.json({success: true, message: "Chat Created"})
    } catch (err) {
        res.json({success: false, message: err.message});
    }
}


// Getting all chats
export const getChats = async (req, res) => {
    try {
        const userId = req.user._id
        const chats = await Chat.find({userId}).sort({ updatedAt: -1})      
        
        res.json({success: true, chats})
    } catch (err) {
        res.json({success: false, message: err.message});
    }
}


// Deleting all chats
export const deleteChat = async (req, res) => {
    try {
        const userId = req.user._id
        const {chatId} = req.body

        await Chat.deleteOne({_id: chatId, userId})
        
        res.json({success: true, message: "Chat Deleted"})
    } catch (err) {
        res.json({success: false, message: err.message});
    }
}