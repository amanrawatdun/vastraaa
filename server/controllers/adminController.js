const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

const getSummary = async (req, res) => {
  try {
    const users=await User.find({isAdmin:false})
    const totalUsers = users.length;
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $match: { isPaid: true } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);
    const pendingOrders = await Order.countDocuments({ isDelivered: false });

    res.status(200).json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      pendingOrders
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch dashboard summary' });
  }
};

const getAllUser = async(req ,res)=>{
    try{
        const users =await User.find({isAdmin:false})
        res.json(users)
    }catch(error){
        return res.json({message:"not able to get data"})
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        

        // Check if user exists before deleting
        const existingUser = await User.findById(id);
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Delete the user
        await User.findByIdAndDelete(id);

        // Get updated list of users
        const allUsers = await User.find({isAdmin:false});
        
        res.json(allUsers);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Not able to delete" });
    }
};


module.exports = { getSummary,getAllUser , deleteUser};
