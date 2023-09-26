const mongoose = require("mongoose");

productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter product Name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"please enter product decription"]
    },
    price:{
        type:Number,
        required:[true,"please enter product price"],
        maxlength:[8,"price cannot exeed 8 characters"]
    },
    ratings:{
        type:Number,
        default:5
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"Please enter product category"]
    },
    stock:{
        type:Number,
        required:[true,"Please Enter Product stock"],
        maxlength:[4,"stock cannot exceed 4 digit number"],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:String,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model("Product",productSchema);