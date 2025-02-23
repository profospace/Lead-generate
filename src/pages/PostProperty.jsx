import React, { useRef, useState } from 'react';
import { FaAngleDown } from "react-icons/fa6";
import { toast } from 'react-hot-toast';
import { Coins, Home, Upload } from 'lucide-react';
import { base_url } from '../utils/base_url';

const PostProperty = () => {
    const formSectionRef = useRef(null);
    const howtoPostSectionRef = useRef(null);

    const [formData, setFormData] = useState({
        propertyType: {
            intent: 'sell',
            category: 'residential',
            subType: '',
        },
        contactDetails: {
            phone: '',
            email: '',
            name: '',
        },
        propertyDetails: {
            location: '',
            expectedPrice: '',
            propertySize: '',
            unit: 'sqft',
            bedrooms: '',
            bathrooms: '',
            furnishing: 'unfurnished',
            availability: 'immediate',
        },
        additionalDetails: {
            description: '',
            amenities: [],
        },
    });

    // const steps = [
    //     {
    //         number: "01",
    //         icon: <img src="data:image/png;base64,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" className="w-12 h-12 text-blue-500" />,
    //         icon: <Home className="w-12 h-12 text-blue-500" />,
    //         title: "Add details of your property",
    //         description: "Begin by telling us the few basic details about your property like your property type, location, No. of rooms etc"
    //     },
    //     {
    //         number: "02",
    //         icon: <img src="data:image/png;base64,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" className="w-12 h-12 text-blue-500" />,
    //         icon: <Upload className="w-12 h-12 text-blue-500" />,
    //         title: "Upload Photos & Videos",
    //         description: "Upload photos and videos of your property either via your desktop device or from your mobile phone"
    //     },
    //     {
    //         number: "03",
    //         icon: <img src="data:image/png;base64,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" className="w-12 h-12 text-blue-500" />,
    //         icon: <Coins className="w-12 h-12 text-blue-500" />,
    //         title: "Add Pricing & Ownership",
    //         description: "Just update your property's ownership details and your expected price and your property is ready for posting"
    //     }
    // ];

    const amenitiesOptions = [
        'Parking', 'Security', 'Lift', 'Power Backup', 'Gas Pipeline',
        'Swimming Pool', 'Gym', 'Club House', 'Kids Play Area', 'Garden'
    ];

    const handleScroll = (ref) => {
        ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${base_url}/property-lead/api/leads`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Failed to submit lead');
            toast.success('Property listed successfully!');
        } catch (error) {
            toast.error('Failed to submit property listing');
            console.error(error);
        }
    };

    return (
        <div ref={formSectionRef} className="min-h-screen">
            {/* First section - image and form */}
            <div className="p-4 md:p-8 lg:p-12 bg-gradient-to-b from-white via-lightblue-200 to-blue-200 rounded-b-3xl relative">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
                    {/* Left Section */}
                    <div className="relative w-full lg:w-[60%]">
                        <div className="mb-8">
                            <h1 className="text-2xl md:text-4xl font-bold text-navy-900">
                                Sell or Rent your Property
                            </h1>
                            <h2 className="text-2xl md:text-4xl font-bold mb-6">
                                <span className="text-blue-500">online faster</span> with PROFO.com
                            </h2>

                            {/* Features List */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-gray-700">Advertise for FREE</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-gray-700">Get unlimited enquiries</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-gray-700">Get shortlisted buyers and tenants *</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-gray-700">Assistance in co-ordinating site visits *</span>
                                </div>
                            </div>
                        </div>

                        {/* Illustration */}
                        <div className="absolute bottom-28 w-full h-full">
                            <img
                                src="assets/post_property_animation.gif"
                                alt="Property posting illustration"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>

                    {/* Right Section - Form */}
                    <div className="w-full lg:w-[40%]">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold mb-2">Start posting your property, it's free</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Intent Selection */}
                                <div>
                                    <p className="text-gray-700 mb-2">You're looking to ...</p>
                                    <div className="flex flex-wrap items-center gap-3">
                                        {['sell', 'rent', 'pg'].map((intent) => (
                                            <button
                                                key={intent}
                                                type="button"
                                                className={`px-4 py-2 text-sm border-[1px] border-blue-200 rounded-full ${formData.propertyType.intent === intent
                                                    ? 'bg-blue-50'
                                                    : 'bg-white hover:bg-gray-50'
                                                    }`}
                                                onClick={() => setFormData({
                                                    ...formData,
                                                    propertyType: { ...formData.propertyType, intent }
                                                })}
                                            >
                                                {intent.charAt(0).toUpperCase() + intent.slice(1)}
                                                {intent === 'rent' && ' / Lease'}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Property Category */}
                                <div>
                                    <p className="text-gray-700 mb-2">And it's a ...</p>
                                    <div className="space-y-3">
                                        <div className="flex gap-4">
                                            {['residential', 'commercial'].map((category) => (
                                                <label key={category} className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="property-type"
                                                        className="mr-2"
                                                        checked={formData.propertyType.category === category}
                                                        onChange={() => setFormData({
                                                            ...formData,
                                                            propertyType: { ...formData.propertyType, category }
                                                        })}
                                                    />
                                                    <span className="capitalize">{category}</span>
                                                </label>
                                            ))}
                                        </div>

                                        {/* Property Sub-Type Selection */}
                                        <div className="flex flex-wrap gap-2">
                                            {formData.propertyType.category === 'residential' ? (
                                                ['flat', 'villa', 'builder-floor', 'plot'].map((subType) => (
                                                    <button
                                                        key={subType}
                                                        type="button"
                                                        className={`px-4 py-2 text-sm rounded-full border ${formData.propertyType.subType === subType
                                                            ? 'border-blue-200 bg-blue-50'
                                                            : 'border-gray-200 hover:bg-gray-50'
                                                            }`}
                                                        onClick={() => setFormData({
                                                            ...formData,
                                                            propertyType: { ...formData.propertyType, subType }
                                                        })}
                                                    >
                                                        {subType === 'flat' && 'Flat/Apartment'}
                                                        {subType === 'villa' && 'Independent House / Villa'}
                                                        {subType === 'builder-floor' && 'Independent / Builder Floor'}
                                                        {subType === 'plot' && 'Plot / Land'}
                                                    </button>
                                                ))
                                            ) : (
                                                ['office', 'shop', 'commercial-land'].map((subType) => (
                                                    <button
                                                        key={subType}
                                                        type="button"
                                                        className={`px-4 py-2 text-sm rounded-full border ${formData.propertyType.subType === subType
                                                            ? 'border-blue-200 bg-blue-50'
                                                            : 'border-gray-200 hover:bg-gray-50'
                                                            }`}
                                                        onClick={() => setFormData({
                                                            ...formData,
                                                            propertyType: { ...formData.propertyType, subType }
                                                        })}
                                                    >
                                                        {subType === 'office' && 'Office Space'}
                                                        {subType === 'shop' && 'Shop/Showroom'}
                                                        {subType === 'commercial-land' && 'Commercial Land'}
                                                    </button>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <p className="font-medium text-gray-700">Amenities</p>
                                    <div className="flex flex-wrap gap-2">
                                        {amenitiesOptions.map((amenity) => (
                                            <button
                                                key={amenity}
                                                type="button"
                                                className={`px-4 py-2 rounded-full text-sm ${formData.additionalDetails.amenities.includes(amenity)
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-gray-100 text-gray-700'
                                                    }`}
                                                onClick={() => {
                                                    const updatedAmenities = formData.additionalDetails.amenities.includes(amenity)
                                                        ? formData.additionalDetails.amenities.filter(a => a !== amenity)
                                                        : [...formData.additionalDetails.amenities, amenity];

                                                    setFormData({
                                                        ...formData,
                                                        additionalDetails: {
                                                            ...formData.additionalDetails,
                                                            amenities: updatedAmenities
                                                        }
                                                    });
                                                }}
                                            >
                                                {amenity}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Location */}
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Property Location"
                                        className="w-full p-2 border rounded-md"
                                        value={formData.propertyDetails.location}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            propertyDetails: {
                                                ...formData.propertyDetails,
                                                location: e.target.value
                                            }
                                        })}
                                        required
                                    />
                                </div>

                                {/* Expected Price */}
                                <div>
                                    <input
                                        type="number"
                                        placeholder="Expected Price"
                                        className="w-full p-2 border rounded-md"
                                        value={formData.propertyDetails.expectedPrice}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            propertyDetails: {
                                                ...formData.propertyDetails,
                                                expectedPrice: e.target.value
                                            }
                                        })}
                                        required
                                    />
                                </div>

                                {/* Property Size with Unit */}
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        placeholder="Property Size"
                                        className="flex-1 p-2 border rounded-md"
                                        value={formData.propertyDetails.propertySize}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            propertyDetails: {
                                                ...formData.propertyDetails,
                                                propertySize: e.target.value
                                            }
                                        })}
                                        required
                                    />
                                    <select
                                        className="w-24 p-2 border rounded-md bg-white"
                                        value={formData.propertyDetails.unit}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            propertyDetails: {
                                                ...formData.propertyDetails,
                                                unit: e.target.value
                                            }
                                        })}
                                    >
                                        <option value="sqft">sq.ft</option>
                                        <option value="sqm">sq.m</option>
                                        <option value="acres">acres</option>
                                    </select>
                                </div>

                                {/* Contact Details */}
                                <div className="space-y-4">
                                    <p className="text-gray-700">Your contact details for the buyer to reach you</p>
                                    <div className="space-y-3">
                                        <input
                                            type="tel"
                                            placeholder="Phone Number"
                                            className="w-full p-2 border rounded-md"
                                            value={formData.contactDetails.phone}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                contactDetails: { ...formData.contactDetails, phone: e.target.value }
                                            })}
                                            required
                                        />
                                        <input
                                            type="email"
                                            placeholder="Email Address"
                                            className="w-full p-2 border rounded-md"
                                            value={formData.contactDetails.email}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                contactDetails: { ...formData.contactDetails, email: e.target.value }
                                            })}
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Full Name"
                                            className="w-full p-2 border rounded-md"
                                            value={formData.contactDetails.name}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                contactDetails: { ...formData.contactDetails, name: e.target.value }
                                            })}
                                            required
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-3 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 transition-colors"
                                >
                                    Start now
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Know more Button */}
                    <div onClick={() => handleScroll(howtoPostSectionRef)} className="absolute -bottom-5 left-[45%] bg-white rounded-full border px-6 flex items-center py-2 gap-2 cursor-pointer">
                        <button type="button">Know More</button>
                        <FaAngleDown />
                    </div>
                </div>
            </div>

            {/* How to Post Section */}
            <div ref={howtoPostSectionRef} className="max-w-6xl mx-auto px-4 py-20">
                <div className="text-center mb-12">
                    <p className="text-gray-500 text-sm mb-2">HOW TO POST</p>
                    <h1 className="text-2xl md:text-4xl font-bold text-navy-900">
                        Post Your Property in
                        <br />
                        3 Simple Steps
                    </h1>
                </div>

                {/* <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col">
                            <div className="space-y-2">
                                <h2 className="text-xl font-semibold">
                                    <span className="text-blue-500">{step.number}. </span>
                                    {step.title}
                                </h2>
                                <p className="text-gray-600 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div> */}
                {/* <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col">
                            <div className=" rounded-lg mb-4">
                                {step.icon}
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-xl font-semibold">
                                    <span className="text-blue-500">{step.number}. </span>
                                    {step.title}
                                </h2>
                                <p className="text-gray-600 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div> */}

                <div className="text-center mt-12">
                    <button
                        type="button"
                        onClick={() => handleScroll(formSectionRef)}
                        className="bg-blue-500 text-white px-8 py-3 rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Begin to Post your Property
                    </button>
                </div>
            </div>

            {/* Additional Benefits section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="space-y-6">
                    {/* Additional Benefits Text */}
                    <p className="text-gray-500 text-sm">ADDITIONAL BENEFITS</p>

                    {/* Main Heading */}
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 leading-tight">
                        Everything PROFO does to sell or<br />
                        rent out your property faster...
                    </h1>

                    {/* Description Paragraphs */}
                    <div className="space-y-6 text-gray-600">
                        <p className="leading-relaxed">
                            Post free property ads on PROFO.com, India's No. 1 property portal, to find genuine buyers and tenants. If you are the owner of a house, flat, apartment, villa, or any other residential property, you can conveniently post property for rent or sale on our digital platform. Also, find your ideal tenants and buyers quickly to lease or sell your land, office space, shop, showroom, or any other commercial real estate. Whether you are a property owner, builder or broker, you can rent or sell property online on PROFO.com with ease.
                        </p>

                        <p className="leading-relaxed">
                            PROFO.com is one of the most trustworthy portals buyers and tenants online for flats, independent houses, offices, shops, showrooms, warehouses, land and factories. What makes PROFO.com unique is our high-quality website traffic and reach to millions of households across India and abroad, who are looking to buy or rent residential or commercial properties across India
                        </p>
                    </div>

                    {/* CTA Button */}
                    <div>
                        <button
                            type="button"
                            onClick={() => handleScroll(formSectionRef)}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-8 py-3 rounded-md transition-colors"
                        >
                            Begin to Post your Property
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostProperty;