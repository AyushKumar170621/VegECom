const app = require("./app");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const connectDatebase = require("./config/database");

process.on("uncaughtException",err => {
    console.log("Error :",err.message);
    console.log("shutting down the server due to uncaught error");
    process.exit(1);
})
dotenv.config({path:'backend/config/config.env'});
connectDatebase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
const server = app.listen(process.env.PORT, ()=>{
    console.log("Server is running on port :",process.env.PORT);

});

//unhandled Promise rejection
process.on("unhandledRejection", err =>{
    console.log(`Error : ${err.message}`);
    console.log("sutting down the server due to Unhandled Rejection");
    server.close(()=>{
        process.exit(1);
    });
});