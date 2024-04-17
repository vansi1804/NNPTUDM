const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var cartSchema = new mongoose.Schema(
    {
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                },
                count: Number,
                color: String,
                price: Number,
                title: String,
                images: [{
                    public_id: String,
                    url: String,
                }],
            },
        ],
        cartTotal: Number,
        isDiscount: {
            type: Boolean,
            default: false,
        },
        totalAfterDiscount: Number,
        orderby: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

//Export the model
module.exports = mongoose.model("Cart", cartSchema);
