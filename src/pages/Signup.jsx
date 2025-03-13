// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { base_url } from '../utils/base_url';

// const Signup = () => {
//     const navigate = useNavigate();
//     const [phoneNo, setPhoneNo] = useState('');
//     const [email, setEmail] = useState('');
//     const [otp, setOtp] = useState('');
//     const [showOtp, setShowOtp] = useState(false);
//     const [isGoogleScriptLoaded, setIsGoogleScriptLoaded] = useState(false);


//     // Image arrays for carousel
//     const images1 = [
//         'https://avatars.mds.yandex.net/get-vertis-journal/4220003/DSC02013.JPG_1739263425314/1428x1428',
//         'https://avatars.mds.yandex.net/get-verba/216201/2a0000018e98b10886372eeff1e30b738e75/realty_large_1242',
//         'https://avatars.mds.yandex.net/get-verba/1672712/2a0000019353719d01da0a727ab4edacdc14/realty_large_1242'
//     ];
//     const images2 = [
//         'https://avatars.mds.yandex.net/get-verba/1672712/2a0000019353719d01da0a727ab4edacdc14/realty_large_1242',
//         'https://avatars.mds.yandex.net/get-verba/1540742/2a000001938ce76f87578a9a7f0caa9e70e6/realty_special_photo_3840',
//         'https://avatars.mds.yandex.net/get-vertis-journal/4465444/orig.webp_1739273748206/1098x1098'
//     ];
//     const images3 = [
//         'https://avatars.mds.yandex.net/get-vertis-journal/4220003/DSC02013.JPG_1739263425314/1428x1428',
//         'https://avatars.mds.yandex.net/get-vertis-journal/4465444/orig.webp_1739273748206/1098x1098',
//         'https://avatars.mds.yandex.net/get-verba/216201/2a0000018e98b10886372eeff1e30b738e75/realty_large_1242'
//     ];
//     const images4 = [
//         'https://avatars.mds.yandex.net/get-verba/1672712/2a0000019353719d01da0a727ab4edacdc14/realty_large_1242',
//         'https://avatars.mds.yandex.net/get-vertis-journal/4465444/orig.webp_1739273748206/1098x1098',
//         'https://avatars.mds.yandex.net/get-verba/1540742/2a000001938ce76f87578a9a7f0caa9e70e6/realty_special_photo_3840'
//     ];

//     // Animation variants
//     const containerVariants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: {
//                 duration: 0.5,
//                 staggerChildren: 0.1
//             }
//         }
//     };

//     const itemVariants = {
//         hidden: { y: 20, opacity: 0 },
//         visible: {
//             y: 0,
//             opacity: 1,
//             transition: { type: "spring", stiffness: 100 }
//         }
//     };

//     const carouselVariants = {
//         hidden: { opacity: 0, x: -50 },
//         visible: {
//             opacity: 1,
//             x: 0,
//             transition: {
//                 type: "spring",
//                 stiffness: 100,
//                 damping: 20,
//                 staggerChildren: 0.2
//             }
//         }
//     };


//         const avatars = [
//             "https://avatar.iran.liara.run/public/17",
//             "https://avatar.iran.liara.run/public/19",
//             "https://avatar.iran.liara.run/public/94",
//             "https://avatar.iran.liara.run/public/21",
//             "https://avatar.iran.liara.run/public/34",
//             "https://avatar.iran.liara.run/public/20",
//         ];

//         // Load Google OAuth Script
//         useEffect(() => {
//             const loadGoogleScript = () => {
//                 const script = document.createElement('script');
//                 script.src = 'https://accounts.google.com/gsi/client';
//                 script.onload = () => setIsGoogleScriptLoaded(true);
//                 document.body.appendChild(script);
//             };
//             loadGoogleScript();
//         }, []);

//         // Initialize Google OAuth
//         useEffect(() => {
//             if (isGoogleScriptLoaded) {
//                 window.google.accounts.id.initialize({
//                     client_id: 'YOUR_GOOGLE_CLIENT_ID', // Replace with your Google Client ID
//                     callback: handleGoogleResponse
//                 });
//                 window.google.accounts.id.renderButton(
//                     document.getElementById('googleSignInDiv'),
//                     { theme: 'outline', size: 'large', width: '100%' }
//                 );
//             }
//         }, [isGoogleScriptLoaded]);

//         const handleGoogleResponse = async (response) => {
//             try {
//                 // Decode the JWT token to get user information
//                 const base64Url = response.credential.split('.')[1];
//                 const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//                 const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
//                     return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//                 }).join(''));
//                 const { email: googleEmail } = JSON.parse(jsonPayload);

//                 // Set email from Google
//                 setEmail(googleEmail);

//                 // Check if we have a phone number associated with this email
//                 const response = await fetch(`${base_url}/api/get-user-phone`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({ email: googleEmail }),
//                 });
//                 const data = await response.json();

//                 if (data?.phone) {
//                     setPhoneNo(data.phone);
//                     // If we have both email and phone, automatically trigger OTP
//                     handleSignup(null, true);
//                 }
//             } catch (error) {
//                 console.error('Error processing Google sign-in:', error);
//             }
//         };

//         // const handleSignup = async (e) => {
//         //     e.preventDefault();
//         //     try {
//         //         const response = await fetch(`${base_url}/api/send-otp`, {
//         //             method: 'POST',
//         //             headers: {
//         //                 'Content-Type': 'application/json',
//         //             },
//         //             body: JSON.stringify({ phoneNumber: phoneNo }),
//         //         });
//         //         const data = await response.json();
//         //         if (data?.success === "true") {
//         //             setShowOtp(true);
//         //         }
//         //     } catch (error) {
//         //         console.error('Error sending OTP:', error);
//         //     }
//         // };

//         const handleSignup = async (e, isAutomatic = false) => {
//             if (!isAutomatic && e) {
//                 e.preventDefault();
//             }

//             if (!phoneNo || !email) {
//                 alert('Please fill in both phone number and email');
//                 return;
//             }

//             try {
//                 const response = await fetch(`${base_url}/api/send-otp`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({ phoneNumber: phoneNo }),
//                 });
//                 const data = await response.json();
//                 if (data?.success === "true") {
//                     setShowOtp(true);
//                 }
//             } catch (error) {
//                 console.error('Error sending OTP:', error);
//             }
//         };

//         const handleVerifyOtp = async (e) => {
//             e.preventDefault();
//             try {
//                 const response = await fetch(`${base_url}/api/verify-otp`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         phoneNumber: phoneNo,
//                         email: email,
//                         otp: otp
//                     }),
//                 });
//                 const data = await response.json();
//                 if (data?.status_code == '200' && data?.data?.token) {
//                     localStorage.setItem("profo-auth-token", data?.data?.token)
//                     navigate('/')
//                 } else {
//                     alert(data?.msg)
//                 }
//                 console.log(data);
//             } catch (error) {
//                 console.error('Error verifying OTP:', error);
//             }
//         };

//         useEffect(() => {
//             const carousels = document.querySelectorAll('.carousel');

//             carousels.forEach((carousel, index) => {
//                 const isEven = index % 2 === 0;
//                 carousel.style.animation = `scroll${isEven ? 'Down' : 'Up'} 15s linear infinite`;
//             });
//         }, []);
//         // Your existing useEffect and handler functions...

//         useEffect(() => {
//             const carousels = document.querySelectorAll('.carousel-container');

//             const startAnimation = (element, direction) => {
//                 element.style.animation = 'none';
//                 element.offsetHeight; // Trigger reflow
//                 element.style.animation = `scroll${direction} 15s linear infinite`;
//             };

//             carousels.forEach((carousel, index) => {
//                 const direction = index % 2 === 0 ? 'Down' : 'Up';
//                 startAnimation(carousel, direction);

//                 // Reset animation when it reaches the end
//                 carousel.addEventListener('animationend', () => {
//                     startAnimation(carousel, direction);
//                 });
//             });

//             return () => {
//                 carousels.forEach(carousel => {
//                     carousel.style.animation = 'none';
//                 });
//             };
//         }, []);

//         return (
//             <motion.div
//                 initial="hidden"
//                 animate="visible"
//                 variants={containerVariants}
//                 className="flex h-screen w-full overflow-hidden bg-gradient-to-r from-gray-50 via-white to-white"
//             >
//                 {/* Left Section - Animated Image Carousels */}
//                 <motion.div
//                     variants={carouselVariants}
//                     className="min-w-[52vw] relative flex-1 flex gap-1 bg-gradient-to-b from-gray-50 via-white to-gray-50"
//                 >
//                     {[images1, images2, images3, images4].map((images, index) => (
//                         <motion.div
//                             key={index}
//                             variants={itemVariants}
//                             className="relative flex-1 overflow-hidden"
//                             style={{ height: '100%' }}
//                             whileHover={{ scale: 1.02 }}
//                             transition={{ type: "spring", stiffness: 300 }}
//                         >
//                             <div className="carousel-container absolute w-full" style={{ willChange: 'transform' }}>
//                                 {/* Duplicate the images array three times for smooth infinite scroll */}
//                                 {[...images, ...images, ...images, ...images].map((src, imgIndex) => (
//                                     <motion.div
//                                         key={imgIndex}
//                                         className="w-full h-auto bg-black aspect-square rounded-lg overflow-hidden mb-1"
//                                         whileHover={{ scale: 1.05 }}
//                                         transition={{ type: "spring", stiffness: 300 }}
//                                     >
//                                         <img
//                                             src={src}
//                                             alt={`carousel-${index}-${imgIndex}`}
//                                             className="w-full h-full object-cover"
//                                             loading="lazy"
//                                         />
//                                     </motion.div>
//                                 ))}
//                             </div>
//                         </motion.div>
//                     ))}

//                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-white/80" />
//                     <div className="absolute right-0 inset-y-0 w-1/3 bg-gradient-to-r from-transparent to-white" />
//                 </motion.div>
//                 {/* Right Section - Enhanced Animated Form */}
//                 <motion.div
//                     variants={itemVariants}
//                     className="relative text-center flex-1 flex items-center justify-center p-12 bg-white"
//                 >
//                     <motion.div
//                         variants={containerVariants}
//                         className="w-full max-w-md"
//                     >
//                         <motion.div
//                             variants={itemVariants}
//                             className="mb-8"
//                         >
//                             <motion.div
//                                 className="flex items-center gap-2 mb-2"
//                                 whileHover={{ scale: 1 }}
//                             >
//                                 <motion.span
//                                     className="text-[#F9464C] text-7xl flex justify-center font-bold w-full"
//                                     initial={{ opacity: 0, y: 20 }}
//                                     animate={{ opacity: 1, y: 0 }}
//                                     transition={{ duration: 0.5, delay: 0.2 }}
//                                 >
//                                     {/* PROFO */}
//                                     <div className='bg-red text-center'>
//                                         <img src='assets/output-onlinegiftool.gif' alt="PROFO" className='w-auto h-20' />
//                                         {/* <img src='assets/profo-black-2.gif' alt="PROFO" className='w-auto h-16' /> */}
//                                     </div>
//                                     {/* <div className='bg-yellow-500'>
//                                     <img src='assets/profo-black.gif' alt="PROFO" className='w-auto h-28' />
//                                 </div> */}
//                                 </motion.span>
//                             </motion.div>
//                             <motion.h1
//                                 className="text-4xl font-bold mb-2"
//                                 variants={itemVariants}
//                             >
//                                 join the <span className="text-[#F9464C]">waitlist</span>
//                             </motion.h1>
//                             <motion.p
//                                 className="text-gray-600"
//                                 variants={itemVariants}
//                             >
//                                 skip the queue and get access to your personal shopper
//                             </motion.p>
//                         </motion.div>

//                         <motion.form
//                             className="space-y-4 mb-8"
//                             variants={containerVariants}
//                         >
//                             <motion.div
//                                 variants={itemVariants}
//                                 className="relative"
//                             >
//                                 <motion.input
//                                     whileFocus={{ scale: 1.02 }}
//                                     type="tel"
//                                     value={phoneNo}
//                                     onChange={(e) => setPhoneNo(e.target.value)}
//                                     placeholder="phone number"
//                                     className="w-full p-4 pr-12 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
//                                 />
//                             </motion.div>

//                             <motion.div
//                                 variants={itemVariants}
//                                 className="relative"
//                             >
//                                 <motion.input
//                                     whileFocus={{ scale: 1.02 }}
//                                     type="email"
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                     placeholder="email"
//                                     className="w-full p-4 pr-12 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
//                                 />
//                             </motion.div>

//                             {showOtp && (
//                                 <motion.div
//                                     variants={itemVariants}
//                                     initial="hidden"
//                                     animate="visible"
//                                     className="relative"
//                                 >
//                                     <motion.input
//                                         whileFocus={{ scale: 1.02 }}
//                                         type="number"
//                                         value={otp}
//                                         onChange={(e) => setOtp(e.target.value)}
//                                         placeholder="enter OTP"
//                                         className="w-full p-4 pr-12 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
//                                     />
//                                 </motion.div>
//                             )}

//                             <motion.button
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 onClick={showOtp ? handleVerifyOtp : handleSignup}
//                                 className="w-full p-4 rounded-full bg-transparent text-black border-2  hover:bg-[crimson] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
//                             >
//                                 {showOtp ? 'Verify OTP' : 'Send OTP'}
//                             </motion.button>

//                             {/* Google Sign In Button */}
//                             <motion.div variants={itemVariants} className="relative mb-4">
//                                 <div id="googleSignInDiv"></div>
//                             </motion.div>
//                         </motion.form>

//                         <motion.div
//                             variants={itemVariants}
//                             className="flex items-center gap-2"
//                         >
//                             <span className="text-gray-600">join</span>
//                             <motion.span
//                                 className="font-semibold"
//                                 whileHover={{ scale: 1.1 }}
//                             >
//                                 24895+
//                             </motion.span>
//                             <span className="text-gray-600">members who are already in the waitlist</span>
//                         </motion.div>

//                         {/* <motion.div
//                         variants={containerVariants}
//                         className="flex -space-x-2 mt-4"
//                     >
//                         {[1, 2, 3, 4,5].map((_, i) => (
//                             <motion.div
//                                 key={i}
//                                 variants={itemVariants}
//                                 whileHover={{ scale: 1.2, zIndex: 1 }}
//                                 className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"
//                             />
//                         ))}
//                     </motion.div> */}
//                         <div className="flex -space-x-4">
//                             {avatars.map((avatar, i) => (
//                                 <motion.div
//                                     key={i}
//                                     variants={itemVariants}
//                                     whileHover="hover"
//                                     className="w-8 h-8 rounded-full border-2 border-white overflow-hidden"
//                                 >
//                                     <img
//                                         src={avatar}
//                                         alt={`Avatar ${i + 1}`}
//                                         className="w-full h-full object-cover"
//                                     />
//                                 </motion.div>
//                             ))}
//                         </div>
//                     </motion.div>
//                 </motion.div>

//                 <style jsx>{`
//                 @keyframes scrollDown {
//                     0% { transform: translateY(0); }
//                     100% { transform: translateY(-33.33%); }
//                 }
                
//                 @keyframes scrollUp {
//                     0% { transform: translateY(-33.33%); }
//                     100% { transform: translateY(0); }
//                 }
//             `}</style>
//             </motion.div>
//         );
//     };

//     export default Signup;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { base_url } from '../utils/base_url';

const Signup = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [otp, setOtp] = useState('');
    const [isGoogleScriptLoaded, setIsGoogleScriptLoaded] = useState(false);
    const [socialId, setSocialId] = useState('');
    const [loginType, setLoginType] = useState('');

    // Image arrays for carousel
    const images1 = [
        'https://avatars.mds.yandex.net/get-vertis-journal/4220003/DSC02013.JPG_1739263425314/1428x1428',
        'https://avatars.mds.yandex.net/get-verba/216201/2a0000018e98b10886372eeff1e30b738e75/realty_large_1242',
        'https://avatars.mds.yandex.net/get-verba/1672712/2a0000019353719d01da0a727ab4edacdc14/realty_large_1242'
    ];
    const images2 = [
        'https://avatars.mds.yandex.net/get-verba/1672712/2a0000019353719d01da0a727ab4edacdc14/realty_large_1242',
        'https://avatars.mds.yandex.net/get-verba/1540742/2a000001938ce76f87578a9a7f0caa9e70e6/realty_special_photo_3840',
        'https://avatars.mds.yandex.net/get-vertis-journal/4465444/orig.webp_1739273748206/1098x1098'
    ];
    const images3 = [
        'https://avatars.mds.yandex.net/get-vertis-journal/4220003/DSC02013.JPG_1739263425314/1428x1428',
        'https://avatars.mds.yandex.net/get-vertis-journal/4465444/orig.webp_1739273748206/1098x1098',
        'https://avatars.mds.yandex.net/get-verba/216201/2a0000018e98b10886372eeff1e30b738e75/realty_large_1242'
    ];
    const images4 = [
        'https://avatars.mds.yandex.net/get-verba/1672712/2a0000019353719d01da0a727ab4edacdc14/realty_large_1242',
        'https://avatars.mds.yandex.net/get-vertis-journal/4465444/orig.webp_1739273748206/1098x1098',
        'https://avatars.mds.yandex.net/get-verba/1540742/2a000001938ce76f87578a9a7f0caa9e70e6/realty_special_photo_3840'
    ];

    const avatars = [
        "https://avatar.iran.liara.run/public/17",
        "https://avatar.iran.liara.run/public/19",
        "https://avatar.iran.liara.run/public/94",
        "https://avatar.iran.liara.run/public/21",
        "https://avatar.iran.liara.run/public/34",
        "https://avatar.iran.liara.run/public/20",
    ];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100 }
        }
    };

    const carouselVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
                staggerChildren: 0.2
            }
        }
    };

    const pageTransition = {
        initial: { x: 20, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: -20, opacity: 0 },
        transition: { type: "spring", stiffness: 300, damping: 30 }
    };

    // Load Google OAuth Script
    useEffect(() => {
        const loadGoogleScript = () => {
            const script = document.createElement('script');
            script.src = 'https://accounts.google.com/gsi/client';
            script.onload = () => setIsGoogleScriptLoaded(true);
            document.body.appendChild(script);
        };
        loadGoogleScript();
    }, []);

    // Initialize Google OAuth
    useEffect(() => {
        if (isGoogleScriptLoaded) {
            window.google.accounts.id.initialize({
                client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID, // Replace with your Google Client ID
                callback: handleGoogleResponse
            });
            window.google.accounts.id.renderButton(
                document.getElementById('googleSignInDiv'),
                { theme: 'outline', size: 'large', width: '100%' }
            );
        }
    }, [isGoogleScriptLoaded]);

    const handleGoogleResponse = async (response) => {
        try {
            // Decode the JWT token to get user information
            const base64Url = response.credential.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            const { email: googleEmail, name: googleName, sub: googleId } = JSON.parse(jsonPayload);

            // Set email and name from Google
            setEmail(googleEmail);
            setName(googleName);
            setSocialId(googleId);
            setLoginType('GOOGLE');

            // Save user details from Google
            await saveUserDetails(googleName, googleEmail, googleId, 'GOOGLE');
        } catch (error) {
            console.error('Error processing Google sign-in:', error);
        }
    };

    const saveUserDetails = async (userName, userEmail, userSocialId, userLoginType) => {
        try {
            const response = await fetch(`${base_url}/api/users/saveUserDetails`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: userName || name,
                    email: userEmail || email,
                    socialId: userSocialId || socialId,
                    loginType: userLoginType || loginType || 'EMAIL'
                }),
            });
            const data = await response.json();

            if (data?.status_code === '200') {
                // Move to step 2 after successful save
                setCurrentStep(2);

                // If user already has a verified phone, we could potentially move to step 3 directly
                if (data?.REAL_ESTATE_APP?.phone && !data?.REAL_ESTATE_APP?.requires_phone) {
                    setPhoneNo(data.REAL_ESTATE_APP.phone);
                }
            } else {
                alert(data?.msg || 'Failed to save user details');
            }
        } catch (error) {
            console.error('Error saving user details:', error);
            alert('Failed to save user details');
        }
    };

    const handleSaveDetails = async (e) => {
        e.preventDefault();

        if (!name || !email) {
            alert('Please fill in both name and email');
            return;
        }

        await saveUserDetails(name, email, socialId, loginType);
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();

        if (!phoneNo) {
            alert('Please enter your phone number');
            return;
        }

        try {
            const response = await fetch(`${base_url}/api/send-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber: phoneNo }),
            });
            const data = await response.json();

            if (data?.status_code === '200' || data?.success === 'true') {
                setCurrentStep(3);
            } else {
                alert(data?.msg || 'Failed to send OTP');
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
            alert('Failed to send OTP');
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();

        if (!otp) {
            alert('Please enter the OTP');
            return;
        }

        try {
            const response = await fetch(`${base_url}/api/verify-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phoneNumber: phoneNo,
                    email: email,
                    otp: otp
                }),
            });
            const data = await response.json();

            if (data?.status_code === '200' && data?.data?.token) {
                localStorage.setItem("profo-auth-token", data?.data?.token);
                navigate('/');
            } else {
                alert(data?.msg || 'Failed to verify OTP');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            alert('Failed to verify OTP');
        }
    };

    useEffect(() => {
        const carousels = document.querySelectorAll('.carousel-container');

        const startAnimation = (element, direction) => {
            element.style.animation = 'none';
            element.offsetHeight; // Trigger reflow
            element.style.animation = `scroll${direction} 15s linear infinite`;
        };

        carousels.forEach((carousel, index) => {
            const direction = index % 2 === 0 ? 'Down' : 'Up';
            startAnimation(carousel, direction);

            // Reset animation when it reaches the end
            carousel.addEventListener('animationend', () => {
                startAnimation(carousel, direction);
            });
        });

        return () => {
            carousels.forEach(carousel => {
                carousel.style.animation = 'none';
            });
        };
    }, []);

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <motion.div
                        key="step1"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={pageTransition}
                    >
                        <motion.form className="space-y-4 mb-8" variants={containerVariants}>
                            <motion.div variants={itemVariants} className="relative">
                                <motion.input
                                    whileFocus={{ scale: 1.02 }}
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="full name"
                                    className="w-full p-4 pr-12 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                            </motion.div>

                            <motion.div variants={itemVariants} className="relative">
                                <motion.input
                                    whileFocus={{ scale: 1.02 }}
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="email"
                                    className="w-full p-4 pr-12 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                            </motion.div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleSaveDetails}
                                className="w-full p-4 rounded-full bg-transparent text-black border-2 hover:bg-[crimson] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                                Save Details
                            </motion.button>

                            {/* Google Sign In Button */}
                            <motion.div variants={itemVariants} className="relative mb-4">
                                <div id="googleSignInDiv"></div>
                            </motion.div>
                        </motion.form>
                    </motion.div>
                );

            case 2:
                return (
                    <motion.div
                        key="step2"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={pageTransition}
                    >
                        <motion.div variants={itemVariants} className="mb-4 text-center">
                            <h3 className="text-xl font-semibold text-gray-800">Add your phone number</h3>
                            <p className="text-gray-600">We'll send you a verification code</p>
                        </motion.div>

                        <motion.form className="space-y-4 mb-8" variants={containerVariants}>
                            <motion.div variants={itemVariants} className="relative">
                                <motion.input
                                    whileFocus={{ scale: 1.02 }}
                                    type="tel"
                                    value={phoneNo}
                                    onChange={(e) => setPhoneNo(e.target.value)}
                                    placeholder="phone number"
                                    className="w-full p-4 pr-12 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                            </motion.div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleSendOtp}
                                className="w-full p-4 rounded-full bg-transparent text-black border-2 hover:bg-[crimson] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                                Send OTP
                            </motion.button>
                        </motion.form>
                    </motion.div>
                );

            case 3:
                return (
                    <motion.div
                        key="step3"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={pageTransition}
                    >
                        <motion.div variants={itemVariants} className="mb-4 text-center">
                            <h3 className="text-xl font-semibold text-gray-800">Verify your phone</h3>
                            <p className="text-gray-600">Enter the code sent to {phoneNo}</p>
                        </motion.div>

                        <motion.form className="space-y-4 mb-8" variants={containerVariants}>
                            <motion.div variants={itemVariants} className="relative">
                                <motion.input
                                    whileFocus={{ scale: 1.02 }}
                                    type="number"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="enter OTP"
                                    className="w-full p-4 pr-12 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                            </motion.div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleVerifyOtp}
                                className="w-full p-4 rounded-full bg-transparent text-black border-2 hover:bg-[crimson] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                                Verify OTP
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setCurrentStep(2);
                                }}
                                className="w-full text-center text-gray-600 hover:text-gray-800 text-sm"
                            >
                                Didn't receive the code? Send again
                            </motion.button>
                        </motion.form>
                    </motion.div>
                );

            default:
                return null;
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex h-screen w-full overflow-hidden bg-gradient-to-r from-gray-50 via-white to-white"
        >
            {/* Left Section - Animated Image Carousels */}
            <motion.div
                variants={carouselVariants}
                className="min-w-[52vw] relative flex-1 flex gap-1 bg-gradient-to-b from-gray-50 via-white to-gray-50"
            >
                {[images1, images2, images3, images4].map((images, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        className="relative flex-1 overflow-hidden"
                        style={{ height: '100%' }}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <div className="carousel-container absolute w-full" style={{ willChange: 'transform' }}>
                            {/* Duplicate the images array three times for smooth infinite scroll */}
                            {[...images, ...images, ...images, ...images].map((src, imgIndex) => (
                                <motion.div
                                    key={imgIndex}
                                    className="w-full h-auto bg-black aspect-square rounded-lg overflow-hidden mb-1"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <img
                                        src={src}
                                        alt={`carousel-${index}-${imgIndex}`}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ))}

                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-white/80" />
                <div className="absolute right-0 inset-y-0 w-1/3 bg-gradient-to-r from-transparent to-white" />
            </motion.div>

            {/* Right Section - Enhanced Animated Form */}
            <motion.div
                variants={itemVariants}
                className="relative text-center flex-1 flex items-center justify-center p-12 bg-white"
            >
                <motion.div
                    variants={containerVariants}
                    className="w-full max-w-md"
                >
                    <motion.div
                        variants={itemVariants}
                        className="mb-8"
                    >
                        <motion.div
                            className="flex items-center gap-2 mb-2"
                            whileHover={{ scale: 1 }}
                        >
                            <motion.span
                                className="text-[#F9464C] text-7xl flex justify-center font-bold w-full"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <div className='bg-red text-center'>
                                    <img src='assets/output-onlinegiftool.gif' alt="PROFO" className='w-auto h-20' />
                                </div>
                            </motion.span>
                        </motion.div>
                        <motion.h1
                            className="text-4xl font-bold mb-2"
                            variants={itemVariants}
                        >
                            join the <span className="text-[#F9464C]">waitlist</span>
                        </motion.h1>
                        <motion.p
                            className="text-gray-600"
                            variants={itemVariants}
                        >
                            skip the queue and get access to your personal shopper
                        </motion.p>
                    </motion.div>

                    {/* Step Indicator */}
                    <motion.div
                        variants={itemVariants}
                        className="flex justify-center mb-6 space-x-2"
                    >
                        {[1, 2, 3].map((step) => (
                            <motion.div
                                key={step}
                                className={`h-2 rounded-full ${currentStep === step ? 'bg-[#F9464C] w-8' : 'bg-gray-300 w-4'
                                    }`}
                                initial={false}
                                animate={{
                                    backgroundColor: currentStep === step ? '#F9464C' : '#D1D5DB',
                                    width: currentStep === step ? 32 : 16
                                }}
                                transition={{ duration: 0.3 }}
                            />
                        ))}
                    </motion.div>

                    {/* Dynamic Step Content */}
                    <AnimatePresence mode="wait">
                        {renderStepContent()}
                    </AnimatePresence>

                    <motion.div
                        variants={itemVariants}
                        className="flex items-center gap-2"
                    >
                        <span className="text-gray-600">join</span>
                        <motion.span
                            className="font-semibold"
                            whileHover={{ scale: 1.1 }}
                        >
                            24895+
                        </motion.span>
                        <span className="text-gray-600">members who are already in the waitlist</span>
                    </motion.div>

                    <div className="flex -space-x-4 mt-4">
                        {avatars.map((avatar, i) => (
                            <motion.div
                                key={i}
                                variants={itemVariants}
                                whileHover={{ scale: 1.2, zIndex: 5 }}
                                className="w-8 h-8 rounded-full border-2 border-white overflow-hidden"
                            >
                                <img
                                    src={avatar}
                                    alt={`Avatar ${i + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>

            <style jsx>{`
                @keyframes scrollDown {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(-33.33%); }
                }
                
                @keyframes scrollUp {
                    0% { transform: translateY(-33.33%); }
                    100% { transform: translateY(0); }
                }
            `}</style>
        </motion.div>
    );
};

export default Signup;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { UserCheck, Mail, Phone, Lock } from 'lucide-react';
// import { base_url } from '../utils/base_url';

// const Signup = () => {
//     const navigate = useNavigate();
//     const [phoneNo, setPhoneNo] = useState('');
//     const [email, setEmail] = useState('');
//     const [otp, setOtp] = useState('');
//     const [showOtp, setShowOtp] = useState(false);
//     const [isGoogleScriptLoaded, setIsGoogleScriptLoaded] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState('');

//     // Animation variants
//     const containerVariants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: { duration: 0.5, staggerChildren: 0.1 }
//         }
//     };

//     const itemVariants = {
//         hidden: { y: 20, opacity: 0 },
//         visible: {
//             y: 0,
//             opacity: 1,
//             transition: { type: "spring", stiffness: 100 }
//         }
//     };

//     // Load Google OAuth Script
//     useEffect(() => {
//         const loadGoogleScript = () => {
//             const script = document.createElement('script');
//             script.src = 'https://accounts.google.com/gsi/client';
//             script.onload = () => setIsGoogleScriptLoaded(true);
//             document.body.appendChild(script);
//         };
//         loadGoogleScript();
//     }, []);

//     // Initialize Google OAuth
//     useEffect(() => {
//         if (isGoogleScriptLoaded) {
//             window.google.accounts.id.initialize({
//                 client_id: import.meta.env.VITE_GOOGLE_API_KEY,
//                 callback: handleGoogleResponse
//             });
//             window.google.accounts.id.renderButton(
//                 document.getElementById('googleSignInDiv'),
//                 { theme: 'outline', size: 'large', width: '100%' }
//             );
//         }
//     }, [isGoogleScriptLoaded]);

//     const handleGoogleResponse = async (response) => {
//         try {
//             setIsLoading(true);
//             setError('');

//             // Decode JWT token
//             const base64Url = response.credential.split('.')[1];
//             const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//             const jsonPayload = decodeURIComponent(atob(base64).split('').map(c =>
//                 '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
//             ).join(''));

//             const { email: googleEmail, name } = JSON.parse(jsonPayload);
//             setEmail(googleEmail);

//             // Save Google user details
//             const saveResponse = await fetch(`${base_url}/api/users/saveUserDetails`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     email: googleEmail,
//                     name,
//                     socialId: response.credential,
//                     loginType: 'GOOGLE'
//                 })
//             });

//             const data = await saveResponse.json();

//             if (data.success === 'true') {
//                 if (data.REAL_ESTATE_APP.requires_phone) {
//                     // Need phone verification
//                     setShowOtp(false);
//                 } else {
//                     // Already verified, proceed to dashboard
//                     localStorage.setItem("profo-auth-token", data.REAL_ESTATE_APP.token);
//                     navigate('/');
//                 }
//             } else {
//                 setError(data.msg || 'Failed to process Google sign-in');
//             }
//         } catch (error) {
//             setError('Error processing Google sign-in');
//             console.error('Google sign-in error:', error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleSendOtp = async (e) => {
//         e?.preventDefault();

//         if (!phoneNo || !/^\d{10}$/.test(phoneNo)) {
//             setError('Please enter a valid 10-digit phone number');
//             return;
//         }

//         try {
//             setIsLoading(true);
//             setError('');

//             const response = await fetch(`${base_url}/api/send-otp`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ phoneNumber: phoneNo })
//             });

//             const data = await response.json();

//             if (data.success === 'true') {
//                 setShowOtp(true);
//             } else {
//                 setError(data.msg || 'Failed to send OTP');
//             }
//         } catch (error) {
//             setError('Error sending OTP');
//             console.error('OTP send error:', error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleVerifyOtp = async (e) => {
//         e.preventDefault();

//         if (!otp || !/^\d{6}$/.test(otp)) {
//             setError('Please enter a valid 6-digit OTP');
//             return;
//         }

//         try {
//             setIsLoading(true);
//             setError('');

//             const response = await fetch(`${base_url}/api/verify-otp`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     phoneNumber: phoneNo,
//                     email,
//                     otp
//                 })
//             });

//             const data = await response.json();

//             if (data.status_code === '200' && data.data?.token) {
//                 localStorage.setItem("profo-auth-token", data.data.token);
//                 navigate('/');
//             } else {
//                 setError(data.msg || 'Failed to verify OTP');
//             }
//         } catch (error) {
//             setError('Error verifying OTP');
//             console.error('OTP verification error:', error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <motion.div
//             initial="hidden"
//             animate="visible"
//             variants={containerVariants}
//             className="min-h-screen bg-gradient-to-r from-gray-50 to-white flex items-center justify-center p-4"
//         >
//             <motion.div
//                 variants={itemVariants}
//                 className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
//             >
//                 <motion.div variants={itemVariants} className="text-center mb-8">
//                     <h1 className="text-3xl font-bold mb-2">Welcome to <span className="text-red-500">PROFO</span></h1>
//                     <p className="text-gray-600">Join our community of property seekers</p>
//                 </motion.div>

//                 {error && (
//                     <motion.div
//                         variants={itemVariants}
//                         className="bg-red-50 text-red-600 p-4 rounded-lg mb-4"
//                     >
//                         {error}
//                     </motion.div>
//                 )}

//                 <motion.form variants={containerVariants} className="space-y-4">
//                     <motion.div variants={itemVariants} className="relative">
//                         <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
//                         <input
//                             type="tel"
//                             value={phoneNo}
//                             onChange={(e) => setPhoneNo(e.target.value)}
//                             placeholder="Phone Number"
//                             className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border focus:outline-none focus:ring-2 focus:ring-red-500"
//                             disabled={isLoading}
//                         />
//                     </motion.div>

//                     <motion.div variants={itemVariants} className="relative">
//                         <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
//                         <input
//                             type="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             placeholder="Email Address"
//                             className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border focus:outline-none focus:ring-2 focus:ring-red-500"
//                             disabled={isLoading}
//                         />
//                     </motion.div>

//                     {showOtp && (
//                         <motion.div
//                             variants={itemVariants}
//                             initial="hidden"
//                             animate="visible"
//                             className="relative"
//                         >
//                             <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
//                             <input
//                                 type="number"
//                                 value={otp}
//                                 onChange={(e) => setOtp(e.target.value)}
//                                 placeholder="Enter OTP"
//                                 className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border focus:outline-none focus:ring-2 focus:ring-red-500"
//                                 disabled={isLoading}
//                             />
//                         </motion.div>
//                     )}

//                     <motion.button
//                         variants={itemVariants}
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         onClick={showOtp ? handleVerifyOtp : handleSendOtp}
//                         className="w-full py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
//                         disabled={isLoading}
//                     >
//                         {isLoading ? 'Processing...' : (showOtp ? 'Verify OTP' : 'Send OTP')}
//                     </motion.button>

//                     <motion.div variants={itemVariants} className="relative">
//                         <div className="absolute inset-0 flex items-center">
//                             <div className="w-full border-t border-gray-200" />
//                         </div>
//                         <div className="relative flex justify-center text-sm">
//                             <span className="px-2 bg-white text-gray-500">Or continue with</span>
//                         </div>
//                     </motion.div>

//                     <motion.div variants={itemVariants} className="relative">
//                         <div id="googleSignInDiv" className="w-full" />
//                     </motion.div>
//                 </motion.form>

//                 <motion.p
//                     variants={itemVariants}
//                     className="mt-6 text-center text-sm text-gray-600"
//                 >
//                     By signing up, you agree to our Terms of Service and Privacy Policy
//                 </motion.p>
//             </motion.div>
//         </motion.div>
//     );
// };

// export default Signup;