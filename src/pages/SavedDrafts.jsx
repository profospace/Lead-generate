import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaEdit, FaClock, FaMapMarkerAlt, FaRupeeSign, FaHome, FaArrowLeft, FaFilter, FaSearch, FaSort } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const SavedDrafts = () => {
    const navigate = useNavigate();
    const [drafts, setDrafts] = useState([]);
    const [filteredDrafts, setFilteredDrafts] = useState([]);
    const [expandedDraftId, setExpandedDraftId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterByType, setFilterByType] = useState('all');
    const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest', 'price-high', 'price-low'
    const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

    useEffect(() => {
        // Load drafts from localStorage on component mount
        const loadedDrafts = JSON.parse(localStorage.getItem('propertyDrafts')) || [];
        setDrafts(loadedDrafts);
    }, []);

    useEffect(() => {
        // Apply filters and sorting whenever drafts, searchTerm, filterByType or sortBy changes
        let result = [...drafts];

        // Apply search filter
        if (searchTerm) {
            result = result.filter(draft =>
                (draft.data.propertyDetails.location &&
                    draft.data.propertyDetails.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (draft.data.contactDetails.name &&
                    draft.data.contactDetails.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (draft.data.additionalDetails.description &&
                    draft.data.additionalDetails.description.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        // Apply type filter
        if (filterByType !== 'all') {
            if (filterByType === 'residential' || filterByType === 'commercial') {
                result = result.filter(draft => draft.data.propertyType.category === filterByType);
            } else {
                result = result.filter(draft => draft.data.propertyType.intent === filterByType);
            }
        }

        // Apply sorting
        switch (sortBy) {
            case 'newest':
                result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'oldest':
                result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            case 'price-high':
                result.sort((a, b) =>
                    Number(b.data.propertyDetails.expectedPrice || 0) -
                    Number(a.data.propertyDetails.expectedPrice || 0)
                );
                break;
            case 'price-low':
                result.sort((a, b) =>
                    Number(a.data.propertyDetails.expectedPrice || 0) -
                    Number(b.data.propertyDetails.expectedPrice || 0)
                );
                break;
            default:
                break;
        }

        setFilteredDrafts(result);
    }, [drafts, searchTerm, filterByType, sortBy]);

    const deleteDraft = (id, event) => {
        event.stopPropagation();

        if (window.confirm('Are you sure you want to delete this draft?')) {
            const updatedDrafts = drafts.filter(draft => draft.id !== id);
            localStorage.setItem('propertyDrafts', JSON.stringify(updatedDrafts));
            setDrafts(updatedDrafts);
            toast.success('Draft deleted successfully');
        }
    };

    const editDraft = (draft, event) => {
        event.stopPropagation();
        // Store the selected draft in sessionStorage to load it in the form
        sessionStorage.setItem('editingDraft', JSON.stringify(draft));
        navigate('/post-property'); // Navigate to post property page
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const getPropertyTypeText = (propertyType) => {
        let text = propertyType.intent.charAt(0).toUpperCase() + propertyType.intent.slice(1);

        if (propertyType.category) {
            text += ` - ${propertyType.category.charAt(0).toUpperCase() + propertyType.category.slice(1)}`;
        }

        if (propertyType.subType) {
            // Format subType for display
            let subTypeText = propertyType.subType;

            if (subTypeText === 'flat') subTypeText = 'Flat/Apartment';
            else if (subTypeText === 'villa') subTypeText = 'Independent House / Villa';
            else if (subTypeText === 'builder-floor') subTypeText = 'Independent / Builder Floor';
            else if (subTypeText === 'plot') subTypeText = 'Plot / Land';
            else if (subTypeText === 'office') subTypeText = 'Office Space';
            else if (subTypeText === 'shop') subTypeText = 'Shop/Showroom';
            else if (subTypeText === 'commercial-land') subTypeText = 'Commercial Land';

            text += ` - ${subTypeText}`;
        }

        return text;
    };

    const toggleExpandDraft = (id) => {
        if (expandedDraftId === id) {
            setExpandedDraftId(null);
        } else {
            setExpandedDraftId(id);
        }
    };

    const clearAllDrafts = () => {
        if (window.confirm('Are you sure you want to delete all drafts? This action cannot be undone.')) {
            localStorage.removeItem('propertyDrafts');
            setDrafts([]);
            toast.success('All drafts deleted successfully');
        }
    };

    const resumeDraft = (draft) => {
        sessionStorage.setItem('editingDraft', JSON.stringify(draft));
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header with back button */}
                <div className="mb-6 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center text-gray-600 hover:text-gray-900"
                    >
                        <FaArrowLeft className="mr-2" />
                        Back to Post Property
                    </button>

                    <h1 className="text-3xl font-bold text-center text-gray-900">My Saved Property Drafts</h1>

                    <div></div> {/* Empty div for flex spacing */}
                </div>

                <div className="bg-white shadow rounded-lg overflow-hidden">
                    {/* Filters and search section */}
                    <div className="p-4 border-b bg-gray-50">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaSearch className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search by location, name, or description"
                                    className="pl-10 pr-4 py-2 border rounded-md w-full"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="relative">
                                    <button
                                        onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                                        className="px-4 py-2 bg-white border rounded-md flex items-center gap-2"
                                    >
                                        <FaFilter />
                                        Filter
                                    </button>

                                    {isFilterMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10 border p-4">
                                            <h3 className="font-medium mb-2">Property Type</h3>
                                            <div className="space-y-2">
                                                <button
                                                    className={`block w-full text-left px-2 py-1 text-sm rounded ${filterByType === 'all' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'}`}
                                                    onClick={() => setFilterByType('all')}
                                                >
                                                    All Properties
                                                </button>
                                                <button
                                                    className={`block w-full text-left px-2 py-1 text-sm rounded ${filterByType === 'sell' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'}`}
                                                    onClick={() => setFilterByType('sell')}
                                                >
                                                    For Sale
                                                </button>
                                                <button
                                                    className={`block w-full text-left px-2 py-1 text-sm rounded ${filterByType === 'rent' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'}`}
                                                    onClick={() => setFilterByType('rent')}
                                                >
                                                    For Rent
                                                </button>
                                                <button
                                                    className={`block w-full text-left px-2 py-1 text-sm rounded ${filterByType === 'residential' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'}`}
                                                    onClick={() => setFilterByType('residential')}
                                                >
                                                    Residential
                                                </button>
                                                <button
                                                    className={`block w-full text-left px-2 py-1 text-sm rounded ${filterByType === 'commercial' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'}`}
                                                    onClick={() => setFilterByType('commercial')}
                                                >
                                                    Commercial
                                                </button>
                                            </div>

                                            <h3 className="font-medium mt-4 mb-2">Sort By</h3>
                                            <div className="space-y-2">
                                                <button
                                                    className={`block w-full text-left px-2 py-1 text-sm rounded ${sortBy === 'newest' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'}`}
                                                    onClick={() => setSortBy('newest')}
                                                >
                                                    Newest First
                                                </button>
                                                <button
                                                    className={`block w-full text-left px-2 py-1 text-sm rounded ${sortBy === 'oldest' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'}`}
                                                    onClick={() => setSortBy('oldest')}
                                                >
                                                    Oldest First
                                                </button>
                                                <button
                                                    className={`block w-full text-left px-2 py-1 text-sm rounded ${sortBy === 'price-high' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'}`}
                                                    onClick={() => setSortBy('price-high')}
                                                >
                                                    Price: High to Low
                                                </button>
                                                <button
                                                    className={`block w-full text-left px-2 py-1 text-sm rounded ${sortBy === 'price-low' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'}`}
                                                    onClick={() => setSortBy('price-low')}
                                                >
                                                    Price: Low to High
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => navigate('/')}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                                    >
                                        Add New
                                    </button>

                                    {drafts.length > 0 && (
                                        <button
                                            onClick={clearAllDrafts}
                                            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                        >
                                            Clear All
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results count and active filters */}
                    {(searchTerm || filterByType !== 'all') && (
                        <div className="px-6 py-2 bg-blue-50 text-sm flex items-center justify-between">
                            <div>
                                <span className="font-medium">{filteredDrafts.length} result{filteredDrafts.length !== 1 ? 's' : ''}</span>
                                {filterByType !== 'all' && (
                                    <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                                        {filterByType.charAt(0).toUpperCase() + filterByType.slice(1)}
                                        <button
                                            className="ml-1 text-blue-800 hover:text-blue-900"
                                            onClick={() => setFilterByType('all')}
                                        >
                                            ×
                                        </button>
                                    </span>
                                )}
                                {searchTerm && (
                                    <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                                        Search: "{searchTerm}"
                                        <button
                                            className="ml-1 text-blue-800 hover:text-blue-900"
                                            onClick={() => setSearchTerm('')}
                                        >
                                            ×
                                        </button>
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-gray-500">Sort: </span>
                                <select
                                    className="border-none bg-transparent text-blue-700 font-medium cursor-pointer"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="oldest">Oldest First</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="price-low">Price: Low to High</option>
                                </select>
                            </div>
                        </div>
                    )}

                    <div className="divide-y divide-gray-200">
                        {filteredDrafts.length === 0 ? (
                            <div className="text-center py-16">
                                <FaHome className="mx-auto h-16 w-16 text-gray-300" />
                                <h3 className="mt-4 text-xl font-medium text-gray-900">No saved drafts found</h3>
                                <p className="mt-2 text-gray-500">
                                    {drafts.length === 0
                                        ? "You haven't saved any property drafts yet."
                                        : "No drafts match your current filters."}
                                </p>
                                <div className="mt-6">
                                    {drafts.length === 0 ? (
                                        <button
                                            onClick={() => navigate('/')}
                                            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                                        >
                                            Post a Property
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                setSearchTerm('');
                                                setFilterByType('all');
                                            }}
                                            className="px-6 py-3 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors"
                                        >
                                            Clear Filters
                                        </button>
                                    )}
                                </div>
                            </div>
                        ) : (
                            filteredDrafts.map((draft) => (
                                <div
                                    key={draft.id}
                                    className={`p-6 hover:bg-gray-50 transition-colors cursor-pointer ${expandedDraftId === draft.id ? 'bg-gray-50' : ''}`}
                                    onClick={() => toggleExpandDraft(draft.id)}
                                >
                                    <div className="flex flex-col md:flex-row justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center mb-2">
                                                <span className={`mr-2 px-2 py-1 text-xs rounded-full ${draft.data.propertyType.intent === 'sell'
                                                        ? 'bg-purple-100 text-purple-800'
                                                        : draft.data.propertyType.intent === 'rent'
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-blue-100 text-blue-800'
                                                    }`}>
                                                    {draft.data.propertyType.intent === 'sell'
                                                        ? 'For Sale'
                                                        : draft.data.propertyType.intent === 'rent'
                                                            ? 'For Rent'
                                                            : 'PG'}
                                                </span>
                                                <h2 className="text-lg font-semibold text-gray-900">
                                                    {draft.data.propertyType.category === 'residential'
                                                        ? 'Residential '
                                                        : 'Commercial '}
                                                    {draft.data.propertyType.subType && getSubTypeDisplay(draft.data.propertyType.subType)}
                                                </h2>
                                            </div>

                                            <div className="mt-1 flex flex-wrap items-center text-sm text-gray-500 gap-6">
                                                <div className="flex items-center">
                                                    <FaClock className="mr-1 text-gray-400" />
                                                    {formatDate(draft.createdAt)}
                                                </div>

                                                {draft.data.propertyDetails.location && (
                                                    <div className="flex items-center">
                                                        <FaMapMarkerAlt className="mr-1 text-gray-400" />
                                                        {draft.data.propertyDetails.location}
                                                    </div>
                                                )}

                                                {draft.data.propertyDetails.expectedPrice && (
                                                    <div className="flex items-center font-medium text-gray-800">
                                                        <FaRupeeSign className="mr-1 text-gray-400" />
                                                        {Number(draft.data.propertyDetails.expectedPrice).toLocaleString()}
                                                        {draft.data.propertyType.intent === 'rent' && <span className="text-gray-500 ml-1">/month</span>}
                                                    </div>
                                                )}
                                            </div>

                                            {draft.data.propertyDetails.propertySize && (
                                                <div className="mt-2 text-sm text-gray-500">
                                                    Area: {draft.data.propertyDetails.propertySize} {draft.data.propertyDetails.unit}
                                                </div>
                                            )}

                                            {draft.data.additionalDetails.description && (
                                                <div className="mt-2 text-sm text-gray-600 line-clamp-1">
                                                    {draft.data.additionalDetails.description}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex gap-2 mt-4 md:mt-0">
                                            <button
                                                onClick={(e) => editDraft(draft, e)}
                                                className="px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 flex items-center"
                                            >
                                                <FaEdit className="mr-1" /> Edit
                                            </button>
                                            <button
                                                onClick={(e) => deleteDraft(draft.id, e)}
                                                className="px-3 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100 flex items-center"
                                            >
                                                <FaTrash className="mr-1" /> Delete
                                            </button>
                                        </div>
                                    </div>

                                    {expandedDraftId === draft.id && (
                                        <div className="mt-6 bg-white p-6 rounded-md border">
                                            <div className="flex justify-between items-center mb-4">
                                                <h3 className="text-lg font-medium">Property Details</h3>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        resumeDraft(draft);
                                                    }}
                                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                                                >
                                                    Resume Editing
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-4">
                                                    <div>
                                                        <h4 className="text-sm font-medium text-gray-500 mb-1">Property Type</h4>
                                                        <div className="bg-gray-50 p-3 rounded">
                                                            <p><span className="font-medium">Intent:</span> {capitalizeFirstLetter(draft.data.propertyType.intent)}</p>
                                                            <p><span className="font-medium">Category:</span> {capitalizeFirstLetter(draft.data.propertyType.category)}</p>
                                                            <p><span className="font-medium">Sub Type:</span> {getSubTypeDisplay(draft.data.propertyType.subType) || 'Not specified'}</p>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <h4 className="text-sm font-medium text-gray-500 mb-1">Contact Details</h4>
                                                        <div className="bg-gray-50 p-3 rounded">
                                                            <p><span className="font-medium">Name:</span> {draft.data.contactDetails.name || 'Not provided'}</p>
                                                            <p><span className="font-medium">Phone:</span> {draft.data.contactDetails.phone || 'Not provided'}</p>
                                                        </div>
                                                    </div>

                                                    {draft.data.additionalDetails.description && (
                                                        <div>
                                                            <h4 className="text-sm font-medium text-gray-500 mb-1">Description</h4>
                                                            <div className="bg-gray-50 p-3 rounded">
                                                                <p>{draft.data.additionalDetails.description}</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="space-y-4">
                                                    <div>
                                                        <h4 className="text-sm font-medium text-gray-500 mb-1">Property Details</h4>
                                                        <div className="bg-gray-50 p-3 rounded">
                                                            <p><span className="font-medium">Location:</span> {draft.data.propertyDetails.location || 'Not specified'}</p>
                                                            <p><span className="font-medium">Expected Price:</span> ₹{Number(draft.data.propertyDetails.expectedPrice || 0).toLocaleString()}</p>
                                                            <p><span className="font-medium">Property Size:</span> {draft.data.propertyDetails.propertySize} {draft.data.propertyDetails.unit}</p>
                                                            {draft.data.propertyDetails.bedrooms && <p><span className="font-medium">Bedrooms:</span> {draft.data.propertyDetails.bedrooms}</p>}
                                                            {draft.data.propertyDetails.bathrooms && <p><span className="font-medium">Bathrooms:</span> {draft.data.propertyDetails.bathrooms}</p>}
                                                            <p><span className="font-medium">Furnishing:</span> {capitalizeFirstLetter(draft.data.propertyDetails.furnishing)}</p>
                                                            <p><span className="font-medium">Availability:</span> {capitalizeFirstLetter(draft.data.propertyDetails.availability)}</p>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <h4 className="text-sm font-medium text-gray-500 mb-1">Amenities</h4>
                                                        {draft.data.additionalDetails.amenities.length > 0 ? (
                                                            <div className="flex flex-wrap gap-2 mt-1">
                                                                {draft.data.additionalDetails.amenities.map((amenity, index) => (
                                                                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                                                        {amenity}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <p className="text-gray-500 italic">No amenities selected</p>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <h4 className="text-sm font-medium text-gray-500 mb-1">Draft Created</h4>
                                                        <p className="text-gray-600">{formatDate(draft.createdAt)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>

                    {/* Pagination could be added here if needed */}

                    {filteredDrafts.length > 0 && (
                        <div className="border-t px-6 py-4 flex justify-between items-center bg-gray-50">
                            <p className="text-sm text-gray-500">
                                Showing {filteredDrafts.length} of {drafts.length} drafts
                            </p>
                            <button
                                onClick={() => navigate('/')}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                            >
                                Add New Property
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Helper functions
const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const getSubTypeDisplay = (subType) => {
    switch (subType) {
        case 'flat': return 'Flat/Apartment';
        case 'villa': return 'Independent House / Villa';
        case 'builder-floor': return 'Independent / Builder Floor';
        case 'plot': return 'Plot / Land';
        case 'office': return 'Office Space';
        case 'shop': return 'Shop/Showroom';
        case 'commercial-land': return 'Commercial Land';
        default: return subType;
    }
};

export default SavedDrafts;