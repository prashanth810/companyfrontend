import React from "react";
import promotion from '../../../public/promotion.avif';

const Hero = () => {
    return (
        <section
            className="w-full flex flex-col items-center justify-center py-24 bg-cover bg-center bg-no-repeat h-full"
            style={{ backgroundImage: `url(${promotion})` }}
        >
            {/* Background blurred box */}
            <div className="w-[90%] md:w-[75%] backdrop-blur-sm shadow-lg px-10 py-20 rounded">
                <h1 className="text-center text-3xl font-semibold text-gray-800 mb-6">
                    Discover, rank and prospect startups worldwide
                </h1>

                <div className="flex items-center justify-center gap-4">
                    <button className="border text-sm bg-transparent hover:bg-black hover:text-white px-6 py-2 rounded duration-500 transition-all cursor-pointer">
                        BOOST STARTUP
                    </button>
                    <button className="border border-blue-600 text-sm hover:bg-blue-700 text-blue-700 hover:text-white px-6 py-2 rounded duration-500 transition-all">
                        CREATE STARTUP
                    </button>
                </div>

                <p className="text-center text-gray-700 text-sm mt-4">
                    Last Ranking Update: 1 day ago.
                </p>
            </div>
        </section>
    );
};

export default Hero;
