import crypto from "crypto"
import Transaction from "../models/Transaction.js"
import User from "../models/User.js"

export const razorpayWebhooks = async (req, res) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET
    const razorpaySignature = req.headers["x-razorpay-signature"];
    const generatedSignature = crypto.createHmac("sha256", webhookSecret).update(JSON.stringify(req.body)).digest("hex")

    if (generatedSignature !== razorpaySignature) {
      return res.status(400).json({success: false, message: "Invalid webhook signature"})
    }

    const event = req.body.event

    switch (event) {
      case "payment.captured": {
        const payment = req.body.payload.payment.entity
        const orderId = payment.order_id
        const paymentId = payment.id

        const transaction = await Transaction.findOne({razorpayOrderId: orderId})

        if (!transaction) {
          return res.json({success: true, message: "Transaction not found"})
        }

        if (transaction.isPaid) {
          return res.json({success: true, message: "Payment already processed"})
        }

        await User.findByIdAndUpdate(transaction.userId, {$inc: {credits: transaction.credits}}, {new: true})

        transaction.isPaid = true
        transaction.paymentId = paymentId
        await transaction.save()
        break;
      }

      default:
        break;
    }

    return res.status(200).json({success: true, received: true})

  } catch (error) {
      return res.status(500).json({success: false, message: error.message})
  }
}