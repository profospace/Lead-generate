import React, { useRef, useState } from 'react';
import { FaAngleDown } from "react-icons/fa6";
import { toast } from 'react-hot-toast';
import { Coins, Home, Upload } from 'lucide-react';
import { base_url } from '../utils/base_url';

const autoFillVariants = {
    'Luxury Apartment': {
        propertyType: {
            intent: 'sell',
            category: 'residential',
            subType: 'flat',
        },
        contactDetails: {
            phone: '9876543210',
            email: 'luxury@example.com',
            name: 'John Doe',
        },
        propertyDetails: {
            location: 'Palm Heights, Marine Drive',
            expectedPrice: '15000000',
            propertySize: '2500',
            unit: 'sqft',
            bedrooms: '4',
            bathrooms: '3',
            furnishing: 'furnished',
            availability: 'immediate',
        },
        additionalDetails: {
            description: 'Luxury apartment with sea view',
            amenities: ['Parking', 'Security', 'Lift', 'Swimming Pool', 'Gym'],
        },
    },
    'Commercial Office': {
        propertyType: {
            intent: 'rent',
            category: 'commercial',
            subType: 'office',
        },
        contactDetails: {
            phone: '9876543211',
            email: 'office@example.com',
            name: 'Jane Smith',
        },
        propertyDetails: {
            location: 'Business District, Tech Park',
            expectedPrice: '150000',
            propertySize: '1500',
            unit: 'sqft',
            bedrooms: '',
            bathrooms: '2',
            furnishing: 'semi-furnished',
            availability: 'immediate',
        },
        additionalDetails: {
            description: 'Modern office space in prime location',
            amenities: ['Parking', 'Security', 'Lift', 'Power Backup'],
        },
    },
    'Residential Plot': {
        propertyType: {
            intent: 'sell',
            category: 'residential',
            subType: 'plot',
        },
        contactDetails: {
            phone: '9876543212',
            email: 'plot@example.com',
            name: 'Robert Wilson',
        },
        propertyDetails: {
            location: 'Green Valley, Suburb Area',
            expectedPrice: '5000000',
            propertySize: '2000',
            unit: 'sqft',
            bedrooms: '',
            bathrooms: '',
            furnishing: 'unfurnished',
            availability: 'immediate',
        },
        additionalDetails: {
            description: 'Corner plot in gated community',
            amenities: ['Security', 'Garden'],
        },
    },
};

const PostProperty = () => {
    const formSectionRef = useRef(null);
    const howtoPostSectionRef = useRef(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
                
                {/* <div className='flex items-center'>
                    <img src='/assets/logo.png' className='w-16 h-16' />
                    <h1 className="text-5xl font-bold text-[#F9464C] tracking-tighter">PROFO</h1>
                </div> */}

                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
                    {/* Left Section */}
                    {/* <div className="relative w-full lg:w-[60%]">
                        <div className="mb-8">
                            <h1 className="text-2xl md:text-4xl font-bold text-navy-900">
                                Sell or Rent your Property
                            </h1>
                            <h2 className="text-2xl md:text-4xl font-bold mb-6">
                                <span className="text-blue-500">online faster</span> with PROFO.com
                            </h2>

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

                        <div className="absolute bottom-28 w-full h-full">
                            <img
                                src="assets/post_property_animation.gif"
                                alt="Property posting illustration"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div> */}

                    {/* Right Section - Form */}
                    {/* <div className="w-full lg:w-[40%]"> */}
                    <div className="w-full">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold mb-2">Start posting your property, it's free</h2>
                            <div className="relative">
                                <button
                                    type="button"
                                    className="px-4 py-2 text-sm bg-gray-100 rounded-md flex items-center gap-2"
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                >
                                    Auto-fill <FaAngleDown className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                                        {Object.keys(autoFillVariants).map((variant) => (
                                            <button
                                                key={variant}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                onClick={() => {
                                                    setFormData(autoFillVariants[variant]);
                                                    setIsDropdownOpen(false);
                                                    toast.success(`Auto-filled with ${variant} template`);
                                                }}
                                            >
                                                {variant}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
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