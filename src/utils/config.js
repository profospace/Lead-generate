// export const getConfig = () => {
//     const getTokenFromLocalStorage = localStorage.getItem("profo-auth-token")
//         ? localStorage.getItem("profo-auth-token")
//         : "";

//     console.log("getTokenFromLocalStorage", getTokenFromLocalStorage)


//     return {
//         header: {
//             Authorization: `Bearer ${getTokenFromLocalStorage}`,
//             Accept: "application/json",
//         },
//     };
// };

// config/auth.config.js

export const getConfig = () => {
    const getTokenFromLocalStorage = localStorage.getItem("profo-auth-token") || "";

    return {
        headers: {  // Changed from header to headers
            'Authorization': getTokenFromLocalStorage ? `Bearer ${getTokenFromLocalStorage}` : '',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
};

// Helper functions for token management
export const setAuthToken = (token) => {
    if (token) {
        localStorage.setItem("profo-auth-token", token);
    }
};

export const removeAuthToken = () => {
    localStorage.removeItem("profo-auth-token");
};

export const getAuthToken = () => {
    return localStorage.getItem("profo-auth-token");
};