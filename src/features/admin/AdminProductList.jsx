/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { ITEMS_PER_PAGE } from "../../app/constants";
import { Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { FaStar } from "react-icons/fa";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import {
  fetchBrandsAsync,
  fetchCategoriesAsync,
  fetchProductsByFiltersAsync,
  selectAllProducts,
  selectBrands,
  selectCategories,
  selectTotalItems,
} from "../product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import ProductStatus from "./components/ProductStatus";
import PriceFilter from "../common/PriceFilter";

const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "desc", current: false },
  { name: "Price: Low to High", sort: "price", order: "asc", current: false },
  { name: "Price: High to Low", sort: "price", order: "desc", current: false },
  { name: "Default Option", sort: "price", order: "", current: false },
];
const subCategories = [
  { name: "Totes", href: "#" },
  { name: "Backpacks", href: "#" },
  { name: "Travel Bags", href: "#" },
  { name: "Hip Bags", href: "#" },
  { name: "Laptop Sleeves", href: "#" },
];

const AdminProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const [range, setRange] = useState([0, 2060]);
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const totalItems = useSelector(selectTotalItems);
  const [filter, setFilter] = useState({});
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

  const handleFilter = (e, section, option) => {
    console.log(e.target.checked);
    const newFilter = { ...filter };
    if (e.target.checked) {
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
    console.log({ newFilter });
    setFilter(newFilter);
  };

  const handleSort = (e, option) => {
    console.log("this is a sort");
    const sort = { _sort: option.sort, _order: option.order };
    console.log({ sort });
    setSort(sort);
  };

  const handlePage = (page) => {
    console.log({ page });
    setPage(page);
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    const itemprice = { minPrice: range[0], maxPrice: range[1] };
    dispatch(
      fetchProductsByFiltersAsync({
        filter,
        sort,
        pagination,
        itemprice,
        admin: true,
      })
    );
  }, [dispatch, filter, sort, page, range]);

  useEffect(() => {
    setPage(1);
  }, [totalItems, sort]);

  useEffect(() => {
    dispatch(fetchBrandsAsync({ admin: true }));
    dispatch(fetchCategoriesAsync({ admin: true }));
  }, []);

  return (
    <div className="bg-white lg:ml-64 overflow-x-hidden">
      <div>
        <MobileFilter
          handleFilter={handleFilter}
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
          filters={filters}
        />

        <main className="mx-auto max-w-[190rem] px-4">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-8">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 pl-8">
              All Admin Products
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none cursor-pointer">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <p
                              onClick={(e) => {
                                handleSort(e, option), console.log(option);
                              }}
                              className={
                                (option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm")
                              }
                            >
                              {option.name}
                            </p>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="w-full">
              {/* <DesktopFilter handleFilter={handleFilter} filters={filters} /> */}

              {/* Product grid */}
              <ProductGrid products={products} />
              {/* Product grid end */}
            </div>
          </section>
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <Pagination
              page={page}
              setPage={setPage}
              handlePage={handlePage}
              totalItems={totalItems}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminProductList;

// function MobileFilter({
//   mobileFiltersOpen,
//   setMobileFiltersOpen,
//   handleFilter,
//   filters,
// }) {
//   return (
//     <div>
//       {/* Mobile filter dialog */}
//       <Transition.Root show={mobileFiltersOpen} as={Fragment}>
//         <Dialog
//           as="div"
//           className="relative z-40 lg:hidden"
//           onClose={setMobileFiltersOpen}
//         >
//           <Transition.Child
//             as={Fragment}
//             enter="transition-opacity ease-linear duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="transition-opacity ease-linear duration-300"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 bg-black bg-opacity-25" />
//           </Transition.Child>

//           <div className="fixed inset-0 z-40 flex">
//             <Transition.Child
//               as={Fragment}
//               enter="transition ease-in-out duration-300 transform"
//               enterFrom="translate-x-full"
//               enterTo="translate-x-0"
//               leave="transition ease-in-out duration-300 transform"
//               leaveFrom="translate-x-0"
//               leaveTo="translate-x-full"
//             >
//               <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
//                 <div className="flex items-center justify-between px-4">
//                   <h2 className="text-lg font-medium text-gray-900">Filters</h2>
//                   <button
//                     type="button"
//                     className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
//                     onClick={() => setMobileFiltersOpen(false)}
//                   >
//                     <span className="sr-only">Close menu</span>
//                     <XMarkIcon className="h-6 w-6" aria-hidden="true" />
//                   </button>
//                 </div>

//                 {/* Filters */}
//                 <form className="mt-4 border-t border-gray-200">
//                   <h3 className="sr-only">Categories</h3>
//                   <ul
//                     role="list"
//                     className="px-2 py-3 font-medium text-gray-900"
//                   >
//                     {subCategories.map((category) => (
//                       <li key={category.name}>
//                         <a href={category.href} className="block px-2 py-3">
//                           {category.name}
//                         </a>
//                       </li>
//                     ))}
//                   </ul>

//                   {filters.map((section) => (
//                     <Disclosure
//                       as="div"
//                       key={section.id}
//                       className="border-t border-gray-200 px-4 py-6"
//                     >
//                       {({ open }) => (
//                         <>
//                           <h3 className="-mx-2 -my-3 flow-root">
//                             <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
//                               <span className="font-medium text-gray-900">
//                                 {section.name}
//                               </span>
//                               <span className="ml-6 flex items-center">
//                                 {open ? (
//                                   <MinusIcon
//                                     className="h-5 w-5"
//                                     aria-hidden="true"
//                                   />
//                                 ) : (
//                                   <PlusIcon
//                                     className="h-5 w-5"
//                                     aria-hidden="true"
//                                   />
//                                 )}
//                               </span>
//                             </Disclosure.Button>
//                           </h3>
//                           <Disclosure.Panel className="pt-6">
//                             <div className="space-y-6">
//                               {section.options.map((option, optionIdx) => (
//                                 <div
//                                   key={option.value}
//                                   className="flex items-center"
//                                 >
//                                   <input
//                                     id={`filter-mobile-${section.id}-${optionIdx}`}
//                                     name={`${section.id}[]`}
//                                     defaultValue={option.value}
//                                     type="checkbox"
//                                     defaultChecked={option.checked}
//                                     className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                                   />
//                                   <label
//                                     htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
//                                     className="ml-3 min-w-0 flex-1 text-gray-500"
//                                   >
//                                     {option.label}
//                                   </label>
//                                 </div>
//                               ))}
//                             </div>
//                           </Disclosure.Panel>
//                         </>
//                       )}
//                     </Disclosure>
//                   ))}
//                 </form>
//               </Dialog.Panel>
//             </Transition.Child>
//           </div>
//         </Dialog>
//       </Transition.Root>
//     </div>
//   );
// }
// function DesktopFilter({ handleFilter, filters }) {
//   return (
//     <div className="hidden lg:block">
//       {filters.map((section) => (
//         <Disclosure
//           as="div"
//           key={section.id}
//           className="border-b border-gray-200 py-6"
//         >
//           {({ open }) => (
//             <>
//               <h3 className="-my-3 flow-root">
//                 <Disclosure.Button
//                   className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
//                   aria-label={`Toggle ${section.name} filters`}
//                 >
//                   <span className="font-medium text-gray-900">
//                     {section.name}
//                   </span>
//                   <span className="ml-6 flex items-center">
//                     {open ? (
//                       <MinusIcon className="h-5 w-5" aria-hidden="true" />
//                     ) : (
//                       <PlusIcon className="h-5 w-5" aria-hidden="true" />
//                     )}
//                   </span>
//                 </Disclosure.Button>
//               </h3>
//               <Disclosure.Panel className="pt-6">
//                 <div className="space-y-4">
//                   {section.options.map((option, optionIdx) => (
//                     <div key={option.value} className="flex items-center">
//                       <input
//                         id={`filter-${section.id}-${optionIdx}`}
//                         name={`${section.id}[]`}
//                         defaultValue={option.value}
//                         type="checkbox"
//                         defaultChecked={option.checked}
//                         onChange={(e) => handleFilter(e, section, option)}
//                         className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500 rounded-full"
//                       />
//                       <label
//                         htmlFor={`filter-${section.id}-${optionIdx}`}
//                         className="ml-3 text-sm text-gray-600"
//                       >
//                         {option.label}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               </Disclosure.Panel>
//             </>
//           )}
//         </Disclosure>
//       ))}
//     </div>
//   );
// }

function MobileFilter({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  handleFilter,
  filters,
  products,
  maxPrice,
  range,
  setRange,
  isConditonTrue,
  radioSelected,
  handleRadioChange,
}) {
  return (
    <div>
      {/* Mobile filter dialog */}
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setMobileFiltersOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <div className="relative flex items-center p-4">
                  <input
                    className="w-4 h-4 transition-colors bg-white border-2 rounded-full appearance-none cursor-pointer peer border-slate-500 checked:border-cyan-500 checked:bg-cyan-500 checked:hover:border-cyan-600 checked:hover:bg-cyan-600 focus:outline-none checked:focus:border-cyan-700 checked:focus:bg-cyan-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50"
                    type="radio"
                    value=""
                    checked={radioSelected}
                    disabled={isConditonTrue}
                    id="louie"
                    name="drone"
                    onChange={handleRadioChange}
                  />
                  <label className="pl-2 cursor-pointer text-slate-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400">
                    All Products
                  </label>
                  <svg
                    className="absolute left-0 w-4 h-4 transition-all duration-300 scale-50 opacity-0 pointer-events-none fill-white peer-checked:scale-100 peer-checked:opacity-100 peer-disabled:cursor-not-allowed"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-labelledby="title-3 description-3"
                    role="graphics-symbol"
                  >
                    <title id="title-3">Circle Shape</title>
                    <desc id="description-3">
                      Circle shape to indicate whether the radio input is
                      checked or not.
                    </desc>
                    <circle cx="8" cy="8" r="4" />
                  </svg>
                </div>
                <form className="mt-4 border-t border-gray-200">
                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    onChange={(e) =>
                                      handleFilter(e, section, option)
                                    }
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
                <div className="w-72 justify-center items-center ml-4">
                  <PriceFilter
                    products={products}
                    maxPrice={maxPrice}
                    range={range}
                    setRange={setRange}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
export function DesktopFilter({
  handleFilter,
  filters,
  isConditonTrue,
  radioSelected,
  handleRadioChange,
  checkbox,
  products,
  maxPrice,
  range,
  setRange,
}) {
  return (
    <div className="lg:block">
      <div className="relative flex items-center">
        <input
          className="w-4 h-4 transition-colors bg-white border-2 rounded-full appearance-none cursor-pointer peer border-slate-500 checked:border-cyan-500 checked:bg-cyan-500 checked:hover:border-cyan-600 checked:hover:bg-cyan-600 focus:outline-none checked:focus:border-cyan-700 checked:focus:bg-cyan-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50"
          type="radio"
          value=""
          checked={radioSelected}
          disabled={isConditonTrue}
          id="louie"
          name="drone"
          onChange={handleRadioChange}
        />
        <label className="pl-2 cursor-pointer text-slate-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400">
          All Products
        </label>
        <svg
          className="absolute left-0 w-4 h-4 transition-all duration-300 scale-50 opacity-0 pointer-events-none fill-white peer-checked:scale-100 peer-checked:opacity-100 peer-disabled:cursor-not-allowed"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-labelledby="title-3 description-3"
          role="graphics-symbol"
        >
          <title id="title-3">Circle Shape</title>
          <desc id="description-3">
            Circle shape to indicate whether the radio input is checked or not.
          </desc>
          <circle cx="8" cy="8" r="4" />
        </svg>
      </div>
      {filters.map((section) => (
        <Disclosure
          as="div"
          key={section.id}
          className="border-b border-gray-200 py-6"
        >
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button
                  className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
                  aria-label={`Toggle ${section.name} filters`}
                >
                  <span className="font-medium text-gray-900">
                    {section.name}
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6">
                <div className="space-y-4 overflow-scroll h-96 overflow-x-hidden px-3 py-2">
                  {section.options.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        defaultValue={option.value}
                        type="checkbox"
                        defaultChecked={checkbox}
                        onChange={(e) => handleFilter(e, section, option)}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500 rounded-full"
                      />
                      <label
                        htmlFor={`filter-${section.id}-${optionIdx}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
      <PriceFilter
        products={products}
        maxPrice={maxPrice}
        range={range}
        setRange={setRange}
      />
    </div>
  );
}

function Pagination({ handlePage, page, setPage, totalItems = 55 }) {
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  return (
    <>
      <div className="flex flex-1 justify-between sm:hidden">
        <div
          onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
        >
          Previous
        </div>
        <div
          onClick={(e) => handlePage(page < totalPages ? page + 1 : page)}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
        >
          Next
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(page - 1) * ITEMS_PER_PAGE + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {page * ITEMS_PER_PAGE > totalItems
                ? totalItems
                : page * ITEMS_PER_PAGE}
            </span>{" "}
            of <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <div
              onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {Array.from({ length: totalPages }).map((el, index) => (
              <div
                onClick={(e) => handlePage(index + 1)}
                aria-current="page"
                key={index}
                className={`relative cursor-pointer z-10 inline-flex items-center ${
                  index + 1 === page
                    ? "bg-indigo-600 text-white"
                    : "text-gray-400"
                } px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                {index + 1}
              </div>
            ))}
            <div
              onClick={(e) => handlePage(page < totalPages ? page + 1 : page)}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
// function ProductGrid({ products }) {
//   return (
//     <div className="lg:col-span-3">
//       <div className="bg-white">
//         <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
//           <Link to="/admin/product_form" className="text-xl font-bold tracking-tight text-neutral-50 bg-blue-500 shadow-lg hover:bg-blue-600 p-2 rounded-lg">
//           + Add New Product
//           </LinkLink

//           <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-8 max-sm:grid-cols-2 ">
//             {products.map((product) => (
//               <div>
//                 <Link
//                   to={`/product-detail/${product.id}`}
//                   key={product.id}
//                   className="group relative border-solid border-0 border-gray-200 p-1 shadow-lg rounded-lg hover:scale-105 duration-300 "
//                 >
//                   <div className="aspect-h-1 aspect-w-1 w-full object-cover overflow-hidden rounded-xl bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
//                     <img
//                       src={product.thumbnail}
//                       alt={product.title}
//                       className="h-full w-full object-cover object-center lg:h-full lg:w-full"
//                     />
//                   </div>
//                   <div className="mt-4 flex justify-between">
//                     <div>
//                       <h3 className="text-sm text-gray-700 font-medium">
//                         <div href={product.href}>
//                           <span
//                             aria-hidden="true"
//                             className="absolute inset-0"
//                           />
//                           {product.title}
//                         </div>
//                       </h3>
//                       <p className="mt-1 text-sm items-center flex flex-row text-gray-500">
//                         <FaStar className="h-3 w-3 mr-1 text-yellow-400" />
//                         {product.rating}
//                       </p>
//                     </div>
//                     <div className="flex flex-col">
//                       <p className="text-sm font-medium text-gray-900">
//                         $
//                         {Math.round(
//                           product.price * (1 - product.discountPercentage / 100)
//                         )}
//                       </p>
//                       <p className="text-xs font-medium text-gray-600 line-through">
//                         ${product.price}
//                       </p>
//                     </div>
//                   </div>
//                     {product.deleted && <div className="flex whitespace-nowrap">
//                       <p className="text-sm text-red-400">Product Deleted</p>
//                     </div>}
//                 </Link>
//                 <div className="mt- justify-between w-full">
//                   <Link to={`/admin/product_form/edit/${product.id}`} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Edit</Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }Link
function ProductGrid({ products }) {
  console.log("ProductGrid", products);
  return (
    <div className="max-w-screen-2xl mx-auto px-4 md:pl-8">
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            All Products
          </h3>
          <p className="text-gray-600 mt-2">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
        <div className="mt-3 md:mt-0">
          <Link
            to="/admin/product_form"
            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
          >
            Add Product
          </Link>
        </div>
      </div>
      <div className="mt-12 shadow-sm border rounded-lg max-xl:overflow-x-auto ">
        <table className="w-full table-auto text-sm text-left px96">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Products</th>
              <th className="py-3 px-6">Rating</th>
              <th className="py-3 px-6">Discount Price</th>
              <th className="py-3 px-6">Actual Price</th>
              <th className="py-3 px-6"></th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y ">
            {products.map((item, idx) => (
              <tr key={idx}>
                <td className="flex items-center gap-x-3 py-3 px-6 whitespace-pre-wrap">
                  {item.thumbnail.startsWith("http") ||
                  item.thumbnail.startsWith("https") ? (
                    // External image
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-20 h-20 rounded-full ring-2 ring-blue-500 ring-offset-2"
                    />
                  ) : (
                    // Local image
                    <img
                      src={`/product-images/${item.thumbnail}`}
                      alt={item.title}
                      className="w-20 h-20 rounded-full ring-2 ring-blue-500 ring-offset-2"
                    />
                  )}
                  <div>
                    <span className="block text-gray-700 text-sm font-medium pr-14">
                      {item.title}
                    </span>
                    <span className="block text-gray-700 text-xs pr-14">
                      {item.brand}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <FaStar className=" text-yellow-400 inline-flex relative bottom-[0.19rem] mr-1" />
                  {item.rating}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  $
                  {Math.round(item.price * (1 - item.discountPercentage / 100))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">${item.price}</td>
                <td className="text-right px-6 whitespace-nowrap">
                  <Link
                    to={`/admin/product_form/edit/${item.id}`}
                    className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                  >
                    Edit
                  </Link>
                  <button
                    href="javascript:void()"
                    className="py-2 leading-none px-3 font-medium text-gray-600 hover:text-gray-500 duration-150 hover:bg-gray-50 rounded-lg"
                  >
                    <ProductStatus item={item} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
