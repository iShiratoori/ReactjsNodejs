import { useState } from 'react'
import Sidebar from '../utils/Sidebar'
import Navbar from '../utils/Navbar'

const DashboardLayouts = ({ children, sidebarLinks }) => {
    const [showSidebar, setShowSidebar] = useState(true)

    return (
        <>
            <Sidebar
                showSidebar={showSidebar}
                sidebarLinks={sidebarLinks}
            />
            <section id='content'>
                <div className="px-3">
                    <div className="flex">
                        <div className='py-5'>
                            <i className='bi bi-list toggle-sidebar dark:text-white' onClick={() => setShowSidebar(!showSidebar)}></i>
                        </div>
                        <div className="w-full text-center mb-3 ms-3">
                            <Navbar />
                        </div>
                    </div>

                    <main>
                        {children}
                    </main>
                </div>
            </section>
        </>
    )
}

export default DashboardLayouts
