const mongoose=require('mongoose');
const mailSender=require('../utils/mailSender');
const otpTemplate=require('../mail/templates/emailVerificationTemplate');
//otpSchema
const otpSchema=new mongoose.Schema({
  email:{
    type:String,
    required:true,
  },
  otp:{
    type:String,
    required:true,
  },
  createdAt:{
    type:Date,
    default:Date.now(),
    expires:20*60,
  }
});




otpSchema.pre("save",async function(next){
  await sendVerificationEmail(this.email,this.otp);
  next();
});

// otpSchema.pre("save", async function(next) {
//   // custom logic here
//   next();
// });

module.exports=mongoose.model("OTP",otpSchema);