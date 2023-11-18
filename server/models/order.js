import { Schema, model } from "mongoose";

const orderschema = new Schema ({
   user:{
    type: Schema.Types.ObjectId,
    ref: 'User',
   } ,
   product:{
    type: Schema.Types.ObjectId,
    ref: 'product',
   },
   shipingaddress:{
   type:String,
    require:true
   },
   status:{
    type:String,
    default:"pending"
   },
   quentity:{
      type:Number,
    default: 1
   },
   deliverycharge:{
      type:Number,
       require:true
      },
})

const order = model("order", orderschema);
export default order