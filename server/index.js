import Express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()
import User from "./models/User.js";
import product from "./models/product.js";
import order from "./models/order.js";
// import order from "./models/order.js";

const app = Express();
app.use(Express.json());

const PORT = process.env.PORT || 5000;

const connectDB = async () => {
    const connection = await mongoose.connect(process.env.MONGODB_URI)
    if (connection) {
        console.log(`mongoDB connected`)
    }
};

// signup
app.post("/signup", async (req, res) => {
    const { name, email, mobile, address, password, gender } = req.body;
    const newUser = new User({
        name,
        email,
        mobile,
        address,
        password,
        gender,
    });

    try {
        const saveuser = await newUser.save();
        res.json({
            success: true,
            data: saveuser,
            message: "user created successfully."

        })
    } catch (e) {
        res.json({
            success: false,
            message: e.message
        })
    }
}
)

// post login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({
            success: false,
            message: "invalid email and password"
        })
    }

    const user = await User.findOne({
        email: email,
        password: password
    })
    if (user) {
        res.json({
            success: true,
            data: user,
            message: "login succesfull"
        })
    }
    else {
        res.json({
            success: false,

            message: "invalid data"
        })
    }
})

// post product
app.post("/product", async (req, res) => {
    const { title, description, image, price, brand } = req.body;

    const newproduct = new product({
        title: title,
        description: description,
        price: price,
        image: image,
        brand: brand,

        // title,
        // description,
        // price,
        // image,
        // brand,
    });

    try {
        const saveproduct = await newproduct.save();
        res.json({
            success: true,
            data: saveproduct,
            message: "new product created successfully."

        })
    }
    catch (e) {
        res.json({
            success: false,
            message: e.message
        })
    }

})

// get products
app.get("/products", async (req, res) => {
    const products = await product.find()


    res.json({
        success: true,
        data: products,
        message: `successfully find all data. `,

    });
})

// get product
app.get("/product/:_id", async (req, res) => {
    const { _id } = req.params;
    const product1 = await product.findById(_id);
    res.json({
        success: true,
        data: product1,
        message: `successfully find one product data. `,
    });
})

// delet product
app.delete("/product/:_id", async (req, res) => {
    const { _id } = req.params;
    const product1 = await product.deleteOne({ _id: _id })
    res.json({
        success: true,
        data: product1,
        message: `successfully deleted one product data. `,
    });
})

// get product search
app.get("/products/search", async (req, res) => {
    const { q } = req.query;
    try {
        const product1 = await product.find({ title: { $regex: q, $options: "i" } })
        res.json({
            success: true,
            data: product1,
            message: `successfully searched product. `,
        });
    }
    catch (e) {
        res.json({
            success: false,
            message: e.message
        })
    }
})

// post order 
app.post("/order", async (req, res) => {
    const { user, product, shipingaddress, status, quentity , deliverycharge} = req.body;

    const neworder = new order({
        user,
        product,
        shipingaddress,
        status,
        quentity,
        deliverycharge
    })
   try{
    const order1 = await neworder.save();
    res.json({
        success: true,
        data: order1,
        message: "new order  successfully."
    })
   }
   catch (e) {
    res.json({
        success: false,
        message: e.message
    })
}
 
})

// get order
app.get("/order/:_id", async (req, res) => {
    const {_id} = req.params;
    
    try{
        const order1 = await order.findById(_id).populate("user product");

    // order.user.password = undefined;

    res.json({
        success:true,
        data:order1,
        message:"one product fatched successfully."
    })
    } 
    catch (e) {
        res.json({
            success: false,
            message: e.message
        });

}});

// get orders
app.get("/orders", async (req, res) => {
    const order1 = await order.find().populate("user product");
    order1.forEach((order) => {
        order.user.password = undefined;
    })
    res.json({
        success:true,
        data:order1,
        message:"all product fatched successfully."
    })
})

// get /order/user/:_id
app.get("/orders/user/:_id", async (req, res) => {
  const {_id} = req.params;
  const order1 = await order.find({user: _id}).populate("user product")

  res.json({
    success:true,
    data:order1,
    message: "order fatched successfully"
  });
})

// get /order/status/:_id
 app.patch("/order/status/:_id", async(req, res) => {
    const {_id} = req.params;
    const {status} = req.body;

    const STATUS_BADAGE_COLOUR_MAP = {
        pending: 0,
        shipped: 1,
        delivered: 2,
        returned: 3,
        cancelled: 4,
        rejected: 5
    }
    const order2 = await order.findById(_id);
    const currentStatus = order2.status;

    const currentPriority = STATUS_BADAGE_COLOUR_MAP[currentStatus];
    const newPriority = STATUS_BADAGE_COLOUR_MAP[status];

    if(currentPriority> newPriority){
        return res.json({
            success: false,
            message: `${status} can not be set order is ${currentStatus}`
        })
    }

    try{
        const order1= await order.updateOne({_id:_id}, {$set:{status: status}});
        res.json({
            success:true,
            data:order1,
            message: "status put  successfully"
          });
    }
    catch (e) {
        res.json({
            success: false,
            message: e.message
        });

    }
 })


// get /orders



app.listen(PORT, () => {
    console.log(`server is runing ${PORT}`)
    connectDB();
})


