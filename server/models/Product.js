import { Schema, model } from "mongoose";


const productschema = new Schema({
    title:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true,
    },
    image:{
        type:String,
        require:true,
    },
    price:{
        type:String,
        require:true,
    },
    category:{
        type:String,
        require:true,
    },
    brand:{
        type:String,
        require:true,
    }
},
{
    timestamps:true,
}
)

const product = model("product", productschema)
export default product