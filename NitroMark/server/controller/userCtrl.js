const User = require("../models/userModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const Coupon = require("../models/coupomModel");
const Order = require("../models/orderModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../configs/jwtToken");
const { generateRefreshToken } = require("../configs/refreshToken");
const validateMongoDbId = require("../utils/validateMongodbId");
const jwt = require("jsonwebtoken");
const sendMail = require("./emailCtrl");
const crypto = require("crypto");
var uniqid = require("uniqid");

const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email: email });

    if (!findUser) {
        // Create new User
        const newUser = await User.create(req.body);
        res.json(newUser);
    } else {
        // User already exist
        throw new Error("User already exist");
    }
});

// login
const loginUserCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // kiểm tra xem người dùng có tồn tại hay không bằng cách tìm kiếm trong cơ sở dữ liệu
    const user = await User.findOne({ email });
    if (!user) {
        // throw new Error("Invalid email or password");
        return res.status(400).json({ message: "Invalid email or password" });
    }

    // kiểm tra xem mật khẩu có khớp không
    const isMatch = await user.isPasswordMatched(password);
    if (!isMatch) {
        // throw new Error("Invalid email or password");
        return res.status(400).json({ message: "Invalid email or password" });
    }

    // tạo một refreshToken mới và lưu vào database
    const refreshToken = generateRefreshToken(user._id);
    user.refreshToken = refreshToken;
    await user.save();

    // gửi cookie refreshToken đến trình duyệt của người dùng
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000, // thời gian sống của cookie
    });
    // gửi phản hồi HTTP về thông tin người dùng
    res.json({
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        mobile: user.mobile,
        token: refreshToken,
    });
});

//admin login
const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // check if user exists or not
    const findAdmin = await User.findOne({ email });
    if (!findAdmin || findAdmin.role !== "admin") {
        throw new Error("Not authorized");
    }
    if (await findAdmin.isPasswordMatched(password)) {
        const refreshToken = generateRefreshToken(findAdmin._id);
        const updatedUser = await User.findByIdAndUpdate(
            findAdmin._id,
            { refreshToken },
            { new: true }
        );
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true, secure: true,
            path: "/admin",
            maxAge: 72 * 60 * 60 * 1000, // thời gian sống của cookie
        });
        res.json({
            _id: findAdmin._id,
            firstname: findAdmin.firstname,
            lastname: findAdmin.lastname,
            email: findAdmin.email,
            mobile: findAdmin.mobile,
            token: refreshToken,
        });
    } else {
        throw new Error("Invalid credentials");
    }
});

//refreshToken
const handleRefreshToken = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    // console.log(req.cookies);
    if (!refreshToken) throw new Error("No Refresh Token in Cookies");

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        // console.log(user);
        if (!user || user.refreshToken !== refreshToken) {
            throw new Error("Invalid Refresh Token");
        }
        const accessToken = generateToken(user.id);
        res.json({
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            mobile: user.mobile,
            role: user.role,
            token: accessToken,
        });
        console.log(1);
    } catch (error) {
        throw new Error("Invalid Refresh Token 2");
    }
});
//logout 
const logout = asyncHandler(async (req, res) => {
    res.clearCookie("refreshToken", {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "none",
        expires: new Date(0),
    });
    res.status(200).json({
        message: "Signout successfully...!",
    });
})


//update user 
const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    // console.log(id);
    validateMongoDbId(id);
    try {
        const user = await User.findByIdAndUpdate(id, req?.body, { new: true });
        // console.log(user);
        res.status(200).json(user);
    } catch (error) {
        throw new Error(error)
    }
})


//Get all user 
const getAllUser = asyncHandler(async (req, res) => {
    try {
        const getUsers = await User.find();
        res.json(getUsers);

    } catch (error) {
        throw new Error(error);
    }
})

//get user
const getUser = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        validateMongoDbId(id);

        const user = await User.findById(id)

        res.json({ user })

    } catch (error) {
        throw new Error(error);
    }
});



// save user Address
const saveAddress = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    validateMongoDbId(_id);

    try {
        const updatedUser = await User.findByIdAndUpdate(
            _id,
            {
                address: req?.body?.address,
            },
            {
                new: true,
            }
        );
        res.json(updatedUser);
    } catch (error) {
        throw new Error(error);
    }
});


//delete user
const deleteUser = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        validateMongoDbId(id);
        const user = await User.findByIdAndDelete(id)

        res.json({ user })

    } catch (error) {
        throw new Error(error);
    }
});

// block user
const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log(id);
    validateMongoDbId(id);
    try {
        const blockUser = await User.findByIdAndUpdate(
            id,
            {
                isBlocked: true,
            },
            {
                new: true,
            }
        );
        res.json({
            message: "User blocked"
        })
    } catch (error) {
        throw new Error(error);
    }
});

//unblock user
const unblockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const blockUser = await User.findByIdAndUpdate(id, {
            isBlocked: false
        }, { new: true });
        res.json({
            message: "User unblocked"
        })
    } catch (error) {
        throw new Error(error);
    }
})


// update passwork
const updatePassword = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { password } = req.body;
    validateMongoDbId(_id);
    const user = await User.findById(_id);
    if (password) {
        user.password = password;
        const updatedPassword = await user.save();
        res.json(updatedPassword);
    } else {
        res.json(user);
    }
})

// forgot Password
const forgotPasswordToken = asyncHandler(async (req, res) => {
    const { email } = req.body;;
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    try {
        const token = await user.createPasswordResetToken();
        await user.save();
        const resetUrl = `http://localhost:3000/reset-password/${token}`;
        const data = {
            to: email,
            text: `Reset Your Password`,
            subject: "Forgot Password Link",
            htm: resetUrl
        }
        sendMail(data);
        res.json(token);
    } catch (error) {
        throw new Error(error);
    }
})


//Reset Password
const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    console.log(password);
    const { token } = req.params;
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) throw new Error("Token Expired, Please try again!!!");
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.json(user);
});


//get wist list
const getWishlist = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    try {
        const findUser = await User.findById(_id).populate({ path: "wishlist" });
        const wishlist = findUser.wishlist;
        res.json(wishlist);
    } catch (error) {
        throw new Error(error);
    }
});

const userCart = asyncHandler(async (req, res) => {
    const { cart } = req.body;
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        let products = [];
        const user = await User.findById(_id);

        //check if cart already exists
        const alreadyExistCart = await Cart.findOne({ orderby: user._id });
        if (alreadyExistCart) {
            products = alreadyExistCart.products;
            for (let i = 0; i < cart.length; i++) {
                const existingProductIndex = products.findIndex(
                    (product) =>
                        product.product.toString() === cart[i]._id.toString() &&
                        product.color === cart[i].color
                );
                if (existingProductIndex !== -1) {
                    products[existingProductIndex].count =
                        products[existingProductIndex].count + cart[i].count;
                    console.log(products[existingProductIndex].count);
                } else {
                    const getPrice = await Product.findById(cart[i]._id).select(
                        "price title images"
                    );
                    const newProduct = {
                        product: cart[i]._id,
                        count: cart[i].count,
                        color: cart[i].color,
                        images: getPrice.images,
                        title: getPrice.title,
                        price: getPrice.price,
                    };
                    products.push(newProduct);
                }
            }
            const cartTotal = calculateCartTotal(products);
            alreadyExistCart.products = products;
            alreadyExistCart.cartTotal = cartTotal;
            const updatedCart = await alreadyExistCart.save();
            res.json(updatedCart);
        } else {
            for (let i = 0; i < cart.length; i++) {
                const getPrice = await Product.findById(cart[i]._id).select(
                    "price title images"
                );
                const newProduct = {
                    product: cart[i]._id,
                    count: cart[i].count,
                    color: cart[i].color,
                    images: getPrice.images,
                    title: getPrice.title,
                    price: getPrice.price,
                };
                products.push(newProduct);
            }
            const cartTotal = calculateCartTotal(products);
            const newCart = await new Cart({
                products,
                cartTotal,
                orderby: user._id,
            }).save();
            res.json(newCart);
        }
    } catch (error) {
        throw new Error(error);
    }
});

function calculateCartTotal(products) {
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
        cartTotal += products[i].price * products[i].count;
    }
    return cartTotal;
}

const removeProductFromCart = asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log(req.params);
    const { _id } = req.user;
    validateMongoDbId(id);
    validateMongoDbId(_id);
    try {
        const user = await User.findById(_id);
        const cart = await Cart.findOne({ orderby: user._id });
        if (!cart) {
            throw new Error("Cart not found");
        }
        const updatedProducts = cart.products.filter(
            (product) =>
                product.product.toString() !== id
        );
        const cartTotal = calculateCartTotal(updatedProducts);
        cart.products = updatedProducts;
        cart.cartTotal = cartTotal;
        const updatedCart = await cart.save();
        res.json(updatedCart);
    } catch (error) {
        throw new Error(error);
    }
});

const updateProductFromCart = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    const { _id } = req.user;
    validateMongoDbId(id);
    validateMongoDbId(_id);
    try {
        const user = await User.findById(_id);
        const cart = await Cart.findOne({ orderby: user._id });
        if (!cart) {
            throw new Error("Cart not found");
        }
        const updatedProduct = cart.products.find(
            (product) => product.product.toString() === id
        );
        if (updatedProduct) {
            updatedProduct.count = quantity;
            const cartTotal = calculateCartTotal(cart.products);
            cart.cartTotal = cartTotal;
            const updatedCart = await cart.save();
            res.json(updatedCart);
        } else {
            throw new Error("Product not found in cart");
        }
    } catch (error) {
        throw new Error(error);
    }
});

//user cart
// const userCart = asyncHandler(async (req, res) => {
//     const { cart } = req.body;
//     const { _id } = req.user;
//     validateMongoDbId(_id);
//     try {
//         let products = [];
//         const user = await User.findById(_id);

//         //check exist cart or not
//         const alreadyExistCart = await Cart.findOne({ orderby: user._id });
//         if (alreadyExistCart) {
//             alreadyExistCart.remove();
//         }
//         console.log(alreadyExistCart);
//         for (let i = 0; i < cart.length; i++) {
//             let object = {};
//             object.product = cart[i]._id;
//             object.count = cart[i].count;
//             object.color = cart[i].color;
//             let getPrice = await Product.findById(cart[i]._id).select('price title images').exec();
//             object.images = getPrice.images
//             object.title = getPrice.title;
//             object.price = getPrice.price;
//             products.push(object);
//         }
//         let cartTotal = 0;
//         for (let i = 0; i < products?.length; i++) {
//             // console.log(products[i].price);
//             // console.log(products[i].count);
//             cartTotal = cartTotal + products[i].price * products[i].count;
//         }

//         let newCart = await new Cart({
//             products,
//             cartTotal,
//             orderby: user?._id,
//         }).save();
//         console.log(newCart);
//         res.json(newCart);
//     } catch (error) {
//         throw new Error(error);
//     }
// });

const getUserCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        const cart = await Cart.findOne({ orderby: _id }).populate(
            "products.product"
        );
        res.json(cart);
    } catch (error) {
        throw new Error(error);
    }
});

const emptyCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        const user = await User.findOne({ _id });
        const cart = await Cart.findOneAndRemove({ orderby: user._id });
        res.json(cart);
    } catch (error) {
        throw new Error(error);
    }
});


const applyCoupon = asyncHandler(async (req, res) => {
    const { coupon } = req.body;
    console.log(coupon);
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        const validCoupon = await Coupon.findOne({ name: coupon });
        if (validCoupon === null) {
            throw new Error("Invalid Coupon");
        }

        const user = await User.findOne({ _id });

        let { cartTotal, isDiscount } = await Cart.findOne({
            orderby: user._id,
        }).populate("products.product");
        console.log(cartTotal);
        if (isDiscount === true) {
            throw new Error("You already use coupon");
        } else {

            let totalAfterDiscount = (
                cartTotal -
                (cartTotal * validCoupon.discount) / 100
            ).toFixed(2);

            await Cart.findOneAndUpdate(
                { orderby: user._id },
                { totalAfterDiscount, isDiscount: true },
                { new: true }
            );

            res.json(totalAfterDiscount);
        }
    } catch (error) {
        throw new Error(error);
    }
});

const createOrder = asyncHandler(async (req, res) => {
    const { COD, couponApplied, note, address, sendTo, phone } = req.body;
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        if (!COD) throw new Error("Create cash order failed");
        const user = await User.findById(_id);
        let userCart = await Cart.findOne({ orderby: user._id });
        let finalAmout = 0;
        if (couponApplied && userCart.totalAfterDiscount) {
            finalAmout = userCart.totalAfterDiscount;
        } else {
            finalAmout = userCart.cartTotal;
        }

        let newOrder = await new Order({
            products: userCart.products,
            paymentIntent: {
                id: uniqid(),
                method: "COD",
                amount: finalAmout,
                status: "Cash on Delivery",
                created: Date.now(),
                currency: "usd",
                address: address,
                note: note,
                sendTo: sendTo || user.lastname,
                phone: phone
            },
            orderby: user._id,
            orderStatus: "Cash on Delivery",
        }).save();
        let update = userCart.products.map((item) => {
            return {
                updateOne: {
                    filter: { _id: item.product._id },
                    update: { $inc: { quantity: -item.count, sold: +item.count } },
                },
            };
        });
        const updated = await Product.bulkWrite(update, {});
        await Cart.deleteMany({ orderby: req.user._id });
        res.json({ message: "success" });
    } catch (error) {
        throw new Error(error);
    }
});

const getOrders = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);

    try {
        const userorders = await Order.find({ orderby: _id })
            .populate("products.product")
            .populate("orderby")
            .exec();

        res.json(userorders);
    } catch (error) {
        throw new Error(error);
    }
});

const getAllOrders = asyncHandler(async (req, res) => {
    try {
        const alluserorders = await Order.find()
            .populate("products.product")
            .populate("orderby")
            .exec();
        res.json(alluserorders);
    } catch (error) {
        throw new Error(error);
    }
});
const getOrderByUserId = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const userorders = await Order.findById(id)
            .populate("products.product")
            .populate("orderby")
            .exec();
        // console.log(userorders);
        res.json(userorders);
    } catch (error) {
        throw new Error(error);
    }
});
const updateOrderStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const updateOrderStatus = await Order.findByIdAndUpdate(
            id,
            {
                orderStatus: status,
                paymentIntent: {
                    status: status,
                },
            },
            { new: true }
        );
        res.json(updateOrderStatus);
    } catch (error) {
        throw new Error(error);
    }
});

const deleteOrder = asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log(req.params);
    validateMongoDbId(id);
    try {
        const deleteOrder = await Order.findById(id);
        console.log(deleteOrder);
        res.json(deleteOrder);
    } catch (error) {
        throw new Error(error);
    }
})

const SearchUser = asyncHandler(async (req, res) => {
    const keyword = req.query.title;
    const regex = new RegExp(keyword, "i"); // tạo regex từ keyword, "i" để không phân biệt chữ hoa, chữ thường
    const users = await User.find({ email: { $regex: regex } });
    res.json(users);
})
module.exports = { createUser, loginUserCtrl, getAllUser, getUser, deleteUser, updateUser, blockUser, unblockUser, handleRefreshToken, logout, updatePassword, forgotPasswordToken, resetPassword, loginAdmin, getWishlist, saveAddress, userCart, getUserCart, emptyCart, applyCoupon, createOrder, getOrders, getAllOrders, getOrderByUserId, updateOrderStatus, deleteOrder, removeProductFromCart, updateProductFromCart, SearchUser }