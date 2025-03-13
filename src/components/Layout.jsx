import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import LoadingPage from './LoadingPage'
import Navbar from './Navbar'



function Layout() {
    return (

        <>
            {/* <Navbar /> */}
            <Suspense fallback={<LoadingPage />}>
                <Outlet />
                {/* <Footer /> */}
            </Suspense>
        </>

    )
}

export default Layout