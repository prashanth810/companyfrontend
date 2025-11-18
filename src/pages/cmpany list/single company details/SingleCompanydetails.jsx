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

    const { singlecompanyloading, singlecompanyerror, singlecompanydata } =
        useSelector((state) => state.company.singlecompany);

    const data = singlecompanydata?.data;

    const [mainImage, setMainImage] = useState("");

    useEffect(() => {
        if (id) dispatch(getsinglecompanydata(id));
    }, [id, dispatch]);

    useEffect(() => {
        if (data?.coverImage) setMainImage(data.coverImage);
    }, [data]);

    return (
        <section className="max-w-7xl mx-auto px-4 py-20 sm:py-16">

            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 hover:text-gray-200 text-white mb-6"
            >
                <ArrowLeft size={22} />
                Back
            </button>

            {/* Error message */}
            {singlecompanyerror && (
                <p className="text-center text-red-500">{singlecompanyerror}</p>
            )}

            {/* Loader */}
            {singlecompanyloading && (
                <div className="w-full h-screen flex items-center justify-center">
                    <Loaderpage />
                </div>
            )}

            {/* MAIN CONTENT */}
            {data && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 text-white">

                    {/* LEFT — MAIN IMAGE + THUMBNAILS */}
                    <div className="lg:sticky lg:top-24 h-fit">

                        {/* Main Image */}
                        <img
                            src={mainImage}
                            alt={data.companyName}
                            className="rounded-lg shadow-md w-full max-h-[400px] sm:max-h-[450px] object-cover"
                        />

                        {/* Thumbnails */}
                        <div className="w-full overflow-x-auto mt-4 flex gap-3 pb-2">
                            {/* Cover image */}
                            <img
                                src={data.coverImage}
                                onClick={() => setMainImage(data.coverImage)}
                                className={`w-28 h-20 sm:w-32 sm:h-24 rounded-md cursor-pointer border 
                                    ${mainImage === data.coverImage ? "border-blue-500" : "border-transparent"}`}
                            />

                            {data.companyImages?.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    onClick={() => setMainImage(img)}
                                    className={`w-28 h-20 sm:w-32 sm:h-24 rounded-md cursor-pointer border 
                                    ${mainImage === img ? "border-blue-500" : "border-transparent"}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* RIGHT — DETAILS */}
                    <div className="space-y-6 overflow-y-auto lg:max-h-[85vh] pr-1 sidebar">

                        {/* Title */}
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-semibold">
                                {data.companyName}
                            </h2>
                            <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                                {data.description}
                            </p>
                        </div>

                        {/* Basic Info */}
                        <div className="bg-[#142135] rounded-md p-5 space-y-2">
                            <p className="font-semibold text-lg border-b pb-2 border-[#343434]">Details</p>

                            <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-sm">
                                <div>
                                    <p className="text-gray-300">Industry</p>
                                    <p>{data.industry}</p>
                                </div>

                                <div>
                                    <p className="text-gray-300">Type</p>
                                    <p>{data.companyType}</p>
                                </div>

                                <div>
                                    <p className="text-gray-300">Founded</p>
                                    <p>{data.foundedYear}</p>
                                </div>

                                <div>
                                    <p className="text-gray-300">Employees</p>
                                    <p>{data.employeesCount}</p>
                                </div>

                                <div>
                                    <p className="text-gray-300">Rating</p>
                                    <p>⭐ {data.rating}</p>
                                </div>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="bg-[#142135] rounded-md p-5 space-y-2">
                            <p className="font-semibold text-lg border-b pb-2 border-[#343434]">Address</p>
                            <p className="pt-2 text-sm">{data.address}</p>
                            <p className="text-sm">{data.city}, {data.state}, {data.country}</p>
                        </div>

                        {/* Contact */}
                        <div className="bg-[#142135] rounded-md p-5 space-y-2">
                            <p className="font-semibold text-lg border-b pb-2 border-[#343434]">Contact</p>

                            <p className="pt-3 text-sm">
                                <strong>Website:</strong>{" "}
                                <a href={data.website} className="text-blue-500" target="_blank">
                                    {data.website}
                                </a>
                            </p>

                            <p className="text-sm"><strong>Email:</strong> {data.email}</p>
                            <p className="text-sm"><strong>Phone:</strong> {data.phone}</p>
                        </div>

                        {/* Reviews */}
                        <div className="bg-[#142135] rounded-md p-5">
                            <p className="font-semibold text-lg border-b pb-2 border-[#343434]">Reviews</p>
                            <ul className="list-disc ml-5 text-gray-300 flex flex-col gap-y-3 text-sm mt-4">
                                {data.reviews?.map((r, index) => (
                                    <li key={index}>{r}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Social Links */}
                        <div className="bg-[#142135] rounded-md p-5 space-y-3">
                            <p className="font-semibold text-lg">Social Links</p>

                            <div className="flex gap-3 flex-wrap">
                                <a href={data.socialLinks?.facebook} target="_blank"
                                    className="border border-blue-500 p-2 rounded hover:bg-blue-500 transition">
                                    <Facebook size={20} />
                                </a>
                                <a href={data.socialLinks?.instagram} target="_blank"
                                    className="border border-pink-500 p-2 rounded hover:bg-pink-500 transition">
                                    <Instagram size={20} />
                                </a>
                                <a href={data.socialLinks?.linkedin} target="_blank"
                                    className="border border-blue-600 p-2 rounded hover:bg-blue-600 transition">
                                    <Linkedin size={20} />
                                </a>
                                <a href={data.socialLinks?.twitter} target="_blank"
                                    className="border border-blue-400 p-2 rounded hover:bg-blue-400 transition">
                                    <Twitter size={20} />
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </section>
    );
};

export default SingleCompanydetails;
