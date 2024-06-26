import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { getColors } from "../features/color/colorSlice";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { getAProduct, resetState, updateAProduct } from "../features/product/productSlice";

let schema = yup.object().shape({
    title: yup.string().required("Title is Required"),
    description: yup.string().required("Description is Required"),
    price: yup.number().required("Price is Required"),
    brand: yup.string().required("Brand is Required"),
    category: yup.string().required("Category is Required"),
    tags: yup.string().required("Tag is Required"),
    color: yup
        .string()
        .required("Color is Required"),
    quantity: yup.number().required("Quantity is Required"),
});

const ViewProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [color, setColor] = useState([]);
    const [images, setImages] = useState([]);

    // console.log(color);

    useEffect(() => {
        dispatch(getBrands());
        dispatch(getCategories());
        dispatch(getColors());
        dispatch(getAProduct(id))
    }, []);

    const brandState = useSelector((state) => state.brand.brands);
    const catState = useSelector((state) => state.pCategory.pCategories);
    const colorState = useSelector((state) => state.color.colors);
    const imgState = useSelector((state) => state.upload.images);
    const newProduct = useSelector((state) => state.product);
    const { isSuccess, isError, isLoading, createdProduct, products } = newProduct;

    useEffect(() => {
        if (isSuccess && createdProduct) {
            toast.success("Product Added Successfullly!");
        }
        if (isError) {
            toast.error("Something Went Wrong!");
        }
        setColor(colorState)
    }, [isSuccess, isError, isLoading]);

    // const coloropt = [];
    // colorState.forEach((i) => {
    //     coloropt.push({
    //         label: i.title,
    //         value: i._id,
    //     });
    // });

    const img = [];
    // imgState.forEach((i) => {
    //     img.push({
    //         public_id: i.public_id,
    //         url: i.url,
    //     });
    // });

    // useEffect(() => {
    //     formik.values.color = color ? color : " ";
    //     formik.values.images = img;
    // }, [color, img]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: products._id,
            title: products.title || "",
            description: products.description || "",
            price: products.price || "",
            brand: products.brand || "",
            category: products.category || "",
            tags: products.tags || "",
            color: products.color || "",
            quantity: products.quantity || "",
            images: products.images || "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            formik.values.images = imgState
            console.log(values);
            dispatch(updateAProduct(values));
            formik.resetForm();
            setColor(null);
            setTimeout(() => {
                dispatch(resetState());
            }, 3000);

        },
    });

    return (
        <div>
            <h3 className="mb-4 title">Edit Product</h3>
            <div>
                <form
                    onSubmit={formik.handleSubmit}
                    className="d-flex gap-3 flex-column"
                >
                    <div className="form-group">
                        <label htmlFor="brand" className="form-label">Title:</label>
                        <CustomInput
                            type="text"
                            name="title"
                            onChng={formik.handleChange("title")}
                            onBlr={formik.handleBlur("title")}
                            val={formik.values.title}
                        />
                        <div className="error">
                            {formik.touched.title && formik.errors.title}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="brand" className="form-label">Description:</label>
                        <div className="">
                            <ReactQuill
                                theme="snow"
                                name="description"
                                onChange={formik.handleChange("description")}
                                value={formik.values.description}
                            />
                        </div>
                        <div className="error">
                            {formik.touched.description && formik.errors.description}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="brand" className="form-label">Price:</label>
                        <CustomInput
                            type="number"
                            name="price"
                            onChng={formik.handleChange("price")}
                            onBlr={formik.handleBlur("price")}
                            val={formik.values.price}
                        />
                        <div className="error">
                            {formik.touched.price && formik.errors.price}
                        </div>
                    </div>


                    <div className="form-group">
                        <label htmlFor="brand" className="form-label">Brand:</label>
                        <select
                            name="brand"
                            id="brand"
                            onChange={formik.handleChange("brand")}
                            onBlur={formik.handleBlur("brand")}
                            value={formik.values.brand}
                            className="form-control py-3 mb-3"
                        >
                            {brandState.map((brand, index) => (
                                <option key={index} value={brand.title}>
                                    {brand.title}
                                </option>
                            ))}
                        </select>
                        {formik.touched.brand && formik.errors.brand && (
                            <div className="error">{formik.errors.brand}</div>
                        )}
                        <div className="error">
                            {formik.touched.brand && formik.errors.brand}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="brand" className="form-label">Category:</label>
                        <select
                            name="category"
                            onChange={formik.handleChange("category")}
                            onBlur={formik.handleBlur("category")}
                            value={formik.values.category}
                            className="form-control py-3 mb-3"
                            id=""
                        >
                            {catState.map((i, j) => {
                                return (
                                    <option key={j} value={i.title}>
                                        {i.title}
                                    </option>
                                );
                            })}
                        </select>
                        <div className="error">
                            {formik.touched.category && formik.errors.category}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="brand" className="form-label">Tags:</label>
                        <select
                            name="tags"
                            onChange={formik.handleChange("tags")}
                            onBlur={formik.handleBlur("tags")}
                            value={formik.values.tags}
                            className="form-control py-3 mb-3"
                            id=""
                        >
                            <option value="featured">Featured</option>
                            <option value="popular">Popular</option>
                            <option value="special">Special</option>
                        </select>
                        <div className="error">
                            {formik.touched.tags && formik.errors.tags}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="brand" className="form-label">Color:</label>
                        <select
                            name="color"
                            onChange={formik.handleChange("color")}
                            onBlur={formik.handleBlur("color")}
                            value={formik.values.color}
                            className="form-control py-3 mb-3"
                            id=""
                        >
                            <option value="">Select Color</option>
                            {colorState.map((i, j) => {
                                return (
                                    <option key={j} value={i.title}>
                                        {i.title}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="brand" className="form-label">Quantity:</label>
                        <CustomInput
                            type="number"
                            name="quantity"
                            onChng={formik.handleChange("quantity")}
                            onBlr={formik.handleBlur("quantity")}
                            val={formik.values.quantity}
                        />
                        <div className="error">
                            {formik.touched.quantity && formik.errors.quantity}
                        </div>
                    </div>

                    <div className="bg-white border-1 p-5 text-center">
                        <Dropzone
                            onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
                        >
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>
                                            Drag 'n' drop some image here, or click to select image
                                        </p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </div>
                    <div className="showimages d-flex flex-wrap gap-3">
                        {imgState?.map((i, j) => {
                            return (
                                <div className=" position-relative" key={j}>
                                    <button
                                        type="button"
                                        onClick={() => dispatch(delImg(i.public_id))}
                                        className="btn-close position-absolute"
                                        style={{ top: "10px", right: "10px" }}
                                    ></button>
                                    <img src={i.url} alt="" width={200} height={200} />
                                </div>
                            );
                        })}
                    </div>
                    <button
                        className="btn btn-success border-0 rounded-3 my-5"
                        type="submit"
                    >
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ViewProduct;
