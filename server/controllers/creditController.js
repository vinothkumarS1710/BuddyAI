import Transaction from "../models/Transaction.js"
import razorpay from "../configs/razorpay.js"
import crypto from "crypto"
import short from 'short-uuid'

const plans = [
    {
            _id: "basic",
            name: "Basic",
            price: 29,
            credits: 100,
            features: ['100 text generations', '50 image generations', 'Standard support', 'Access to basic models']
        },
        {
            _id: "pro",
            name: "Pro",
            price: 99,
            credits: 500,
            features: ['500 text generations', '200 image generations', 'Priority support', 'Access to pro models', 'Faster response time']
        },
        {
            _id: "premium",
            name: "Premium",
            price: 199,
            credits: 1000,
            features: ['1000 text generations', '500 image generations', '24/7 VIP support', 'Access to premium models', 'Dedicated account manager']
        }
];


// Getting all plans
export const getPlans = async (req, res) => {
    try {
        res.json({success: true, plans})
    } catch (err) {
        res.json({success: false, message: err.message})
    }
};

// Purchasing a plan
export const purchasePlan = async (req, res) => {
    try {
        const { planId } = req.body
        const userId = req.user._id
        const plan = plans.find(plan => plan._id === planId)
        // const receipt = short.new()

        if (!plan) {return res.json({success: false, message: "Invalid plan"})}

        const transaction = await Transaction.create({
            userId,
            planId: plan._id,
            amount: plan.price,
            credits: plan.credits,
            isPaid: false
        })

        const options = {
            amount: plan.price*100,
            currency: "INR",
            receipt: transaction._id.toString(),
            notes: {transactionId: transaction._id.toString(), userId: userId.toString()}
        }

        const order = await razorpay.orders.create(options)

        res.json({success: true, order})

    } catch (err) {
        res.json({success: false,message: err.message})

    }
}

