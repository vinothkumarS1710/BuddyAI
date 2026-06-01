import crypto from "crypto"
import Transaction from "../models/Transaction.js"
import User from "../models/User.js"

export const razorpayWebhooks = async (req, res) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET
    const signature = req.headers["x-razorpay-signature"]
    const expectedSignature = crypto.createHmac("sha256", webhookSecret).update(req.body).digest("hex")

    if (signature !== expectedSignature) {
      return res.status(400).json({success: false, message: "Invalid signature"})
    }

    const body = JSON.parse(req.body.toString())

    switch (body.event) {
      case "payment.captured": {
        const payment = body.payload.payment.entity
        const transaction = await Transaction.findOne({razorpayOrderId: payment.order_id})

        if (!transaction) {
          return res.status(404).json({success: false, message: "Transaction not found"})
        }

        if (transaction.isPaid) {
          return res.status(200).json({success: true, message: "Already processed"})
        }

        transaction.isPaid = true
        transaction.paymentId = payment.id
        await transaction.save()
        await User.findByIdAndUpdate(transaction.userId, {$inc: {credits: transaction.credits}})
        break;
      }

      case "payment.failed": {
        const payment = body.payload.payment.entity
        const transaction = await Transaction.findOne({razorpayOrderId: payment.order_id})

        if (transaction) {
          transaction.isPaid = false
          await transaction.save()
        }

        break;
      }

      default:
        console.log(`Unhandled Event: ${body.event}`)
    }

    return res.status(200).json({success: true})
  } catch (error) {
      return res.status(500).json({success: false, message: error.message})
  }
}