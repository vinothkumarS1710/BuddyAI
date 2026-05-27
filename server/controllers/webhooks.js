import crypto from "crypto"
import Transaction from "../models/Transaction.js"
import User from "../models/User.js"

export const razorpayWebhooks = async (request, response) => {

  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET
    const signature = request.headers["x-razorpay-signature"]
    const expectedSignature = crypto.createHmac("sha256", webhookSecret).update(JSON.stringify(request.body)).digest("hex")

    if (signature !== expectedSignature) {
      return response.status(400).json({
        success: false,
        message: "Invalid webhook signature",
      })
    }

    const event = request.body.event

    switch (event) {

      case "payment.captured": {
        const payment = request.body.payload.payment.entity
        const { transactionId, appId } = payment.notes

        if (appId === "buddyai") {
          const transaction = await Transaction.findOne({
            _id: transactionId,
            isPaid: false
        })

        if (!transaction) {
           return response.json({received: true, message: "Transaction already processed"})
        }

        await User.updateOne({_id: transaction.userId}, {$inc: {credits: transaction.credits}})
        transaction.isPaid = true
        transaction.paymentId = payment.id
        await transaction.save()

        console.log("Payment Captured Successfully")
        } else {
          return response.json({received: true, message: "Invalid app"})
        }
        break;
      }

      default:
        console.log("Unhandled event type:", event)
        break;
    }

    response.json({success: true, received: true})

    } catch (error) {

    console.error("Webhook Processing Error:", error)

    response.status(500).json({success: false, message: "Internal Server Error"})
  }
}