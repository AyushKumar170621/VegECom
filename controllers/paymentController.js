const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Razorpay = require('razorpay');
const dotenv = require("dotenv");
const crypto = require("crypto")
dotenv.config({path:'backend/config/config.env'});
const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET
  });
exports.checkout = catchAsyncErrors(async(req,res,next)=>{
    const options = {
      amount: Number(req.body.amount*100),  // amount in the smallest currency unit
      currency: "INR",
      
    };
    const order=await instance.orders.create(options);
    res.status(200).json({
        success:"true",order
    }) ; 
    
    })

exports.paymentVerification = catchAsyncErrors(async (req, res,next) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
  
    const body = razorpay_order_id + "|" + razorpay_payment_id;
  
    const expectedSignature = crypto
      .createHmac("sha256", 'E0VecQnPIooAgtwVEuJZ8i61')
      .update(body.toString())
      .digest("hex");
      const isAuthentic = expectedSignature === razorpay_signature;
  
      if (isAuthentic) {
        res.redirect(`http://localhost:3000/paymentsuccess?reffrence=${razorpay_payment_id}`
        );
      }
      else{
        res.status(400).json({
          success:false,
        });
      }
    
    })
    
exports.sendRazorApiKey = catchAsyncErrors(async (req,res,next)=>{
res.status(200).json({key:process.env.RAZORPAY_API_KEY});
});
