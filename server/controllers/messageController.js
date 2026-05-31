import axios from "axios"
import Chat from "../models/Chat.js"
import User from "../models/User.js"
import imagekit from "../configs/imageKit.js"
import openai from "../configs/openai.js"
import groq from "../configs/groq.js"
import rateLimit from 'express-rate-limit'



// Text based AI chat message
export const textMessageController = async (req, res) => {
    try {
        const userId = req.user._id

        if (req.user.credits < 1) {
            return res.json({success: false, message: "You don't have enough credits to use this feature"})
        }

        const { chatId, prompt } = req.body
        const chat = await Chat.findOne({ userId, _id: chatId })

        if (!chat) {
            return res.status(404).json({success: false, message: "Chat not found"})
        }
  
        chat.messages.push({
            role: "user",
            content: prompt,
            timestamp: Date.now(),
            isImage: false
        })

        const messages = chat.messages.filter(msg => !msg.isImage).map(msg => ({role: msg.role, content: msg.content}))

        let completion
        let provider = "Gemini"

        try{
            completion = await openai.chat.completions.create({
                model: "gemini-2.0-flash",
                messages,
            })

        }catch(err) {

            if (err?.status === 429 || err?.status === 503 || err?.code === 429) {

                provider = "Groq"
                completion = await groq.chat.completions.create({
                    model: "llama-3.3-70b-versatile",
                    messages,
                })

            }else{
                throw err
            }
        }

        const reply = {
            role: "assistant",
            content: completion.choices[0].message.content,
            timestamp: Date.now(),
            isImage: false,
            provider,
        }

        chat.messages.push(reply)
        await chat.save()
        await User.updateOne({_id: userId}, {$inc: {credits: -1}})

        return res.json({success: true, reply})

    } catch (err) {
        return res.status(err.status || 500).json({success: false, message: err.message || "Something went wrong"})
    }
}

// Image Genaration
export const imageMessageController = async (req, res) => {
    try {
        const userId = req.user._id;

        if (req.user.credits < 2) {
            return res.json({success: false, message: "You don't have enough credits to use this feature"})
        }

        const {prompt, chatId, isPublished} = req.body

        const chat = await Chat.findOne({userId, _id: chatId})
        if (!chat) {
            return res.status(404).json({ success: false, message: "Chat not found" })
        }
        chat.messages.push({
            role : "user", 
            content : prompt, 
            timestamp : Date.now(),
            isImage : false
        });

        const encodedPrompt = encodeURIComponent(prompt)
        const generatedImageUrl = `${process.env.IMAGEKIT_URL_ENDPOINT}/ik-genimg-prompt-${encodedPrompt}/buddyai/${Date.now()}.png?tr=w-800,h-800`;
        const aiImageResponse =  await axios.get(generatedImageUrl, {responseType: "arraybuffer"})
        const base64image = `data:image/png;base64,${Buffer.from(aiImageResponse.data,"binary").toString('base64')}`;
        const uploadResponse = await imagekit.files.upload({file : base64image, fileName : `${Date.now()}.png`, folder : "BuddyAI"})
        const reply = {role : 'assistant', content : uploadResponse.url, timestamp : Date.now(), isImage : true, isPublished}
        
        res.json({success: true, reply})

        chat.messages.push(reply)
        await chat.save()
        await User.updateOne({_id: userId}, {$inc: {credits: -2}})



    } catch (err) {
        res.json({success: false, message: err.message})
    }
}


// Text Limiter
export const textLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 15,
  message: {success: false, message: "Too many requests. Please wait."},
  standardHeaders: true,
  legacyHeaders: false,
})


// Image limiter
export const imageLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: {success: false, message: "Image limit exceeded. Try again later."}
})