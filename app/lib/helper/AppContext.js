'use client'

import { createContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie';



const AppContext = createContext()

export const ContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState()
    const [deliveries, setDeliveries] = useState()
    const [error, setError] = useState(null);

    const route = useRouter();

    const isSecured = protocol => protocol === 'https:'

    const loginUser = async (formData) => {

        const email = formData.email
        const password = formData.password

        if (!email || !password)
            toast.error('All fields are required!', { duration: 3000 })

        try {
            setLoading(true)
            const response = await fetch(`/api/login`, {
                cache: 'no-cache',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })

            if (response.ok) {
                const responseData = await response.json()
                console.log(responseData);
                if (responseData.success) {
                    const access_expires = new Date()
                    access_expires.setTime(access_expires.getTime() + 30 * 60 * 1000) // expires access token in 30 mins

                    const refresh_expires = new Date()
                    refresh_expires.setTime(
                        refresh_expires.getTime() + 24 * 60 * 60 * 1000
                    ) // expires refresh token in 24 hours

                    // Usage in a browser environment
                    const currentProtocol = window.location.protocol
                    const secured = isSecured(currentProtocol)

                    Cookies.set('access-token', responseData.data.access, {
                        expires: access_expires,
                        secure: secured
                    })
                    Cookies.set('refresh-token', responseData.data.refresh, {
                        expires: refresh_expires,
                        secure: secured
                    })

                    toast.success('Login successful!', { duration: 4000 })

                    // route.push('/home')
                } else {
                    toast.error(responseData.detail, { duration: 4000 })
                    // await handleAccessTokenError(responseData.error)
                }
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
            toast.error('Something went wrong, please try again', { duration: 4000 })
        } finally {
            setLoading(false)
        }
    }

    const registerAccount = async (data) => {
        try {
            setLoading(true);

            const response = await fetch(`/api/register`, {
                cache: "no-cache",
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: data.username,
                    email: data.email,
                    password: data.password,
                }),
            });

            if (response.ok) {
                const responseData = await response.json();
                if (responseData.id) {
                    setEmail(responseData.email);
                    toast.success("Account Created Successfully!", { duration: 4000 });
                    route.push("/account-verification");
                } else {
                    // Toast error messages from API response
                    Object.keys(responseData).forEach((field) => {
                        responseData[field].forEach((errorMessage) => {
                            toast.error(errorMessage, { duration: 4000 });
                        });
                    });
                }
            } else {
                // If response status is not ok, handle the error
                toast.error("Failed to create account, please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Something went wrong, please try again");
        } finally {
            setLoading(false);
        }
    };

    const ActivateAccount = async (data) => {
        try {
            setLoading(true);

            const response = await fetch(`/api/activateAccount`, {
                cache: "no-cache",
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    uid: data.uid,
                    token: data.token,
                }),
            });

            if (response.ok) {
                const responseData = await response.json();
                if (!responseData.token) {
                    toast.success('Account verified successfully', { duration: 5000 })
                    route.push("/login");
                } else {
                    toast.error(responseData.token, { duration: 5000 })
                }
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Something went wrong, please try again");
        } finally {
            setLoading(false);
        }
    };

    const passwordResetRequest = async (data) => {
        try {
            setLoading(true);

            const response = await fetch(`/api/password-reset-request`, {
                cache: "no-cache",
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: data.email,
                }),
            });

            if (response.ok) {
                toast.success('Password reset link sent successfully', { duration: 5000 })
                route.push('/login')
            }
        } catch (error) {
            console.error("Error:", error);
            // toast.error("Something went wrong, please try again");
        } finally {
            setLoading(false);
        }
    };

    const passwordResetConfirmation = async (data) => {
        if (!data.uid || !data.token) {
            toast.error('Invalid password reset link', { duration: 5000 })
        }
        try {
            setLoading(true);

            const response = await fetch(`/api/password-reset-confirmation`, {
                cache: "no-cache",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    uid: data.uid,
                    token: data.token,
                    new_password: data.password1,
                }),
            });

            if (response.ok) {
                const responseData = await response.json();
                if (responseData.token || responseData.new_password) {
                    responseData.token && toast.error(responseData.token, { duration: 5000 })
                    responseData.new_password && toast.error(responseData.new_password, { duration: 5000 })
                } else {
                    toast.success('Password reset successfully', { duration: 5000 })
                    route.push('/login')
                }

            }
        } catch (error) {
            console.error("Error:", error);
            toast.success('Password reset successfully', { duration: 5000 })
            route.push('/login')
            // toast.error("Something went wrong, please try again");

        } finally {
            setLoading(false);
        }
    };

    // ========================================================
    const contextData = {
        loading,
        loginUser,
        email,
        registerAccount,
        ActivateAccount,
        passwordResetRequest,
        passwordResetConfirmation
    }

    return (
        <AppContext.Provider value={contextData}>
            {children}
        </AppContext.Provider>
    )

}

export default AppContext