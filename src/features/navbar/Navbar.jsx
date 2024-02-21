/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
/* eslint-disable react/display-name */
/* eslint-disable react-refresh/only-export-components */
import Brand from "../../assets/Com.png";
import { useSelector } from "react-redux";
import { selectItems } from "../cart/cartSlice";
import Profile from "../../assets/403017_avatar_default_head_person_unknown_icon.png";
import { selectUserInfo } from "../user/userSlice";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import SearchModal from "../common/SearchModal";

// Profile Dropdown
const ProfileDropDown = (props) => {
  const [state, setState] = useState(false);
  const profileRef = useRef();
  const [image, setImage] = useState(Profile)
  const userInfo = useSelector(selectUserInfo);

  const navigation = [
    { title: "My Profile", to: "/profile" },
    { title: "My Orders", to: "/orders" },
    { title: "Log out", to: "/logout" },
    userInfo.role === "admin" ? { title: "Admin", to: "/admin/dashboard", admin: true } : null,
    userInfo.role === "admin" ? { title: "Orders", to: "/admin/orders", admin: true } : null,
  ].filter(item => item !== null);

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

    console.log('image path', userInfo.image);

  return (
    <div className={`relative ${props.class}`}>
      <div className="flex items-center space-x-4">
        <button
          ref={profileRef}
          className="w-10 h-10 outline-none rounded-full ring-offset-2 ring-gray-200 ring-2 lg:focus:ring-indigo-600"
          onClick={() => setState(!state)}
        >
          <img
            src={`/profile-images/${userInfo.image}`}
            alt="Profile"
            className="w-full h-full rounded-full"
          />
        </button>
        <div className="lg:hidden">
          <span className="block">{userInfo.name? userInfo.name:'New User'}</span>
          <span className="block text-sm text-gray-500">{userInfo.email}</span>
        </div>
      </div>
      <ul
        className={`bg-blue-100 top-12 right-0 mt-5 space-y-5 lg:absolute lg:border lg:rounded-md lg:text-sm lg:w-52 lg:shadow-md lg:space-y-0 z-50 lg:mt-0 ${
          state ? "" : "lg:hidden"
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

const Navbar = () => {

  const [state, setState] = useState({
    "id-l16": "",
  })

  const handleChange = evt => {
    const value = evt.target.value
    setState({
      ...state,
      [evt.target.name]: value,
    })
  }
  const items = useSelector(selectItems);
  const userInfo = useSelector(selectUserInfo);

  const [isShowing, setIsShowing] = useState(false)

  const [menuState, setMenuState] = useState(false);

  // Replace javascript:void(0) path with your path
  const navigation = [
    { title: "Home", to: "/", user: true },
    { title: "Products", to: "/Products", user: true },
    { title: "About", to: "/about", user: true },
    { title: "Contact Us", to: "/contact", user: true },
  ];
  return (
    <>
      {userInfo && (
        <nav className=" bg-blue-100 border-b">
          <div className="flex items-center space-x-8 py-1 px-4 max-w-screen-xl mx-auto md:px-8">
            <div className="flex-none lg:flex-initial">
              <Link to="/">
                <img src={Brand} width={70} height={20} alt="Brand Logo" />
              </Link>
            </div>
            <div className="flex-1 flex items-center justify-between">
              <div
                className={` bg-blue-100 absolute z-10 w-full top-16 left-0 p-4 border-b lg:static lg:block lg:border-none ${
                  menuState ? "" : "hidden"
                }`}
              >
                <ul className="mt-12 space-y-5 lg:flex lg:space-x-6 lg:space-y-0 lg:mt-0">
                  {navigation.map((item, index) => (
                    <li
                      key={index}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <Link to={item.to}>{item.title}</Link>
                    </li>
                  ))}
                </ul>
                <ProfileDropDown class="mt-5 pt-5 border-t lg:hidden" />
              </div>

              <div className="flex-1 flex items-center justify-end space-x-2 sm:space-x-6 bg">
                {/* <form className="flex items-center space-x-2 border rounded-md p-2 bg-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 flex-none text-gray-700"
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
                    className="w-full placeholder-gray-500 text-gray-500 sm:w-auto"
                    type="text"
                    placeholder="Search"
                  />
                </form> */}
                <form className="relative md:w-80">
                  <input
                    id="id-l16"
                    type="text"
                    name="id-l16"
                    onClick={()=>setIsShowing(true)}
                    placeholder="Search here"
                    value={state["id-l16"]}
                    className="relative w-full h-12 px-4 pr-12 transition-all border rounded-xl outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                    onChange={handleChange}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute w-6 h-6 cursor-pointer top-3 right-4 stroke-slate-400 peer-disabled:cursor-not-allowed"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                    aria-labelledby="title-9 description-9"
                    role="graphics-symbol"
                  >
                    <title id="title-9">Search icon</title>
                    <desc id="description-9">Icon description here</desc>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </form>
                <SearchModal isShowing={isShowing} setIsShowing={setIsShowing} />
                {/* cart start */}
                <div className="flex-row p-2 px-5 bottom-3 relative right-2">
                  <Link
                    to="/cart"
                    className={`absolute ${
                      items.length > 0 ? "top-8" : "top-5"
                    }`}
                    >
                    <button
                      type="button"
                      className="relative rounded-full text-gray-400 bottom-3 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <ShoppingCartIcon
                        className="h-8 w-8 text-blue-600"
                        aria-hidden="true"
                      />
                    </button>
                  </Link>
                  {items.length > 0 && (
                    <span className="inline-flex items-center relative left-5 top-1 justify-center gap-1 rounded bg-cyan-500 px-1.5 text-sm text-white">
                      <span className="">{items.length}</span>
                    </span>
                  )}
                </div>
                {/* cart end */}

                <ProfileDropDown class="hidden lg:block" />
                <button
                  className="outline-none text-gray-400 block lg:hidden"
                  onClick={() => setMenuState(!menuState)}
                >
                  {menuState ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16m-7 6h7"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
