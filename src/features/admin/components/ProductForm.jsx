/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";

import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { FiAlertCircle } from "react-icons/fi";
import {
  clearSelectedProduct,
  createProductAsync,
  deleteAllImageAsync,
  deleteOneImageAsync,
  deleteProductImageAsync,
  fetchAllProductByIdAsync,
  fetchProductImagesasync,
  selectBrands,
  selectCategories,
  selectImageStatus,
  selectProductImages,
  selectedProductById,
  updateProductAsync,
  uploadImageAsync,
} from "../../product/productSlice";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../common/Modal";
import { Bounce, toast } from "react-toastify";
import { updateUserAsync } from "../../user/userSlice";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { Circles } from "react-loader-spinner";

const ProductForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(selectImageStatus);
  const [openModal, setOpenModal] = useState(null);
  const productImages = useSelector(selectProductImages);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const selectedProduct = useSelector(selectedProductById);
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);

  const params = useParams();
  useEffect(() => {
    if (params.id) {
      dispatch(fetchAllProductByIdAsync(params.id));
    } else {
      dispatch(clearSelectedProduct());
    }
  }, [params.id, dispatch]);
  useEffect(() => {
    const fetchData = async () => {
      if (selectedProduct && params.id) {
        setValue("title", selectedProduct.title);
        setValue("description", selectedProduct.description);
        setValue("price", selectedProduct.price);
        setValue("brand", selectedProduct.brand);
        setValue("category", selectedProduct.category);
        setValue("stock", selectedProduct.stock);
        setValue("discountPercentage", selectedProduct.discountPercentage);
        setValue("thumbnail", selectedProduct.thumbnail);
        setValue("images", selectedProduct.images);
      }
    };
    fetchData();
  }, [selectedProduct, setValue, params.id]);

  const handleDelete = () => {
    const product = { ...selectedProduct };
    product.deleted = true;
    dispatch(updateProductAsync(product));
  };

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    console.log("image", file);
    const formData = new FormData();
    const {
      data: { timestamp, signature },
    } = await axios.post("/api/sign-upload", { folder: "product-images" });
    formData.append("file", file);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);
    formData.append("api_key", import.meta.env.VITE_CLY_KEY);
    formData.append("folder", "product-images");
    axios
      .post("https://api.cloudinary.com/v1_1/dccaxfmwv/image/upload", formData) // only http 👍👍
      .then((response) => {
        dispatch(uploadImageAsync({ images: response.data.secure_url }));
        dispatch(fetchProductImagesasync());
      })
      .then(() => dispatch(fetchProductImagesasync()));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const handleCreateProduct = (data) => {
    const product = prepareProductData(data);
    dispatch(createProductAsync(product));
    resetFormAndNotify("Product Successfully Created");
  };

  const handleUpdateProduct = (data) => {
    const product = prepareProductData(data);
    product.id = params.id;
    // data.images = [...data.images, ...productImages];
    product.rating = selectedProduct?.rating || 0;
    dispatch(updateProductAsync(product));
    resetFormAndNotify("Product Successfully Updated");
  };
  console.log("Product Successfully Updated", handleUpdateProduct);

  // const handleDelete = (index) => {
  //   console.log(index + " deleted image")
  //   // dispatch(deleteProductImageAsync(index))
  // }

  const resetFormAndNotify = (message) => {
    reset();
    toast.info(message, {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
    navigate("/admin");
  };

  const prepareProductData = (data) => {
    if (params.id && !productImages.error) {
      data.images = [...data.images, ...productImages];
    }
    const product = { ...data };
    // product.images += productImages.map(image=>image)
    // product.images = [data.image1, data.image2, data.image3, data.image4];
    // delete product["image1"];
    // delete product["image2"];
    // delete product["image3"];
    // delete product["image4"];
    const imagesArray = Object.keys(data.images).map((key) => data.images[key]);
    console.log("ghgfffghf", imagesArray);
    product.price = +data.price;
    product.discountPercentage = +data.discountPercentage;
    product.stock = +data.stock;
    return product;
  };
  console.log("productimages", productImages);

  const imagelength = productImages?.error ? 0 : productImages?.length;

  const checkisfive = imagelength + selectedProduct?.images.length < 5;

  console.log("prepareProductData", prepareProductData);
  console.log("checkis", checkisfive);
  useEffect(() => {
    dispatch(fetchProductImagesasync());
  }, [dispatch]);
  return (
    <>
      {status === "loading" ? (
        <div className="fixed inset-0 bg-opacity-25 bg-slate-500 flex items-center justify-center h-full w-full">
          <Circles
            height="80"
            width="80"
            color="#00A9FF"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : null}
      <form
        noValidate
        onSubmit={handleSubmit((data) => {
          console.log(data);
          if (params.id) {
            console.log("handleupdate", handleUpdateProduct(data));
            dispatch(deleteAllImageAsync());
          } else {
            handleCreateProduct(data);
            dispatch(deleteAllImageAsync());
          }
        })}
      >
        <div className="space-y-12 p-4 mx-24 max-md:mx-0">
          <div className="border-b border-gray-900/10 pb-12">
            {!selectedProduct?.deleted && (
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                {selectedProduct ? "Modify Product" : "Add New Product"}
              </h2>
            )}

            {selectedProduct && selectedProduct.deleted && (
              <div className="py-3 inline-flex -mb-24">
                <h2 className="text-red-500">
                  <FiAlertCircle /> This Product is Deleted
                </h2>
              </div>
            )}

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      {...register("title", {
                        required: "Product Title is Required",
                      })}
                      id="title"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Enter A Product Name"
                    />
                  </div>
                  {errors.title && (
                    <p className="text-red-500">{errors.title.message}</p>
                  )}
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    {...register("description", {
                      required: "Product description Required",
                    })}
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                  {errors.description && (
                    <p className="text-red-500">{errors.description.message}</p>
                  )}
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write About the Product you want to sell.
                </p>
              </div>
              <div className="col-span-full">
                <div className="border-b border-gray-900/10 pb-12">
                  {/* <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Personal Information
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Use a permanent address where you can receive mail.
                </p> */}

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Total Price
                      </label>
                      <div className="mt-2">
                        <input
                          type="number"
                          {...register("price", {
                            required: "Product Total Price is Required",
                            min: 10,
                          })}
                          id="price"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.price && (
                          <p className="text-red-500">{errors.price.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Discount Percentage
                      </label>
                      <div className="mt-2">
                        <input
                          type="number"
                          max={100}
                          {...register("discountPercentage", {
                            required: "Product Percentage is Required",
                            min: 1,
                            max: 100,
                          })}
                          id="discountPercentage"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.discountPercentage && (
                          <p className="text-red-500">
                            {errors.discountPercentage.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Stocks
                      </label>
                      <div className="mt-2">
                        <input
                          id="stock"
                          {...register("stock", {
                            required:
                              "Product Stock is Required You have more then 50 in stock products",
                            min: 0,
                          })}
                          type="number"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.stock && (
                          <p className="text-red-500">{errors.stock.message}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-row space-x-5 max-sm:flex-col max-sm:space-x-0 max-sm:space-y-3">
                      {" "}
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Brand
                        </label>
                        <div className="mt-2">
                          <select
                            {...register("brand", {
                              required: "Product Brand is Required",
                            })}
                            className="rounded-lg cursor-pointer max-sm:px-1"
                          >
                            <option value="">--choose option--</option>
                            {brands.map((brand) => (
                              <option value={brand.value}>{brand.label}</option>
                            ))}
                          </select>
                        </div>
                        {errors.brand && (
                          <p className="text-red-500">{errors.brand.message}</p>
                        )}
                      </div>
                      <div className="col-span-full">
                        <label
                          htmlFor="street-address"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Category
                        </label>
                        <div className="mt-2">
                          <select
                            {...register("category", {
                              required: "Product Category is Required",
                            })}
                            className="rounded-lg cursor-pointer"
                          >
                            {categories.map((category) => (
                              <option value={category.value}>
                                {category.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        {errors.category && (
                          <p className="text-red-500">
                            {errors.category.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {productImages?.length > 0 && productImages !== null && (
                      <>
                        <div className="sm:col-span-2 sm:col-start-1 hidden">
                          <label
                            htmlFor="city"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Thumbnail Link
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("thumbnail", {
                                required: "Thumbnail Image is Required",
                              })}
                              id="thumbnail"
                              value={productImages[0]}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.thumbnail && (
                              <p className="text-red-500">
                                {errors.thumbnail.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </>
                    )}

                    {Array.isArray(productImages) &&
                      productImages.map((image, index) => (
                        <div className="hidden" key={image}>
                          <input
                            id={`images.${index}`}
                            {...register(`images.${index}`, {
                              required: "Image URL is required",
                            })}
                            // placeholder={`Image URL ${index + 1}`}
                            defaultValue={image} // Set the default value to the image URL
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {!params.id &&
              (productImages?.length < 5 || productImages?.error) ? (
                <>
                  <div className="col-span-full">
                    <div className="items-center justify-center text-center">
                      <h3 className="text-lg font-semibold">
                        Upload Product Images
                      </h3>
                    </div>
                    <label
                      htmlFor="cover-photo"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Products Images
                    </label>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                      <div className="text-center" {...getRootProps()}>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          {...getInputProps()}
                          className="sr-only"
                        />
                        <PhotoIcon
                          className="mx-auto h-12 w-12 text-gray-300"
                          aria-hidden="true"
                        />
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>Upload a Image</span>
                          </label>
                          <p className="pl-1">You Can Upload Up To 5 Images</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">
                          Your First Image Save as thumbnail Image
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
              {params.id &&
              selectedProduct?.images.length < 5 &&
              checkisfive ? (
                <div className="col-span-full">
                  <div className="items-center justify-center text-center">
                    <h3 className="text-lg font-semibold">
                      Upload Product Images
                    </h3>
                  </div>
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Products Images
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center" {...getRootProps()}>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        {...getInputProps()}
                        className="sr-only"
                      />
                      <PhotoIcon
                        className="mx-auto h-12 w-12 text-gray-300"
                        aria-hidden="true"
                      />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a Image</span>
                        </label>
                        <p className="pl-1">You Can Upload Up To 5 Images</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        Your First Image Save as thumbnail Image
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {/* <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Notifications
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            We&apos;ll always let you know about important changes, but you pick
            what else you want to hear about.
          </p>

          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">
                By Email
              </legend>
              <div className="mt-6 space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="comments"
                      name="comments"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label
                      htmlFor="comments"
                      className="font-medium text-gray-900"
                    >
                      Comments
                    </label>
                    <p className="text-gray-500">
                      Get notified when someones posts a comment on a posting.
                    </p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="candidates"
                      name="candidates"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label
                      htmlFor="candidates"
                      className="font-medium text-gray-900"
                    >
                      Candidates
                    </label>
                    <p className="text-gray-500">
                      Get notified when a candidate applies for a job.
                    </p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="offers"
                      name="offers"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label
                      htmlFor="offers"
                      className="font-medium text-gray-900"
                    >
                      Offers
                    </label>
                    <p className="text-gray-500">
                      Get notified when a candidate accepts or rejects an offer.
                    </p>
                  </div>
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">
                Push Notifications
              </legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                These are delivered via SMS to your mobile phone.
              </p>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-everything"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="push-everything"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Everything
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-email"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="push-email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Same as email
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-nothing"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="push-nothing"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    No push notifications
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
        </div> */}

          <ImageUpload
            Images={productImages}
            params={params}
            product={selectedProduct}
          />
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6 p-3">
          <button
            type="button"
            onClick={() => {
              navigate("/admin"), dispatch(deleteAllImageAsync());
            }}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          {selectedProduct && !selectedProduct.deleted && (
            <button
              onClick={(e) => {
                e.preventDefault(), setOpenModal(true);
              }}
              className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Delete
            </button>
          )}
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
        <Modal
          title={`Delete ${selectedProduct?.title} in Products`}
          message="Are you sure you want to delete this Product ?"
          dangerOption="Delete"
          cancelOption="Cancel"
          dangerAction={(e) => handleDelete(e, selectedProduct.id)}
          cancelAction={(e) => setOpenModal(null)}
          showModal={openModal}
        />
      </form>
    </>
  );
};

function ImageUpload({ Images, params, product }) {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);

  const handleEditDelete = (index, product) => {
    const productId = { id: product.id };
    // console.log(productId, index)
    dispatch(deleteOneImageAsync({ index, productId }));
  };

  const handleDelete = (index) => {
    console.log(index + " deleted image");
    // const updatedImages = [...images]
    // updatedImages.splice(index, 1);
    // setImage(updatedImages)
    dispatch(deleteProductImageAsync(index));
    dispatch(fetchProductImagesasync());
  };
  const isExternalImage =
    product?.images.some((image) => image.startsWith("http://")) ||
    product?.images.some((image) => image.startsWith("https://"));
  // useEffect(()=>{
  // }, [])
  console.log("Images", Images);
  if (!params.id) {
    return (
      <>
        {Images?.length > 0 && Images.image !== null ? (
          <div>
            <h3 className="font-bold text-lg ">Uploaded Images:</h3>
            <div className="container px-6 m-auto">
              <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
                {Images?.length > 0 &&
                  Images !== null &&
                  Images.map((img, index) => (
                    <li
                      className="col-span-4 lg:col-span-3 relative"
                      key={index}
                    >
                      <div className="overflow-hidden bg-white rounded shadow-md text-slate-500 shadow-slate-200">
                        <img src={img} alt={`image ${index}`} />
                        <button
                          type="button"
                          className="absolute top-7 right-1 z-10 p-2 bg-red-500 text-white hover:bg-red-700 rounded-full focus:outline-none"
                          onClick={() => handleDelete(index)}
                        >
                          <ImCross />
                        </button>
                      </div>
                    </li>
                  ))}
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  }

  return (
    <>
      {" "}
      {params.id ? (
        <div>
          <h3 className="font-bold text-lg ">Uploaded Images:</h3>
          <div className="container px-6 m-auto">
            <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
              {product?.images.map((img, index) => (
                <li className="col-span-4 lg:col-span-3 relative" key={index}>
                  <div className="overflow-hidden bg-white rounded shadow-md text-slate-500 shadow-slate-200">
                    <img src={img} alt={`image ${index}`} />
                    <button
                      type="button"
                      className="absolute top-7 right-1 z-10 p-2 bg-red-500 text-white hover:bg-red-700 rounded-full focus:outline-none"
                      onClick={() => setOpenModal(true)}
                    >
                      <ImCross />
                    </button>
                    <Modal
                      title={
                        <div className="inline-flex gap-x-1">
                          <p className="font-bold text-red-900">Note: </p>
                          <p>
                            This Image delete without submitting form or
                            submitting
                          </p>
                        </div>
                      }
                      message="Are you sure you want to delete this image?"
                      dangerOption="Delete"
                      cancelOption="Cancel"
                      dangerAction={(e) => handleEditDelete(index, product)}
                      cancelAction={(e) => setOpenModal(null)}
                      showModal={openModal}
                    />
                  </div>
                </li>
              ))}
              {Images?.length > 0 &&
                Images !== null &&
                Images.map((img, index) => (
                  <li className="col-span-4 lg:col-span-3 relative" key={index}>
                    <div className="overflow-hidden bg-white rounded shadow-md text-slate-500 shadow-slate-200">
                      <img src={img} alt={`image ${index}`} />
                      <button
                        type="button"
                        className="absolute top-7 right-1 z-10 p-2 bg-red-500 text-white hover:bg-red-700 rounded-full focus:outline-none"
                        onClick={() => handleDelete(index)}
                      >
                        <ImCross />
                      </button>
                    </div>
                  </li>
                ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default ProductForm;
