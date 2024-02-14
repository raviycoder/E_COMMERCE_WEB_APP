/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
// import ProductCarousel from "./ProductCarousel"
import Glide from "@glidejs/glide";
import { useDispatch, useSelector } from "react-redux";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import {
  fetchAllProductByIdAsync,
  fetchProductsByFiltersAsync,
  selectAllProducts,
  selectProductListStatus,
  selectedProductById,
} from "../productSlice";
import { Link, useParams } from "react-router-dom";
import { addToCartAsync, selectItems } from "../../cart/cartSlice";
import { MdProductionQuantityLimits } from "react-icons/md";
import Rating from "../../common/Rating";
import { FaStar } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { Circles } from "react-loader-spinner";

const colors = [
  { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
  { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
  { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
];
const sizes = [
  { name: "XXS", inStock: false },
  { name: "XS", inStock: true },
  { name: "S", inStock: true },
  { name: "M", inStock: true },
  { name: "L", inStock: true },
  { name: "XL", inStock: true },
  { name: "2XL", inStock: true },
  { name: "3XL", inStock: true },
];
const highlights = [
  "Hand cut and sewn locally",
  "Dyed with our proprietary colors",
  "Pre-washed & pre-shrunk",
  "Ultra-soft 100% cotton",
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetail() {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[2]);
  const [filter, setFilter] = useState({});
  const items = useSelector(selectItems);
  const products = useSelector(selectAllProducts);
  const product = useSelector(selectedProductById);
  const dispatch = useDispatch();
  const params = useParams();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (products && products.length > 0 && product) {
  //       const filteredProducts = products.filter((pro) => pro.category === product.category);
  //       console.log("Filtered Products:", filteredProducts);
  //       setFilter(filteredProducts)
  //     }
  //   };

  //   fetchData();
  // }, [dispatch, params.id, product, products])

  // const isalive = filter == [] || undefined ? <>loading...</>:filter;

  const handleCart = (e) => {
    e.preventDefault();
    if (items.findIndex((item) => item.product.id === product.id) < 0) {
      const newItem = {
        product: product.id,
        quantity: 1,
      };
      dispatch(addToCartAsync(newItem));
      toast.info("🛒 Product added in Cart", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } else {
      toast.info("🛒 Product already added in Cart", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  useEffect(() => {
    dispatch(fetchAllProductByIdAsync(params.id));
  }, [dispatch, params.id]);

  return (
    <div className="bg-white">
      {product && (
        <>
          <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
              <div className="lg:w-4/5 mx-auto grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
                <ImageCarousel product={product} />

                <div className="lg:w- w-full lg:pl-1 lg:py-2 mt-6 lg:mt-0 col-span-4 lg:col-span-6">
                  <h2 className="text-sm title-font text-gray-500 tracking-widest">
                    {product.brand}
                  </h2>
                  <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                    {product.title}
                  </h1>
                  <div className="flex mb-4">
                    <span className="flex items-center">
                      <Rating product={product} isReview={true} />
                    </span>
                    <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                      <a className="text-gray-500">
                        <svg
                          fill="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                        >
                          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                        </svg>
                      </a>
                      <a className="text-gray-500">
                        <svg
                          fill="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                        >
                          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                        </svg>
                      </a>
                      <a className="text-gray-500">
                        <svg
                          fill="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                        >
                          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                        </svg>
                      </a>
                    </span>
                  </div>
                  <p className="leading-relaxed">{product.description}</p>
                 {(product.category === "mens-shirts" || product.category === "womens-dresses" || product.category === "tops")&& <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                    <div className="flex">
                      <span className="mr-3">Color</span>
                      <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none" />
                      <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none" />
                      <button className="border-2 border-gray-300 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none" />
                    </div>
                    <div className="flex ml-6 items-center">
                      <span className="mr-3">Size</span>
                      <div className="relative">
                        <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-base pl-3 pr-10">
                          <option>SM</option>
                          <option>M</option>
                          <option>L</option>
                          <option>XL</option>
                        </select>
                        <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>}
                  <div className="flex flex-row justify-evenly items-center space-x-7 max-sm:flex-col max-sm:space-y-5">
                    <span className="title-font font-medium text-2xl text-gray-900 max-sm:inline-flex max-sm:items-end">
                      <h1 className="text-sm text-start max-sm:text-xl max-sm:mr-3">
                        Price:
                      </h1>
                      <div className="flex flex-row items-end">
                        <p className="text-3xl font-medium text-gray-900">
                          $
                          {Math.round(
                            product.price *
                              (1 - product.discountPercentage / 100)
                          )}
                        </p>
                        <p className="text-xl ml-2 font-medium text-gray-600 line-through">
                          ${product.price}
                        </p>
                      </div>
                    </span>
                    {product.stock <= 0 ? (
                      <div className="mt-3 text-center p-1">
                        <span className="inline-flex items-center justify-center rounded-full bg-red-100 px-2.5 py-1 text-red-700">
                          <MdProductionQuantityLimits className=" text-red-700 text-4xl mr-1" />
                          <p className="whitespace-nowrap text-3xl">
                            Out of Stock
                          </p>
                        </span>
                      </div>
                    ) : (
                      <div className="max-sm:inline-flex flex flex-row max-sm:justify-evenly items-center w-full">
                        <button
                          onClick={handleCart}
                          type="submit"
                          className="mt-1 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Add to Cart
                        </button>
                        <button className="rounded-full w-10 h-10 bg-gray-200 p-3 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                          <svg
                            fill="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <br />
          <Rating product={product} isReview={false} />
          <br />
          <ProductCarousel
            products4={products}
            product={product}
            ShowTitle={false}
            isRelated={false}
          />
        </>
      )}
    </div>
  );
}

function ImageCarousel({ product }) {
  const isExternalImage =
    product.images.some((image) => image?.startsWith("http://")) ||
    product.images.some((image) => image?.startsWith("https://"));
  console.log("isExternal", isExternalImage);
  const status = useSelector(selectProductListStatus);
  {
    status === "pending" ? (
      <Circles
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    ) : (
      useEffect(() => {
        const slider = new Glide(".glide-03", {
          type: "slider",
          focusAt: "center",
          perView: 1,
          autoplay: 3000,
          animationDuration: 700,
          gap: 0,
          classes: {
            nav: {
              active: "[&>*]:bg-wuiSlate-700",
            },
          },
        }).mount();

        return () => {
          slider.destroy();
        };
      }, [])
    );
  }

  return (
    <>
      <div className="relative lg:max-w-md max-md:max-w-full glide-03 col-span-4 lg:col-span-6">
        {/*    <!-- Slides --> */}
        <div className="overflow-hidden max-h-md" data-glide-el="track">
          <ul className="whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform] relative flex w-full overflow-hidden p-0 object-cover">
            {product.images.map((image, index) => (
              <li key={index}>
                <div className=" h-80 w-full bg-center">
                  <img
                    src={
                      isExternalImage
                        ? image
                        : `/product-images/${image}`
                    }
                    className="object-contain w-full max-w-full max-h-full m-auto object-center"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/*    <!-- Controls --> */}
        <div
          className="absolute left-0 flex items-center justify-between w-full h-0 px-4 top-1/2 "
          data-glide-el="controls"
        >
          <button
            className="inline-flex items-center justify-center w-8 h-8 transition duration-300 border rounded-full border-slate-700 bg-white/20 text-slate-700 hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none lg:h-12 lg:w-12"
            data-glide-dir="<"
            aria-label="prev slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <title>prev slide</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
          </button>
          <button
            className="inline-flex items-center justify-center w-8 h-8 transition duration-300 border rounded-full border-slate-700 bg-white/20 text-slate-700 hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none lg:h-12 lg:w-12"
            data-glide-dir=">"
            aria-label="next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <title>next slide</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </button>
        </div>
        {/*    <!-- Indicators --> */}
        <div
          className="absolute bottom-0 flex items-center justify-center w-full gap-2"
          data-glide-el="controls[nav]"
        >
          <button
            className="p-4 group"
            data-glide-dir="=0"
            aria-label="goto slide 1"
          >
            <span className="block w-2 h-2 transition-colors duration-300 rounded-full bg-white/20 ring-1 ring-slate-700 focus:outline-none"></span>
          </button>
          <button
            className="p-4 group"
            data-glide-dir="=1"
            aria-label="goto slide 2"
          >
            <span className="block w-2 h-2 transition-colors duration-300 rounded-full bg-white/20 ring-1 ring-slate-700 focus:outline-none"></span>
          </button>
          <button
            className="p-4 group"
            data-glide-dir="=2"
            aria-label="goto slide 3"
          >
            <span className="block w-2 h-2 transition-colors duration-300 rounded-full bg-white/20 ring-1 ring-slate-700 focus:outline-none"></span>
          </button>
          <button
            className="p-4 group"
            data-glide-dir="=3"
            aria-label="goto slide 4"
          >
            <span className="block w-2 h-2 transition-colors duration-300 rounded-full bg-white/20 ring-1 ring-slate-700 focus:outline-none"></span>
          </button>
        </div>
      </div>
    </>
  );
}

function ProductCarousel({
  ShowTitle,
  products,
  isRelated,
  product,
  products4,
}) {
  // const status = useSelector(selectProductListStatus);

  {
    products4.length <= 0 ? (
      <Circles
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    ) : (
      useEffect(() => {
        const slider = new Glide(".glide-01", {
          type: "carousel",
          focusAt: "center",
          perView: 5,
          autoplay: 3000,
          animationDuration: 700,
          gap: 24,
          classNames: {
            nav: {
              active: "[&>*]:bg-wuiSlate-700",
            },
          },
          breakpoints: {
            1024: {
              perView: 3,
            },
            640: {
              perView: 1,
            },
          },
        }).mount();

        console.log("process", products4);

        return () => {
          slider.destroy();
        };
      }, [products4])
    );
  }

  return (
    <>
      {/*<!-- Component: Carousel with controls inside --> */}
      {ShowTitle === true ? (
        <h3 className="mb-4 text-2xl font-extrabold p-2 leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl flex justify-center items-center">
          <LuShoppingCart className="mr-2 text-blue-700 text-3xl" />
          Our Prducts
        </h3>
      ) : (
        <h3 className="mb-4 text-2xl font-extrabold p-2 leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl flex text-start">
          Related Products
        </h3>
      )}
      <div className="glide-01 relative w-full outline outline-1 outline-gray-200">
        {/*    <!-- Slides --> */}
        <div className="overflow-hidden" data-glide-el="track">
          <ul className="whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform] relative flex w-full overflow-hidden p-0">
            {products4.map((product) => (
              <li key={product.id}>
                <Link
                  to={`/product-detail/${product.id}`}
                  className="group relative h-3 border-solid border-0 border-gray-200 p-1 shadow-lg rounded-lg duration-300 col-span-3 lg:col-span-3"
                >
                  <div className="aspect-h-1 aspect-w-1 w-full object-cover overflow-hidden rounded-xl bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                    {product.thumbnail.startsWith("http") ||
                    product.thumbnail.startsWith("https") ? (
                      // External image
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    ) : (
                      // Local image
                      <img
                        src={`/product-images/${product.thumbnail}`}
                        alt={product.title}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    )}
                  </div>
                  <div className="mt-4 flex justify-between px-2">
                    <div>
                      <h3 className="text-sm text-gray-700 font-medium">
                        <div href={product.thumbnail}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.title}
                        </div>
                      </h3>
                      <p className="mt-1 text-sm items-center flex flex-row text-gray-500">
                        <FaStar className="h-3 w-3 mr-1 text-yellow-400" />
                        {product.rating}
                      </p>
                    </div>
                    {product.stock <= 0 ? (
                      <div>
                        <span className="inline-flex items-center justify-center rounded-full bg-red-100 px-2.5 py-0.5 text-red-700">
                          <MdProductionQuantityLimits className=" text-red-700 text-xl mr-1" />
                          <p className="whitespace-nowrap text-sm">
                            Out of Stock
                          </p>
                        </span>
                      </div>
                    ) : (
                      <>
                        {" "}
                        <div className="flex flex-col">
                          <p className="text-sm font-medium text-gray-900">
                            $
                            {Math.round(
                              product.price *
                                (1 - product.discountPercentage / 100)
                            )}
                          </p>
                          <p className="text-xs font-medium text-gray-600 line-through">
                            ${product.price}
                          </p>
                        </div>
                      </>
                    )}

                    {product.deleted && (
                      <div>
                        <p className="text-sm text-red-400">Product Deleted</p>
                      </div>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/*    <!-- Controls --> */}
        <div
          className="absolute left-0 top-1/2 flex h-0 w-full items-center justify-between px-4 "
          data-glide-el="controls"
        >
          <button
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-white/20 text-slate-700 transition duration-300 hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none lg:h-12 lg:w-12"
            data-glide-dir="<"
            aria-label="prev slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <title>prev slide</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
          </button>
          <button
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-white/20 text-slate-700 transition duration-300 hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none lg:h-12 lg:w-12"
            data-glide-dir=">"
            aria-label="next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <title>next slide</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </button>
        </div>
      </div>

      <script src="https://cdnjs.cloudflare.com/ajax/libs/Glide.js/3.0.2/glide.js"></script>
      {/*<!-- End Carousel with controls inside --> */}
    </>
  );
}
