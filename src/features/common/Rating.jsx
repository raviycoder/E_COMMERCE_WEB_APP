/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

const Rating = ({ product, isReview }) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const starValue = index + 1;
    const isHalfStar =
      product.rating >= starValue - 0.5 && product.rating < starValue;
    const isFullStar = product.rating >= starValue;

    return (
      <span key={index} className="text-yellow-400 mx-[1.5px]">
        {isFullStar ? <BsStarFill /> : isHalfStar ? <BsStarHalf /> : <BsStar />}
      </span>
    );
  });

  if (isReview == true) {
    return (
      <>
        <div className="flex">{stars}</div>
        <span className="ml-2">
          <h2>{product.rating} Rating</h2>
        </span>
      </>
    );
  } else {
    return (
      <>
        <div className="flex flex-col items-center gap-2 justify-center">
          {/*          <!-- Title --> */}
          <h4 className="font-bold text-slate-700">Customer reviews</h4>
          {/*          <!-- Rating --> */}
          <div className="flex">{stars}</div>
          <span className="ml-2">
            <h2>{product.rating} Rating</h2>
          </span>
          {/*          <!-- Helper text --> */}
          <span className="text-xs leading-6 text-slate-400">
            based on 147 user ratings
          </span>
          {/*          <!-- Detailed rating --> */}
          <span className="flex w-full flex-col gap-4 pt-6 max-w-sm">
            <span className="flex w-full items-center gap-2">
              <label
                id="p03e-label"
                htmlFor="p03e"
                className="mb-0 w-9 shrink-0 text-center text-xs text-slate-500"
              >
                5 star
              </label>
              <progress
                aria-labelledby="p03e-label"
                id="p03e"
                max="100"
                value={"75"}
                className="block h-3 w-full overflow-hidden rounded bg-slate-100 [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-amber-400 [&::-moz-progress-bar]:bg-amber-400"
              >
                75%
              </progress>
              <span className="w-9 text-xs font-bold text-slate-700">112 </span>
            </span>
            <span className="flex w-full items-center gap-2">
              <label
                id="p03e-label"
                htmlFor="p03e"
                className="mb-0 w-9 shrink-0 text-center text-xs text-slate-500"
              >
                4 star
              </label>
              <progress
                aria-labelledby="p03e-label"
                id="p03e"
                max="100"
                value="28"
                className="block h-3 w-full overflow-hidden rounded bg-slate-100 [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-amber-400 [&::-moz-progress-bar]:bg-amber-400"
              >
                75%
              </progress>
              <span className="w-9 text-xs font-bold text-slate-700">17 </span>
            </span>
            <span className="flex w-full items-center gap-2">
              <label
                id="p03e-label"
                htmlFor="p03e"
                className="mb-0 w-9 shrink-0 text-center text-xs text-slate-500"
              >
                3 star
              </label>
              <progress
                aria-labelledby="p03e-label"
                id="p03e"
                max="100"
                value="18"
                className="block h-3 w-full overflow-hidden rounded bg-slate-100 [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-amber-400 [&::-moz-progress-bar]:bg-amber-400"
              >
                75%
              </progress>
              <span className="w-9 text-xs font-bold text-slate-700">12 </span>
            </span>
            <span className="flex w-full items-center gap-2">
              <label
                id="p03e-label"
                htmlFor="p03e"
                className="mb-0 w-9 shrink-0 text-center text-xs text-slate-500"
              >
                2 star
              </label>
              <progress
                aria-labelledby="p03e-label"
                id="p03e"
                max="100"
                value="8"
                className="block h-3 w-full overflow-hidden rounded bg-slate-100 [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-amber-400 [&::-moz-progress-bar]:bg-amber-400"
              >
                75%
              </progress>
              <span className="w-9 text-xs font-bold text-slate-700">2 </span>
            </span>
            <span className="flex w-full items-center gap-2">
              <label
                id="p03e-label"
                htmlFor="p03e"
                className="mb-0 w-9 shrink-0 text-center text-xs text-slate-500"
              >
                1 star
              </label>
              <progress
                aria-labelledby="p03e-label"
                id="p03e"
                max="100"
                value="10"
                className="block h-3 w-full overflow-hidden rounded bg-slate-100 [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-amber-400 [&::-moz-progress-bar]:bg-amber-400"
              >
                75%
              </progress>
              <span className="w-9 text-xs font-bold text-slate-700">4 </span>
            </span>
          </span>
        </div>
      </>
    );
  }
};

export default Rating;
