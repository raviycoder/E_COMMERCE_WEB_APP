/* eslint-disable react/display-name */
/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Animated from '../../assets/animated.svg'
import brand from '../../assets/Com.png'
import { CiDeliveryTruck } from "react-icons/ci";
import Footer from '../common/Footer'
import Cash_on from '../../assets/cash_on_delivery.svg';
import CarouselControlsInside from '../product/components/ProductCarousel'
import { FaMobileAlt } from 'react-icons/fa';


const Home = () => {
    const [state, setState] = useState(false)

    // Replace javascript:void(0) paths with your paths
    const navigation = [
        { title: "Home", to: "/" },
        { title: "Products", to: "/products" },
        { title: "About", to: "/about" },
        { title: "Contact Us", to: "/contact" }
    ]

    useEffect(() => {
        document.onclick = (e) => {
            const target = e.target;
            if (!target.closest(".menu-btn")) setState(false);
        };
    }, [])

    
    const Brand = () => (
        <div className="flex items-center justify-between py-5 md:block">
            <Link to="javascript:void(0)">
                <img
                    src={brand}
                    width={120}
                    height={50}
                    alt="Float UI logo"
                />
            </Link>
            <div className="md:hidden">
                <button className="menu-btn text-gray-500 hover:text-gray-800"
                    onClick={() => setState(!state)}
                >
                    {
                        state ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        )
                    }
                </button>
            </div>
        </div>
    )
    return (
        <div className='relative flex flex-col'>
            <div className='absolute inset-0 blur-xl h-[580px]' style={{ background: "linear-gradient(143.6deg, rgba(192, 132, 252, 0) 20.79%, rgba(232, 121, 249, 0.26) 40.92%, rgba(204, 171, 238, 0) 70.35%)" }}></div>
            <div className='relative'>
                <header>
                    <div className={`md:hidden ${state ? "mx-2 pb-5" : "hidden"}`}>
                        <Brand />
                    </div>
                    <nav className={`pb-5 md:text-sm ${state ? "absolute top-0 inset-x-0 bg-white shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-0 md:mt-0 md:relative md:bg-transparent" : ""}`}>
                        <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
                            <Brand />
                            <div className={`flex-1 items-center mt-8 md:mt-0 md:flex ${state ? 'block' : 'hidden'} `}>
                                <ul className="flex-1 justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                                    {
                                        navigation.map((item, idx) => {
                                            return (
                                                <li key={idx} className={`text-gray-700 hover:text-gray-900 ${window.location.pathname === item.to ? " bg-blue-400 text-neutral-50 rounded-md px-2 py-1":""}`}>
                                                    <Link to={item.to} className="block">
                                                        {item.title}
                                                    </Link>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                <div className="items-center justify-end mt-6 space-y-6 md:flex md:mt-0">
                                    <Link to="/login" className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex">
                                        Sign in
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>
                <section>
                    <div className="max-w-screen-xl mx-auto px-4 py-28 text-gray-600 overflow-hidden md:px-8 md:flex container justify-evenly p-6 sm:py-24 grid grid-cols-1 lg:grid-cols-3 lg:gap-8 max-md:gap-y-24 max-sm:gap-y-8">
                        <div className='flex-none space-y-5 max-w-xl flex-shrink'>
                            <Link to="javascript:void(0)" className='inline-flex gap-x-6 items-center rounded-full p-1 pr-6 border text-sm font-medium duration-150 hover:bg-white'>
                                <span className='inline-block rounded-full px-3 py-1 bg-indigo-600 text-white'>
                                    News
                                </span>
                                <p className='flex items-center'>
                                    Read the launch post from here
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                    </svg>
                                </p>
                            </Link>
                            <h1 className="text-4xl text-gray-800 font-extrabold sm:text-5xl">
                            Elevate Your Everyday: Discover, Shop, Thrive.
                            </h1>
                            <p>
                            Where Trends Collide and Shoppers Thrive – Welcome to the Future of Shopping.
                            </p>
                            <div className='flex items-center gap-x-3 sm:text-sm'>
                                <Link to="javascript:void(0)" className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 duration-150 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex">
                                    Get started
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                    </svg>
                                </Link>
                                <Link tLink="javascript:void(0)" className="flex items-center justify-center gap-x-1 py-2 px-4 text-gray-700 hover:text-gray-900 font-medium duration-150 md:inline-flex">
                                    Contact sales
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                        <div className='object-cover relative h-[900px] w-[900px] max-md:w-full max-md:h-full '>
                            {/* Replace with your image */}
                            <img src={Animated} className=" relative h-[600px] w-[600px] bottom-28" />
                        </div>
                    </div>
                    <div className='relative bottom-[28rem] max-md:bottom-48'><CarouselControlsInside ShowTitle={true} /></div>
                    <div className='-mt-96 max-md:-mt-52'> <FeatureSection /></div>
                   <Footer/>
                </section>
            </div>
        </div>
    )
}

export default Home;

function FeatureSection () {

    const features = [
        {
            icon:
            <FaMobileAlt />,
            title: "Good Quality Products",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius."
        },
        {
            icon:
            <img src={Cash_on} className='h-8' />,
            title: "Cash on Delivery",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius."
        },
        {
            icon:
            <CiDeliveryTruck/>,
            title: "Fast Delivery Service",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius."
        }
    ]

    return (
        <section className="py-14">
            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
                <div className="max-w-xl space-y-3">
                    <h3 className="text-indigo-600 font-semibold">
                        Services
                    </h3>
                    <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                    Unleash Your Style, Shop with a Smile!
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius
                    </p>
                </div>
                <div className="mt-12">
                    <ul className="grid gap-x-12 divide-y [&>.feature-1]:pl-0 sm:grid-cols-2 sm:gap-y-8 sm:divide-y-0 lg:divide-x lg:grid-cols-3 lg:gap-x-0">
                        {
                            features.map((item, idx) => (
                                <li key={idx} className={`feature-${idx + 1} space-y-3 py-8 lg:px-12 sm:py-0`}>
                                    <div className="w-12 h-12 text-2xl border text-indigo-600 rounded-full flex items-center justify-center">
                                        {item.icon}
                                    </div>
                                    <h4 className="text-lg text-gray-800 font-semibold">
                                        {item.title}
                                    </h4>
                                    <p>
                                        {item.desc}
                                    </p>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </section>
    )
}