const Order = require("../models/Order");

const createOrder = async(req ,res)=>{

  const {orderItems , shippingInfo , paymentMethod , totalPrice}= req.body;
  
    if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: 'No items in order' });
  }

  const order = new Order({
    user: req.user._id,
    orderItems,
    shippingInfo,
    paymentMethod,
    totalPrice
  });
  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
}



const getUserOrders = async(req ,res)=>{
    const orders = await Order.find({user:req.user._id});
    res.json(orders);
}

// for admin
const getAllOrders = async(req ,res)=>{
    const orders = await Order.find({}).populate('user', 'name email')
    res.json(orders);
}

const markAsPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.isPaid = true;
    order.paidAt = Date.now();
    const updated = await order.save();
    const newData = await Order.find({}).populate('user', 'name email');
    res.json(newData);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const markAsDelivered = async (req, res) => {
  try {
   
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

  console.log("deleivered",order);

    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updated = await order.save();
    const newData = await Order.find({}).populate('user', 'name email');
    console.log(newData);
    res.json(newData);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteOrder = async(req , res)=>{

  try{
     const order = await Order.findById(req.params.id);
    console.log(order);

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  await Order.findByIdAndDelete(req.params.id)

  const orders = await Order.find({})
  res.json(orders);
  }catch(error){
     res.status(500).json({ message: 'Server error' });
  }
}



module.exports = {
    createOrder,
    getUserOrders,
    getAllOrders,
    markAsPaid,
    markAsDelivered,
    deleteOrder
}