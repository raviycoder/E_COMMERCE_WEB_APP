/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import ReactDOm from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSearchProductsAsync,
  selectSearchProducts,
} from "../product/productSlice";
import { Link } from "react-router-dom";

const SearchModal = ({ isShowing, setIsShowing }) => {
  const wrapperRef = useRef(null);
  const [searchProduct, setSearchProduct] = useState("");
  const dispatch = useDispatch();
  const getSearch = useSelector(selectSearchProducts);
  const [focusedIndex, setFocusedIndex] = useState(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsShowing(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsShowing, wrapperRef]);

  const tableItems = [
    {
      name: "Liam James",
      email: "liamjames@example.com",
      position: "Software engineer",
      salary: "$100K",
    },
    {
      name: "Olivia Emma",
      email: "oliviaemma@example.com",
      position: "Product designer",
      salary: "$90K",
    },
    {
      name: "William Benjamin",
      email: "william.benjamin@example.com",
      position: "Front-end developer",
      salary: "$80K",
    },
    {
      name: "Henry Theodore",
      email: "henrytheodore@example.com",
      position: "Laravel engineer",
      salary: "$120K",
    },
    {
      name: "Amelia Elijah",
      email: "amelia.elijah@example.com",
      position: "Open source manager",
      salary: "$75K",
    },
  ];

  useEffect(() => {
    let html = document.querySelector("html");

    if (html) {
      if (isShowing && html) {
        html.style.overflowY = "hidden";

        const focusableElements =
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

        const modal = document.querySelector("#modal"); // select the modal by it's id

        const firstFocusableElement =
          modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal

        const focusableContent = modal.querySelectorAll(focusableElements);

        const lastFocusableElement =
          focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

        document.addEventListener("keydown", function (e) {
          if (e.keyCode === 27) {
            setIsShowing(false);
          }

          let isTabPressed = e.key === "Tab" || e.keyCode === 9;

          if (!isTabPressed) {
            return;
          }

          if (e.shiftKey) {
            // if shift key pressed for shift + tab combination
            if (document.activeElement === firstFocusableElement) {
              lastFocusableElement.focus(); // add focus for the last focusable element
              e.preventDefault();
            }
          } else {
            // if tab key is pressed
            if (document.activeElement === lastFocusableElement) {
              // if focused has reached to last focusable element then focus first focusable element after pressing tab
              firstFocusableElement.focus(); // add focus for the first focusable element
              e.preventDefault();
            }
          }
        });

        firstFocusableElement.focus();
      } else {
        html.style.overflowY = "visible";
      }
    }
  }, [isShowing, setIsShowing]);

  const handleSearch = (e) => {
    const text = e.target.value;
    setSearchProduct(text);
    dispatch(fetchSearchProductsAsync(text));
    console.log(text);
  };

  const handelKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        setFocusedIndex((prevIndex)=> (prevIndex === null ? 0 : Math.min(prevIndex + 1, getSearch.length - 1)));
        break;
      case 'ArrowUp':
        setFocusedIndex((prevIndex) => (prevIndex === null ? 0 : Math.max(prevIndex - 1, 0)));
        break; 
        case 'Enter':
          if (focusedIndex !== null) {
            const selectedProduct = getSearch[focusedIndex];
            if(selectedProduct){
              window.location.href = `/product-detail/${selectedProduct.id}`;
              setFocusedIndex(false);
            }
          }
          break;
        default:
          break;
    }
  }

  useEffect(()=>{
    window.addEventListener('keydown', handelKeyDown);
    return()=>{
      window.removeEventListener('keydown', handelKeyDown)
    }
  })

  return (
    <>
      {isShowing && typeof document !== "undefined"
        ? ReactDOm.createPortal(
            <div
              className="fixed top-0 left-0 max-2xl:z-50 z-20 flex h-screen w-screen items-center justify-center bg-slate-300/20 backdrop-blur-sm"
              aria-labelledby="header-4a content-4a"
              aria-modal="true"
              tabIndex="-1"
              role="dialog"
            >
              {/*    <!-- Modal --> */}
              <div
                ref={wrapperRef}
                className="flex max-h-[90vh] mx-3 sm:w-[900px] flex-col gap-4 overflow-hidden rounded bg-white p-6 text-slate-500 shadow-xl shadow-slate-700/10 overflow-y-auto"
                id="modal"
                role="document"
              >
                {/*        <!-- Modal header --> */}
                <header id="header-4a" className="flex items-center">
                  <h3 className="flex-1 text-lg font-medium text-slate-700">
                    Search Products
                  </h3>
                  <button
                    onClick={() => setIsShowing(false)}
                    className="inline-flex h-10 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded-full px-5 text-sm font-medium tracking-wide  text-blue-500 transition duration-300 hover:bg-blue-100 hover:text-blue-600 focus:bg-blue-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-blue-300 disabled:shadow-none disabled:hover:bg-transparent"
                    aria-label="close dialog"
                  >
                    <span className="relative only:-mx-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        role="graphics-symbol"
                        aria-labelledby="title-79 desc-79"
                      >
                        <title id="title-79">Icon title</title>
                        <desc id="desc-79">
                          A more detailed description of the icon
                        </desc>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </span>
                  </button>
                </header>
                {/*        <!-- Modal body --> */}
                <div id="content-4a" className="flex-1 -mt-10">
                  <form
                    onSubmit={(e) => e.preventDefault()}
                    className="max-w-x3l px-4 mx-auto mt-12"
                  >
                    <div className="relative">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      <input
                        type="text"
                        placeholder="Search"
                        value={searchProduct}
                        onChange={handleSearch}
                        className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                      />
                    </div>
                  </form>
                  <div className="mt-3 shadow-sm border rounded-lg overflow-x-auto mx-3 max-h-96 overflow-y-auto">
                    <ul className="w-full text-sm text-gray-600 divide-y">
                      {getSearch.slice(0, 10).map((item, idx) => (
                        <li
                          key={idx}
                          onMouseEnter={()=> setFocusedIndex(idx)}
                          className={`duration-300  ${focusedIndex === idx ? 'bg-blue-100':''}`}
                        >
                          <Link
                            to={`/product-detail/${item.id}`}
                            onClick={() => setIsShowing(false)}
                            className="block px-6 py-4 whitespace-nowrap"
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {/*        <!-- Modal actions --> */}
                {/* <div className="flex justify-center gap-2">
                  <button className="inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded bg-blue-500 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-blue-600 focus:bg-blue-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-300 disabled:shadow-none">
                    <span>Login</span>
                  </button>
                </div> */}
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
};

export default SearchModal;
