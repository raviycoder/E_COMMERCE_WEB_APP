/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Brand from "../../assets/Com.png";
import Product from "../../assets/product.svg";
import Profile from "../../assets/403017_avatar_default_head_person_unknown_icon.png";
import { RiAdminFill } from "react-icons/ri";
import Orders from "../../assets/Orders.svg";
import { MdDashboardCustomize } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../user/userSlice";
import {
  fetchBrandsAsync,
  fetchCategoriesAsync,
  fetchProductsByFiltersAsync,
  selectAllProducts,
  selectBrands,
  selectCategories,
  selectTotalItems,
} from "../product/productSlice";
import { ITEMS_PER_PAGE } from "../../app/constants";
import { FaArrowLeft, FaArrowRightFromBracket, FaCircleArrowLeft } from "react-icons/fa6";
import { DesktopFilter } from "../admin/AdminProductList";
import SearchModal from "../common/SearchModal";

const ProfileDropDown = (props) => {
  const [state, setState] = useState(false);
  const profileRef = useRef();
  const [image, setImage] = useState(Profile);
  const userInfo = useSelector(selectUserInfo);

  // for filtes

  // end filters

  const navigation = [
    { title: "My Profile", to: "/profile" },
    { title: "My Orders", to: "/orders" },
    { title: "Log out", to: "/logout" },
    userInfo.role === "admin"
      ? { title: "Admin", to: "/admin/dashboard", admin: true }
      : null,
    userInfo.role === "admin"
      ? { title: "Orders", to: "/admin/orders", admin: true }
      : null,
  ].filter((item) => item !== null);

  useEffect(() => {
    const handleDropDown = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setState(false);
      }
    };

    document.addEventListener("click", handleDropDown);

    return () => {
      document.removeEventListener("click", handleDropDown);
    };
  }, [profileRef]);

  console.log("image path", userInfo.image);

  return (
    <div className={`relative ${props.class}`}>
      <div className="flex items-center space-x-4">
        <button
          ref={profileRef}
          className="w-10 h-10 outline-none rounded-full ring-offset-2 ring-gray-200 ring-2 lg:focus:ring-indigo-600 flex flex-row"
          onClick={() => setState(!state)}
        >
          <img
            src={`/profile-images/${userInfo.image}`}
            alt="Profile"
            className="w-full h-full rounded-full"
          />
          <div className=" text-start ml-3">
            <span className="block">
              {userInfo.name ? userInfo.name : "New User"}
            </span>
            <span className="block text-sm text-gray-500">
              {userInfo.email}
            </span>
          </div>
        </button>
      </div>
      <ul
        className={`bg-blue-100 bottom-12 right-0 mt-5 space-y-5 lg:absolute lg:border lg:rounded-md lg:text-sm lg:w-52 lg:shadow-md lg:space-y-0 z-50 lg:mt-0 ${
          state ? "" : "hidden"
        }`}
      >
        {navigation.map((item, idx) => (
          <li key={idx}>
            <Link
              className="block text-gray-600 lg:hover:bg-gray-50 lg:p-2.5"
              to={item.to}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function SideNav() {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  //for filters
  const dispatch = useDispatch();
  const [isShowing, setIsShowing] = useState(false)
  const products = useSelector(selectAllProducts);
  const [range, setRange] = useState([0, 2060]);
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const totalItems = useSelector(selectTotalItems);
  const [isConditonTrue, setCondition] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const [radioSelected, setRadioSelected] = useState(true);
  const [filter, setFilter] = useState([]);
  const [sort, setSort] = useState({});
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const filters = [
    {
      id: "category",
      name: "Category",
      options: categories,
    },
    {
      id: "brand",
      name: "Brands",
      options: brands,
    },
  ];

  const handleRadioChange = () => {
    setRadioSelected(true);
    setCheckbox(false);
    setFilter({
      category: [],
      brand: [],
    });
  };

  const handleFilter = (e, section, option) => {
    console.log("condition", e.target.checked);
    const newFilter = { ...filter };
    if (e.target.checked) {
      setRadioSelected(isConditonTrue);
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      const index = newFilter[section.id].findIndex(
        (el) => el === option.value
      );
      newFilter[section.id].splice(index, 1);
    }
    const Uncheckedtrue = Object.values(newFilter).every(
      (checkboxes) => checkboxes.length === 0
    );
    console.log({ newFilter });
    setFilter(newFilter);
    setRadioSelected(Uncheckedtrue);
  };
  

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    const itemprice = { minPrice: range[0], maxPrice: range[1] };
    dispatch(
      fetchProductsByFiltersAsync({ filter, sort, pagination, itemprice, admin: true})
    );
  }, [dispatch, filter, sort, page, range]);

  useEffect(() => {
    setPage(1);
  }, [totalItems, sort]);

  useEffect(() => {
    dispatch(fetchBrandsAsync({admin: true}));
    dispatch(fetchCategoriesAsync({admin: true}));
  }, [dispatch]);
  // end of filtes
  return (
    <>
    <SearchModal isShowing={isShowing} setIsShowing={setIsShowing}/>
      {/*  <!-- Component: Side navigation menu with search bar and alert message --> */}
      {/*  <!-- Mobile trigger --> */}
      <button
        title="Side navigation"
        type="button"
        className={`visible fixed left-6 top-6 z-40 order-10 block h-10 w-10 self-center rounded bg-white opacity-100 lg:hidden ${
          isSideNavOpen
            ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(3)]:w-0 [&_span:nth-child(2)]:-rotate-45 "
            : ""
        }`}
        aria-haspopup="menu"
        aria-label="Side navigation"
        aria-expanded={isSideNavOpen ? " true" : "false"}
        aria-controls="nav-menu-3"
        onClick={() => setIsSideNavOpen(!isSideNavOpen)}
      >
        <div className="absolute top-1/2 left-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-700 transition-all duration-300"
          ></span>
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
          ></span>
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
          ></span>
        </div>
      </button>

      {/*  <!-- Side Navigation --> */}
      <aside
        id="nav-menu-3"
        aria-label="Side navigation"
        className={`fixed top-0 bottom-0 left-0 z-40 flex w-72 flex-col border-r border-r-slate-200 bg-white transition-transform lg:translate-x-0 ${
          isSideNavOpen ? "translate-x-0" : " -translate-x-full"
        }`}
      >
        <Link
          aria-label="e-com logo"
          className="flex items-center gap-2 whitespace-nowrap p-6 text-xl font-medium focus:outline-none"
          href="javascript:void(0)"
        >
          <div className="flex-none lg:flex-initial">
            <img src={Brand} width={70} height={20} alt="Brand Logo" />
          </div>
          <div className="relative left-24">
          <button
    className="px-3 py-1 text-indigo-600 duration-150 rounded-lg hover:bg-indigo-100 active:bg-indigo-200 "
>
 
  <Link to="/products" className="items-center inline-flex text-sm mb-2">
    Home {" "} <FaArrowRightFromBracket className= " mt-0.5 ml-2" /></Link>
</button>
          </div>
          <div className="relative top-12 left-14"><button onClick={() => setIsSideNavOpen(!isSideNavOpen)} className=" text-gray-600 p-1 hover:bg-gray-200 rounded-full focus:bg-gray-50 lg:hidden">
  <FaCircleArrowLeft />
  </button></div>
 
        </Link>
        <div className="border-b border-slate-200 p-3 pb-6">
          <div className="relative">
            <input
              id="id-b13"
              type="text"
              name="id-b13s"
              placeholder="Search here"
              onClick={()=>setIsShowing(true)}
              className="peer relative h-10 w-full rounded border border-slate-200 px-4 pr-12 text-sm text-slate-500 outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-sky-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-2.5 right-4 h-5 w-5 cursor-pointer stroke-slate-400 peer-disabled:cursor-not-allowed"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              ></path>
            </svg>
          </div>
        </div>
        <nav
          aria-label="side navigation"
          className="flex-1 divide-y divide-slate-100 overflow-auto"
        >
          <div>
            <ul className="flex flex-1 flex-col gap-1 py-3">
              <li className="px-[0.9rem]">
                <Link
                  to="/admin/dashboard"
                  aria-current={window.location.pathname === "/admin/dashboard" ? "page" : undefined}
                  className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-sky-50 hover:text-sky-500 focus:bg-sky-50 aria-[current=page]:bg-sky-50 aria-[current=page]:text-sky-500 "
                >
                  <div className="flex items-center self-center">
                    <MdDashboardCustomize className="w-4 text-xl" />
                  </div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                    Dashboard
                  </div>
                </Link>
              </li>
              <li className="px-[0.8rem]">
                <Link
                  to="/admin/adminusers"
                  className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-sky-50 hover:text-sky-500 focus:bg-sky-50 aria-[current=page]:bg-sky-50 aria-[current=page]:text-sky-500 "
                  aria-current={window.location.pathname === "/admin/adminusers" ? "page" : undefined}
                >
                  <div className="flex items-center self-center ">
                    <RiAdminFill className="w-5 text-xl" />
                  </div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                    Admins
                  </div>
                </Link>
              </li>
              <li className="px-3">
                <Link
                  to="/admin/orders"
                  className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-sky-50 hover:text-sky-500 focus:bg-sky-50 aria-[current=page]:bg-sky-50 aria-[current=page]:text-sky-500 "
                  aria-current={window.location.pathname === "/admin/orders" ? "page" : undefined}
                >
                  <div className="flex items-center self-center ">
                    <img src={Orders} alt="product" className="w-6 font-bold" />
                  </div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                    Orders
                  </div>
                </Link>
              </li>
              {/* <li className="px-3">
                <Link
                  to="/admin/products"
                  className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-sky-50 hover:text-sky-500 focus:bg-sky-50 aria-[current=page]:bg-sky-50 aria-[current=page]:text-sky-500 "
                >
                  <div className="flex items-center self-center ">
                    <img
                      src={Product}
                      alt="product"
                      className="w-6 font-bold"
                    />
                  </div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                    Products
                  </div>
                  {/* <span className="inline-flex items-center justify-center rounded-full bg-sky-100 px-2 text-xs text-sky-500 ">
                    2<span className="sr-only"> new notifications</span>
                  </span> */}
              {/* </Link>
              </li> */}
              <li className="px-2">
                <details className="group [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-sky-500 hover:bg-sky-100 hover:text-sky-500 aria-[current=page]:bg-sky-50 aria-[current=page]:text-sky-500" aria-current={window.location.pathname === "/admin" ? "page" : undefined}>
                    <Link
                      to="/admin"
                      className="inline-flex items-center space-x-2 hover: "
                      
                    >
                      {" "}
                      <div className="flex items-center self-center mt-2 ">
                        <img
                          src={Product}
                          alt="product"
                          className="w-6 font-bold"
                        />
                      </div>
                      <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm text-gray-700">
                        Products
                      </div>{" "}
                    </Link>
                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </summary>

                  <ul className="mt-2 space-y-1 px-4">
                    {/* <li>
                      <a
                        href=""
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      >
                        Banned Users
                      </a>
                    </li>

                    <li>
                      <a
                        href=""
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      >
                        Calendar
                      </a>
                    </li> */}
                    <DesktopFilter
                      handleFilter={handleFilter}
                      filters={filters}
                      isConditonTrue={isConditonTrue}
                      radioSelected={radioSelected}
                      handleRadioChange={handleRadioChange}
                      checkbox={checkbox}
                      products={products}
                      range={range}
                      setRange={setRange}
                    />
                  </ul>
                </details>
                {/* <span className="inline-flex items-center justify-center rounded-full bg-sky-100 px-2 text-xs text-sky-500 ">
                    2<span className="sr-only"> new notifications</span>
                  </span> */}
              </li>
            </ul>
          </div>
        </nav>
        {/* <div className="p-3">
          <div
            className="w-full rounded border border-cyan-100 bg-cyan-50 px-4 py-3 text-sm text-cyan-500"
            role="alert"
          >
            <h3 className="mb-2 font-semibold">Backup completed.</h3>
            <p>
              You successfully read this important alert message. Blue often
              indicates a neutral informative change or action.{" "}
            </p>
          </div>
        </div> */}
        <footer className="border-t border-slate-200 p-3">
          <ProfileDropDown class="" />
        </footer>
      </aside>

      {/*  <!-- Backdrop --> */}
      <div
        className={`fixed top-0 bottom-0 left-0 right-0 z-30 bg-slate-900/20 transition-colors sm:hidden ${
          isSideNavOpen ? "block" : "hidden"
        }`}
        onClick={() => setIsSideNavOpen(false)}
      ></div>
      {/*  <!-- End Side navigation menu with search bar and alert message --> */}
    </>
  );
}
