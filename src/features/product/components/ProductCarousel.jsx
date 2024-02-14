/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react"
import Glide from "@glidejs/glide"
import { selectAllProducts } from "../productSlice";
import { LuShoppingCart } from "react-icons/lu";
import { useSelector } from "react-redux";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function CarouselControlsInside({ShowTitle, products}) {
  // const products = useSelector(selectAllProducts);
  const products2 = [{
    "_id": {
      "$oid": "65abb5fb3aeb53e440c21c01"
    },
    "id": "65abb5fb3aeb53e440c21c01",
    "title": "iPhone 9",
    "description": "An apple mobile which is nothing like apple",
    "price": 610,
    "discountPercentage": 12.96,
    "rating": 0,
    "stock": 110,
    "brand": "Apple",
    "category": "smartphones",
    "thumbnail": "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
    "images": [
      "https://cdn.dummyjson.com/product-images/1/1.jpg",
      "https://cdn.dummyjson.com/product-images/1/2.jpg",
      "https://cdn.dummyjson.com/product-images/1/3.jpg",
      "https://cdn.dummyjson.com/product-images/1/4.jpg"
    ]
  },
  {
    "_id": {
      "$oid": "65abb5fb3aeb53e440c21c02"
    },
    "id": "65abb5fb3aeb53e440c21c02",
    "title": "iPhone X",
    "description": "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
    "price": 899,
    "discountPercentage": 17.94,
    "rating": 3.55,
    "stock": 34,
    "brand": "Apple",
    "category": "smartphones",
    "thumbnail": "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
    "images": [
      "https://cdn.dummyjson.com/product-images/2/1.jpg",
      "https://cdn.dummyjson.com/product-images/2/2.jpg",
      "https://cdn.dummyjson.com/product-images/2/3.jpg",
      "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg"
    ]
  },
  {
    "_id": {
      "$oid": "65abb5fb3aeb53e440c21c03"
    },
    "id": "65abb5fb3aeb53e440c21c03",
    "title": "Samsung Universe 9",
    "description": "Samsung's new variant which goes beyond Galaxy to the Universe",
    "price": 1249,
    "discountPercentage": 15.46,
    "rating": 0,
    "stock": 120,
    "brand": "Samsung",
    "category": "smartphones",
    "thumbnail": "https://cdn.dummyjson.com/product-images/3/thumbnail.jpg",
    "images": [
      "https://cdn.dummyjson.com/product-images/3/1.jpg",
      "https://images.unsplash.com/photo-1504333638930-c8787321eee0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1496715976403-7e36dc43f17b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1501862700950-18382cd41497?q=80&w=2019&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    "deleted": false
  },
  {
    "_id": {
      "$oid": "65abb5fb3aeb53e440c21c04"
    },
    "id": "65abb5fb3aeb53e440c21c04",
    "title": "OPPOF19",
    "description": "OPPO F19 is officially announced on April 2021.",
    "price": 280,
    "discountPercentage": 17.91,
    "rating": 4.3,
    "stock": 123,
    "brand": "OPPO",
    "category": "smartphones",
    "thumbnail": "https://cdn.dummyjson.com/product-images/4/thumbnail.jpg",
    "images": [
      "https://cdn.dummyjson.com/product-images/4/1.jpg",
      "https://cdn.dummyjson.com/product-images/4/2.jpg",
      "https://cdn.dummyjson.com/product-images/4/3.jpg",
      "https://cdn.dummyjson.com/product-images/4/4.jpg",
      "https://cdn.dummyjson.com/product-images/4/thumbnail.jpg"
    ]
  },
  {
    "_id": {
      "$oid": "65abb5fb3aeb53e440c21c05"
    },
    "id": "65abb5fb3aeb53e440c21c05",
    "title": "Huawei P30",
    "description": "Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
    "price": 499,
    "discountPercentage": 10.58,
    "rating": 4.09,
    "stock": 32,
    "brand": "Huawei",
    "category": "smartphones",
    "thumbnail": "https://cdn.dummyjson.com/product-images/5/thumbnail.jpg",
    "images": [
      "https://cdn.dummyjson.com/product-images/5/1.jpg",
      "https://cdn.dummyjson.com/product-images/5/2.jpg",
      "https://cdn.dummyjson.com/product-images/5/3.jpg"
    ]
  },
  {
    "_id": {
      "$oid": "65abb5fb3aeb53e440c21c06"
    },
    "id": "65abb5fb3aeb53e440c21c06",
    "title": "MacBook Pro",
    "description": "MacBook Pro 2021 with mini-LED display may launch between September, November",
    "price": 2030,
    "discountPercentage": 11.02,
    "rating": 0,
    "stock": 83,
    "brand": "Apple",
    "category": "laptops",
    "thumbnail": "https://cdn.dummyjson.com/product-images/6/thumbnail.png",
    "images": [
      "https://cdn.dummyjson.com/product-images/6/1.png",
      "https://cdn.dummyjson.com/product-images/6/2.jpg",
      "https://cdn.dummyjson.com/product-images/6/3.png",
      "https://cdn.dummyjson.com/product-images/6/4.jpg"
    ]
  },
  {
    "_id": {
      "$oid": "65abb5fb3aeb53e440c21c07"
    },
    "id": "65abb5fb3aeb53e440c21c07",
    "title": "Samsung Galaxy Book",
    "description": "Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched",
    "price": 1499,
    "discountPercentage": 4.15,
    "rating": 4.25,
    "stock": 50,
    "brand": "Samsung",
    "category": "laptops",
    "thumbnail": "https://cdn.dummyjson.com/product-images/7/thumbnail.jpg",
    "images": [
      "https://cdn.dummyjson.com/product-images/7/1.jpg",
      "https://cdn.dummyjson.com/product-images/7/2.jpg",
      "https://cdn.dummyjson.com/product-images/7/3.jpg",
      "https://cdn.dummyjson.com/product-images/7/thumbnail.jpg"
    ],
    "deleted": false
  },
  {
    "_id": {
      "$oid": "65abb5fb3aeb53e440c21c08"
    },
    "id": "65abb5fb3aeb53e440c21c08",
    "title": "Microsoft Surface Laptop 4",
    "description": "Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.",
    "price": 1499,
    "discountPercentage": 10.23,
    "rating": 0,
    "stock": 0,
    "brand": "Microsoft Surface",
    "category": "laptops",
    "thumbnail": "https://cdn.dummyjson.com/product-images/8/thumbnail.jpg",
    "images": [
      "https://cdn.dummyjson.com/product-images/8/1.jpg",
      "https://cdn.dummyjson.com/product-images/8/2.jpg",
      "https://cdn.dummyjson.com/product-images/8/3.jpg",
      "https://cdn.dummyjson.com/product-images/8/4.jpg"
    ]
  },
  {
    "_id": {
      "$oid": "65abb5fb3aeb53e440c21c09"
    },
    "id": "65abb5fb3aeb53e440c21c09",
    "title": "Infinix INBOOK",
    "description": "Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty",
    "price": 1099,
    "discountPercentage": 11.83,
    "rating": 0,
    "stock": 10,
    "brand": "Infinix",
    "category": "laptops",
    "thumbnail": "https://cdn.dummyjson.com/product-images/9/thumbnail.jpg",
    "images": [
      "https://cdn.dummyjson.com/product-images/9/1.jpg",
      "https://cdn.dummyjson.com/product-images/9/2.png",
      "https://cdn.dummyjson.com/product-images/9/3.png",
      "https://cdn.dummyjson.com/product-images/9/4.jpg"
    ]
  },
  {
    "_id": {
      "$oid": "65abb5fb3aeb53e440c21c0a"
    },
    "id": "65abb5fb3aeb53e440c21c0a",
    "title": "HP Pavilion 15-DK1056WM",
    "description": "HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10",
    "price": 1099,
    "discountPercentage": 6.18,
    "rating": 4.43,
    "stock": 89,
    "brand": "HP Pavilion",
    "category": "laptops",
    "thumbnail": "https://cdn.dummyjson.com/product-images/10/thumbnail.jpeg",
    "images": [
      "https://cdn.dummyjson.com/product-images/10/1.jpg",
      "https://cdn.dummyjson.com/product-images/10/2.jpg",
      "https://cdn.dummyjson.com/product-images/10/3.jpg",
      "https://cdn.dummyjson.com/product-images/10/thumbnail.jpeg"
    ]
  }]
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
    }).mount()

    return () => {
      slider.destroy()
    }
  }, [])

  return (
    <>
      {/*<!-- Component: Carousel with controls inside --> */}
      {ShowTitle === true ? (<h3 className="mb-4 text-2xl font-extrabold p-2 leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl flex justify-center items-center">
      <LuShoppingCart className="mr-2 text-blue-700 text-3xl" />Our Prducts
      </h3>):(<h3 className="mb-4 text-2xl font-extrabold p-2 leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl flex text-start">Related Products</h3>)}
      <div className="glide-01 relative w-full outline outline-1 outline-gray-200">
        {/*    <!-- Slides --> */}
        <div className="overflow-hidden" data-glide-el="track">
          <ul className="whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform] relative flex w-full overflow-hidden p-0">
            
            {products2.map((product) => (
                <li key={product.id}><Link
                  to={`/product-detail/${product.id}`}
                  className="group relative h-3 border-solid border-0 border-gray-200 p-1 shadow-lg rounded-lg duration-300 col-span-3 lg:col-span-3"
                >
                  <div className="aspect-h-1 aspect-w-1 w-full object-cover overflow-hidden rounded-xl bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
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
                </Link></li>
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
  )
}
