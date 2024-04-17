const Product = require("../models/productModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const validateMongoDbId = require("../utils/validateMongodbId");
const uploadImage = require("../utils/cloudinary");
const fs = require("fs");
//Create a Product
const createProduct = asyncHandler(async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const newProduct = await Product.create(req.body)

        res.json(newProduct)
    } catch (error) {
        throw new Error(error)
    }
});

//update a product
const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);

    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }

        const updateProduct = await Product.findByIdAndUpdate(id, req.body.values, { new: true });
        res.json(updateProduct);
    } catch (error) {
        throw new Error(error);
    }
})

//delete a product
const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deleteProduct = await Product.findByIdAndDelete(id);
        console.log(deleteProduct);
        res.json(deleteProduct);
    } catch (error) {
        throw new Error(error);
    }
})

//get a product
const getProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id).populate({ path: "ratings.postedby", select: "firstname lastname" });
        res.json(product);
    } catch (error) {
        throw new Error(error);
    }
})


//get all product
// Lấy danh sách tất cả sản phẩm: /api/products
// Lấy danh sách sản phẩm với giá lớn hơn 500: /api/products?price[gte]=500
// Lấy danh sách sản phẩm được sản xuất bởi Apple và có giá nhỏ hơn 1000: /api/products?brand=Apple&price[lt]=1000
// Lấy danh sách sản phẩm với trường thông tin 'title' và 'price' được lấy về: /api/products?fields=title,price
// Lấy danh sách sản phẩm được sắp xếp theo thứ tự giá tăng dần và giới hạn 10 sản phẩm trên mỗi trang, trang số 2: /api/products?sort=price&limit=10&page=2
// /products?price[gte]=500&price[lte]=1000
const getAllProduct = asyncHandler(async (req, res) => {
    try {
        // Filtering
        const queryObj = { ...req.query };
        const excludeFields = ["page", "sort", "limit", "fields",];
        excludeFields.forEach((el) => delete queryObj[el]);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

        let query = Product.find(JSON.parse(queryStr));
        // Sorting

        if (req.query.sort) {
            const sortBy = req.query.sort.split(",").join(" ");
            query = query.sort(sortBy);
        } else {
            query = query.sort("-createdAt");
        }

        // limiting the fields

        if (req.query.fields) {
            const fields = req.query.fields.split(",").join(" ");
            query = query.select(fields);
        } else {
            query = query.select("-__v");
        }

        // pagination

        const page = req.query.page;
        const limit = req.query.limit;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);
        if (req.query.page) {
            const productCount = await Product.countDocuments();
            if (skip >= productCount) throw new Error("This Page does not exists");
        }
        const product = await query;

        res.json(product);
    } catch (error) {
        throw new Error(error);
    }
});

const SearchProduct = asyncHandler(async (req, res) => {
    const keyword = req.query.title;
    const regex = new RegExp(keyword, "i"); // tạo regex từ keyword, "i" để không phân biệt chữ hoa, chữ thường
    const products = await Product.find({ title: { $regex: regex } });
    res.json(products);
})

//add product to wish list
const addToWishList = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { id } = req.body;
    try {
        const user = await User.findById(_id);
        const alreadyAdded = user.wishlist.includes(id);

        if (alreadyAdded) {
            let user = await User.findByIdAndUpdate(_id, {
                $pull: { wishlist: id },
            }, { new: true });
            res.json(user);
        } else {
            let user = await User.findByIdAndUpdate(_id, {
                $push: { wishlist: id },
            }, { new: true });
            res.json(user);
        }

    } catch (error) {
        throw new Error(error);
    }
});


//rate product
const rating = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { star, productId, comment } = req.body;
    validateMongoDbId(productId);

    try {
        const product = await Product.findById(productId);
        let alreadyRated = product.ratings.find((userId) => userId.postedby.toString() === _id.toString());

        if (alreadyRated) {
            const updateRating = await Product.updateOne(
                {
                    ratings: { $elemMatch: alreadyRated },
                },
                {
                    $set: { "ratings.$.star": star, "ratings.$.comment": comment },
                },
                {
                    new: true,
                }
            );
            // res.json(updateRating);
        } else {
            const rateProduct = await Product.findByIdAndUpdate(productId, {
                $push: {
                    ratings: {
                        star: star,
                        comment: comment,
                        postedby: _id
                    }
                }
            }, { new: true });
            // res.json(rateProduct);
        }
        const getallratings = await Product.findById(productId);

        let totalRating = getallratings.ratings.length;
        let ratingsum = getallratings.ratings.map((item) => item.star).reduce((prev, curr) => prev + curr, 0);

        let actualRating = Math.round(ratingsum / totalRating);
        let finalproduct = await Product.findByIdAndUpdate(
            productId,
            {
                totalrating: actualRating,
            },
            { new: true }
        );
        res.json(finalproduct);
    } catch (error) {
        throw new Error(error);
    }
});

const uploadImages = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const uploader = (path) => uploadImage(path, "images");
        const urls = [];
        const files = req.files;

        for (const file of files) {
            const { path } = file;
            const newpath = await uploader(path);
            urls.push(newpath);
            fs.unlinkSync(path);
        }

        const product = await Product.findByIdAndUpdate(id, {
            images: urls.map((file) => {
                return file;
            }),
        }, { new: true });

        res.json(product);


    } catch (error) {
        throw new Error(error);
    }
})


module.exports = { createProduct, getProduct, getAllProduct, updateProduct, deleteProduct, addToWishList, rating, uploadImages, SearchProduct }