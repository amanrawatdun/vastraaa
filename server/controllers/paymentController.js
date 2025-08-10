// paymentController.js
const razorpay = require("../config/razorpay");
const crypto = require('crypto');
const Order = require("../models/Order");


const createPaymentOrder = async (req, res) => {
   
    const { totalPrice, orderData } = req.body;
    const user = req.user;

    if (!user) {
        return res.status(401).json({ message: 'User not authenticated' });
    }

   
    if (!orderData || !orderData.orderItems || !orderData.shippingInfo) {
        return res.status(400).json({ message: 'Invalid order data received.' });
    }

    try {
      
        const newOrder = new Order({
            user: user._id,
            orderItems: orderData.orderItems,
            shippingInfo: orderData.shippingInfo,
            paymentMethod: orderData.paymentMethod,
            totalPrice: totalPrice,
            isPaid: false,
        });

      
        const options = {
            amount: totalPrice * 100, 
            currency: 'INR',
            receipt: newOrder._id.toString(),
            payment_capture: 1
        };
        const razorpayOrder = await razorpay.orders.create(options);
        
       
        newOrder.razorpayOrderId = razorpayOrder.id;
        await newOrder.save();

        res.status(201).json(razorpayOrder);
    } catch (error) {
        console.error('Error creating payment order:', error);
        res.status(500).json({ message: 'Payment order creation failed.', error: error.message });
    }
};



const verifyPayment = async(req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });

    if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found.' });
    }


    const generated_signature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(razorpay_order_id + '|' + razorpay_payment_id)
        .digest('hex');

 
    if (generated_signature === razorpay_signature) {
        try {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.razorpayPaymentId = razorpay_payment_id;
            order.razorpaySignature = razorpay_signature;
            await order.save();
            
            res.json({ success: true, message: 'Payment verified successfully.', order: order });
        } catch (error) {
            console.error('Error updating order after successful payment:', error);
            res.status(500).json({ success: false, message: 'Error updating order after successful payment.' });
        }
    } else {
        res.status(400).json({ success: false, message: 'Payment verification failed: Invalid signature.' });
    }
};

module.exports = {
    createPaymentOrder,
    verifyPayment
};