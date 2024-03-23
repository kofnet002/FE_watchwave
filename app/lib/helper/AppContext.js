'use client'

import { createContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie';



const AppContext = createContext()

export const ContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState()
    const [deliveries, setDeliveries] = useState()
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

    // ========================================================
    const contextData = {
        loading,
        loginUser,
        userData,
        setUserData
    }

    return (
        <AppContext.Provider value={contextData}>
            {children}
        </AppContext.Provider>
    )

}

export default AppContext