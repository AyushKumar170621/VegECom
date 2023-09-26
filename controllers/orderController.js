const Order = require("../models/orderModal");
const Product = require("../models/productModal");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");


//create new errors
exports.newOrder = catchAsyncErrors( async(req,res,next) =>{
    const {shippingInfo,orderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice}  = req.body;
    console.log(req.user._id)
    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id,
    });

    res.status(201).json({
        success:true,
        order,
    })
})

//get single order 

exports.getSingleOrder = catchAsyncErrors( async(req,res,next) =>{
    const order = await Order.findById(req.params.id).populate("user","name email");
    if(!order)
    {
        return next(new ErrorHandler("Order Not Found",404));
    }
    res.status(200).json({
        success:true,
        order,
    })

})


//get logged user order 

exports.myOrders = catchAsyncErrors( async(req,res,next) =>{
    const orders = await Order.find({user:req.user._id});
    res.status(200).json({
        success:true,
        orders,
    })

})

//get all orders --admin

exports.getAllOrders = catchAsyncErrors( async(req,res,next) =>{
    const order = await Order.find();
    let totalAmout=0;
    order.forEach( order => {
        totalAmout+=order.totalPrice;
    })
    res.status(200).json({
        success:true,
        totalAmout,
        order,
    });

});

//update Order status --admin

exports.updateOrder = catchAsyncErrors( async (req,res,next) =>{
    const order = await Order.findById(req.params.id);
    if(!order)
    {
        return next(new ErrorHandler("Order Not Found",404));
    }
    if(order.orderStatus ==="Delivered")
    {
        return next (new ErrorHandler("You have already delivered this product",404));
    }
    order.orderItems.forEach(async(order) => {
        await updateStock(order.product,order.quantity);
    })
    order.orderStatus=req.body.status;
    if(req.body.status === "Delivered")
    {
        order.deliveredAt=Date.now();
    }
    await order.save({validateBeforeSave:false});
    res.status(200).json({
        success:true,
    });

});

async function updateStock(id,quantity)
{
    const product = await Product.findById(id);
    product.stock -= quantity;
    await product.save({validateBeforeSave:false});
}

//delete Order --admin

exports.deleteOrder = catchAsyncErrors( async(req,res,next) =>{
    const order = await Order.findById(req.params.id);
    if(!order)
    {
        return next(new ErrorHandler("Order Not Found",404));
    }
    await Order.findByIdAndRemove(req.params.id);
    res.status(200).json({
        success:true
    });

});