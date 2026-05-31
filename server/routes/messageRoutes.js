import express from 'express'
import { protect } from '../middlewares/auth.js'
import { imageMessageController, textMessageController, textLimiter, imageLimiter } from '../controllers/messageController.js'


const messageRouter = express.Router()

messageRouter.post('/text', textLimiter, protect, textMessageController)
messageRouter.post('/image', imageLimiter, protect, imageMessageController)

export default messageRouter;