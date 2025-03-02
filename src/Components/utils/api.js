import axios from 'axios';
import { decryptData, encryptData } from './encryption';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

// export const apiUtility = {
//     async get(url) {
//         const data = await axios
//             .get(`${baseUrl}${url}`, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Cache-Control': 'no-cache',
//                     'Accept': 'application/json',
//                 },
//                 withCredentials: true,
//             })
//             .then((response) => response.data)
//             .catch((error) => {
//                 console.error('Error during GET request:', error);
//                 throw error;
//             });
//         if (data) {
//             return await decryptData(data)
//         }
//     },
//     async post(url, body) {
//         // console.log('before encryption:', body);
//         const encrypt = await encryptData(body);
//         // console.log('encrypted data:', encrypt);
//         const data = await axios
//             .post(`${baseUrl}${url}`, { payload: encrypt }, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Accept': 'application/json',
//                 },
//                 withCredentials: true,
//             })
//             .then((response) => response.data)
//             .catch((error) => {
//                 console.error('Error during POST request:', error);
//                 throw error;
//             });
//         // console.log('response', data);
//         if (data && data.payload) {
//             const decryptedData = await decryptData(data.payload);
//             // console.log('decrypted data:', decryptedData);
//             return decryptedData;
//         } else {
//             return {
//                 status: false,
//                 message: "Something went wrong. Please try again later."
//             }
//         }
//     },
// };

// export const apiUtility = {

//     async get(url) {
//         try {
//             const response = await fetch(`${baseUrl}` + url, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Cache-Control': 'no-cache', // Disable caching
//                     'Accept': 'application/json',
//                 },
//             });
//             if (!response.ok) {
//                 throw new Error(`GET request failed with status: ${response.status}`);
//                 // return "Unable to get data";
//             }
//             return await response.json();
//         } catch (error) {
//             console.error('Error during GET request:', error);
//             throw error;
//         }
//     },

//     async post(url, body) {
//         try {
//             // console.log('before encryption:', body);
//             const encrypt = await encryptData(body);
//             // console.log('encrypted data:', encrypt);
//             const response = await fetch(`${baseUrl}` + url, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Accept': 'application/json',
//                 },
//                 body: JSON.stringify({ payload: encrypt }),
//             });
//             if (!response.ok) {
//                 return await decryptData(response.json());
//             }
//             return await decryptData(response.json());
//         } catch (error) {
//             console.error('Error during POST request:', error);
//             throw error;
//         }
//     },
// };



// import axios from 'axios';
const api = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
});

// Interceptor to handle 401 and redirect to login
api.interceptors.response.use(
    response => response,
    async error => {
        if (error.response && error.response.status === 401) {
            console.warn("Unauthorized! Redirecting to login...");
            localStorage.clear();
            window.location.href = '/';

        }
        return Promise.reject(error);
    }
);

export const apiUtility = {
    async get(url) {
        try {
            const response = await api.get(url, {
                headers: { 'Cache-Control': 'no-cache' }
            });
            if (response.status === 200 && response.data) {
                if (response.data.payload) {
                    const decryptedData = await decryptData(response.data.payload);
                    return { status: true, data: JSON.parse(decryptedData) };
                }
            } else {
                if (response.data && response.data.payload) {
                    const decryptedData = await decryptData(response.data.payload);
                    return { status: false, data: JSON.parse(decryptedData) };
                }
            }
            return {
                status: false,
                message: "Something went wrong. Please try again later.",
            };

        } catch (error) {
            console.error('Error during GET request:', error);
            return {
                status: false,
                message: "Something went wrong. Please try again later.",
            };
        }
    },

    async post(url, body) {
        try {
            // console.log('before encryption:', body);
            const encrypt = await encryptData(body);
            // console.log('encrypted data:', encrypt);

            // const response = await axios.post(`${baseUrl}${url}`, { payload: encrypt }, {
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Accept': 'application/json',
            //     },
            //     withCredentials: true,
            // });

            const response = await api.post(url, { payload: encrypt },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                }
            );

            // console.log('response', response);
            if (response.status === 200 && response.data) {
                // console.log('response', response.data);
                if (response.data.payload) {
                    const decryptedData = await decryptData(response.data.payload);
                    // console.log('decrypted data:', decryptedData);
                    return { status: true, data: JSON.parse(decryptedData) };
                }
            } else {
                if (response.data && response.data.payload) {
                    const decryptedData = await decryptData(response.data.payload);
                    // console.log('decrypted data in error occu:', decryptedData);
                    return { status: false, data: JSON.parse(decryptedData) };
                }
            }
            return {
                status: false,
                message: "Something went wrong. Please try again later.",
            };
        } catch (error) {
            console.error('Error during POST request:', error);
            return {
                status: false,
                message: "Something went wrong. Please try again later.",
            };
        }
    },
};
export const getUser = async () => {
    const user = await decryptData(localStorage.getItem('user'));
    return JSON.parse(user);
}

export const getUserId = async () => {
    return await decryptData(localStorage.getItem('userId'));
};

export const getShData = async () => {
    try {
        const sh = await decryptData(localStorage.getItem('shareholderId'));
        // // console.log('sh', sh);
        return JSON.parse(sh);
    } catch (error) {
        throw new Error('Error fetching shareholder data:', error);
    }
}