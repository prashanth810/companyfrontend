import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { getsinglecompanydata } from "../../../redux/slices/CompanylistSlice";
import Loaderpage from "../../../componenets/loader/Loaderpage";

const SingleCompanydetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        singlecompanyloading,
        singlecompanyerror,
        singlecompanydata,
    } = useSelector((state) => state.company.singlecompany);

    const data = singlecompanydata?.data;

    // ⭐ MAIN IMAGE STATE
    const [mainImage, setMainImage] = useState("");

    useEffect(() => {
        if (id) {
            dispatch(getsinglecompanydata(id));
        }
    }, [id]);

    // When data loads, set default main image
    useEffect(() => {
        if (data?.coverImage) {
            setMainImage(data.coverImage);
        }
    }, [data]);

    return (
        <section className="max-w-7xl mx-auto px-4 py-10">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 hover:text-gray-200 text-white mb-6">
                <ArrowLeft size={22} />
                Back
            </button>

            {/* ERROR */}
            {singlecompanyerror && (
                <p className="text-center text-red-500">{singlecompanyerror}</p>
            )}

            {/* LOADING */}
            {singlecompanyloading && (
                <div className="w-full h-screen flex items-center justify-center">
                    <Loaderpage />
                </div>
            )}


            {/* CONTENT */}
            {data && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">

                    {/* LEFT IMAGE PANEL (non-scrollable) */}
                    <div className="sticky top-20 h-fit">
                        <img
                            src={mainImage}
                            alt={data.companyName}
                            className="rounded-lg shadow-md w-full max-h-82 object-cover"
                        />

                        {/* Thumbnails */}
                        <div className="w-[98%] mx-auto overflow-auto sidebar flex items-center gap-x-2 mt-4">
                            {/* Cover image also clickable */}
                            <img
                                src={data.coverImage}
                                className={`w-full h-24 object-cover rounded-md cursor-pointer border 
                                    ${mainImage === data.coverImage ? "border-blue-500" : "border-transparent"}`}
                                onClick={() => setMainImage(data.coverImage)}
                            />

                            {data.companyImages?.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    className={`w-full h-24 object-cover rounded-md cursor-pointer border 
                                        ${mainImage === img ? "border-blue-500" : "border-transparent"}`}
                                    onClick={() => setMainImage(img)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* RIGHT SIDE SCROLLABLE CONTENT */}
                    <div className="space-y-6 overflow-y-scroll max-h-[90vh] pr-3 overflow-auto sidebar">

                        {/* Title */}
                        <div>
                            <h2 className="text-3xl font-semibold">
                                {data.companyName}
                            </h2>
                            <p className="text-gray-400 text-sm mt-2">{data.description}</p>
                        </div>

                        {/* Basic Info */}
                        <div className="bg-[#142135] rounded-sm p-5 space-y-1">
                            <p className="font-semibold border-b pb-2 border-[#343434] text-lg"> Details </p>
                            <div className="pt-2">
                                <p><strong>Industry:</strong> {data.industry}</p>
                                <p><strong>Type:</strong> {data.companyType}</p>
                                <p><strong>Founded:</strong> {data.foundedYear}</p>
                                <p><strong>Employees:</strong> {data.employeesCount}</p>
                                <p><strong>Rating:</strong> ⭐ {data.rating}</p>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="bg-[#142135] rounded-sm p-5 space-y-1">
                            <p className="font-semibold border-b pb-2 border-[#343434] text-lg">Address</p>
                            <p className="pt-2 text-sm">{data.address}</p>
                            <p>{data.city}, {data.state}, {data.country}</p>
                        </div>

                        {/* Contact */}
                        <div className="bg-[#142135] rounded-sm p-5 space-y-1">
                            <p className="font-semibold border-b pb-2 border-[#343434] text-lg">Contact</p>
                            <p className="font-bold pt-3"> Website {" "}
                                <a className="text-blue-600" href={data.website} target="_blank">{data.website}</a></p>
                            <p><strong>Email:</strong> {data.email}</p>
                            <p><strong>Phone:</strong> {data.phone}</p>
                        </div>

                        {/* Reviews */}
                        <div className="bg-[#142135] rounded-sm p-5">
                            <p className="font-semibold mb-2 border-b pb-2 border-[#343434] ">Reviews</p>
                            <ul className="list-disc ml-5 text-gray-300 space-y-1">
                                {data.reviews?.map((r, index) => (
                                    <li key={index}>{r}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Social Links */}
                        <div className="bg-[#142135] rounded-sm p-5 space-y-2">
                            <p className="font-semibold">Social Links</p>
                            <div className="flex items-center gap-x-3">
                                <a className="hover:text-blue-600 block border border-blue-600 p-2 hover:bg-blue-400 duration-500 transition-all" href={data.socialLinks?.facebook} target="_blank"> <Facebook size={20} /> </a>
                                <a className="hover:text-pink-600 block border border-pink-600 p-2 hover:bg-pink-300  duration-500 transition-all" href={data.socialLinks?.instagram} target="_blank"> <Instagram size={20} /> </a>
                                <a className="hover:text-blue-700 block border border-blue-600 p-2 hover:bg-blue-400 duration-500 transition-all" href={data.socialLinks?.linkedin} target="_blank"> <Linkedin size={20} /> </a>
                                <a className="hover:text-blue-500 block border border-blue-500 hover:bg-blue-300  p-2 duration-500 transition-all" href={data.socialLinks?.twitter} target="_blank"> <Twitter size={20} /> </a>
                            </div>
                        </div>

                    </div>
                </div>
            )}

        </section>
    );
};

export default SingleCompanydetails;
