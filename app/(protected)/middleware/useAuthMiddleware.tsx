'use client';
import { useEffect, useState, createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const useAuthMiddleware = () => {
    const router = useRouter();
    const [user, setUser] = useState(null); // Move the useState hook call outside of the useEffect callback

    useEffect(() => {
        const token = Cookies.get('token');

        if (!token) {
            router.push('/login');
            return;
        }

        // Validasi token dengan server
        const validateToken = async () => {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_FETCH}/validate-token`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status !== 200) {
                localStorage.removeItem('token');
                router.push('/login');
            }

            const { data: user } = await response.json();
            setUser(user);
        };

        validateToken();
    }, [router]);

    return user;
};

export default useAuthMiddleware;

// 'use client';

// import React, { createContext, useState, useEffect, useContext } from 'react';

// const UserContext = createContext({
//     user: null,
//     setUser: (user: any) => {},
// });

// export const useUserAuth = (): any => {
//     return useContext(UserContext);
// };

// export const UserProvider = ({ children }: any) => {
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         const token = localStorage.getItem('token');

//         if (token) {
//             const validateToken = async () => {
//                 const response = await fetch(
//                     `${process.env.NEXT_PUBLIC_API_FETCH}/validate-token`,
//                     {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json',
//                             Authorization: `Bearer ${token}`,
//                         },
//                     }
//                 );

//                 if (response.status === 200) {
//                     const { data: user } = await response.json();
//                     setUser(user);
//                 } else {
//                     localStorage.removeItem('token');
//                 }
//             };

//             validateToken();
//         }
//     }, []);

//     return (
//         <UserContext.Provider value={{ user, setUser } }>
//             {children}
//         </UserContext.Provider>
//     );
// };
