import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

const Dropdown = ({ title, links, isMobile }) => {
    const [open, setOpen] = useState(false);
    const [hovering, setHovering] = useState(false);

    const toggle = () => setOpen(!open);
    const openDropdown = () => {
        setOpen(true);
        setHovering(true);
    };
    const closeDropdown = () => {
        setOpen(false);
        setHovering(false);
    };

    return (
        <div
            className="relative"
            onMouseEnter={!isMobile ? openDropdown : undefined}
            onMouseLeave={!isMobile ? closeDropdown : undefined}
        >
            <button
                onClick={isMobile ? toggle : undefined}
                className={`flex items-center justify-between w-full gap-1 transition-all duration-300 ${
                    hovering ? "text-yellow-400" : "text-white hover:text-yellow-400"
                }`}
            >
                <span className="relative">
                    {title}
                    <span 
                        className={`absolute -bottom-1 left-0 h-0.5 bg-yellow-400 transition-all duration-300 ${
                            hovering ? "w-full" : "w-0"
                        }`}
                    />
                </span>
                <ChevronDown
                    className={`w-4 h-4 transition-all duration-200 ${
                        open ? "rotate-180 text-yellow-400" : ""
                    }`}
                />
            </button>
            {open && (
                <div
                    className={`${
                        isMobile
                            ? "pl-4 mt-2 space-y-1 border-l-2 border-yellow-400"
                            : "absolute top-full left-0 bg-gradient-to-b from-gray-900 to-black text-white rounded-lg shadow-xl mt-1 w-48 z-10 border border-gray-700"
                    } transition-all duration-300 origin-top ${
                        open ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
                    }`}
                >
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            to={link.href}
                            className={`block px-4 py-2 text-sm relative overflow-hidden ${
                                isMobile 
                                    ? "hover:text-yellow-400 hover:pl-6 transition-all" 
                                    : "hover:bg-gray-800 hover:text-yellow-400"
                            } transition-all duration-200`}
                        >
                            {link.label}
                            {!isMobile && (
                                <span className="absolute left-0 top-0 h-full w-1 bg-yellow-400 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                            )}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

const Header = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        {
            title: "Home",
            links: [
                { label: "Home Layout 1", href: "/home-1" },
                { label: "Home Layout 2", href: "/home-2" },
                { label: "Home Layout 3", href: "/home-3" },
                { label: "Third Level Menu", href: "/third-level" },
            ],
        },
        { title: "About Us", href: "/about" },
        {
            title: "Causes",
            links: [
                { label: "Causes List", href: "/causes" },
                { label: "Causes Single", href: "/cause-single" },
            ],
        },
        {
            title: "Pages",
            links: [
                { label: "Volunteers", href: "/volunteers" },
                { label: "Become Volunteer", href: "/become-volunteer" },
                { label: "Donation Page", href: "/donation" },
                { label: "FAQ", href: "/faq" },
                { label: "Typography", href: "/typography" },
                { label: "404 Page", href: "/404" },
            ],
        },
        {
            title: "Events",
            links: [
                { label: "Upcoming Events", href: "/events" },
                { label: "Event Details", href: "/event-detail" },
            ],
        },
        {
            title: "Blog",
            links: [
                { label: "Blog Grid", href: "/blog" },
                { label: "Single Post", href: "/blog-post" },
            ],
        },
        { title: "Contact", href: "/contact" },
    ];

    return (
        <header 
            className={`fixed w-full text-white z-50 transition-all duration-300 ${
                scrolled ? "bg-gray-900/95 backdrop-blur-sm shadow-xl" : "bg-black/80 backdrop-blur-sm"
            }`}
        >
            <div className="container mx-auto flex items-center justify-between p-4 relative">
                {/* Logo with animation */}
                <Link 
                    to="/" 
                    className="font-bold text-2xl relative group"
                >
                    <span className="text-white group-hover:text-yellow-400 transition-colors duration-300">
                        Stan-K
                    </span>
                    <span 
                        className="absolute -bottom-1 left-0 h-0.5 bg-yellow-400 transition-all duration-500 group-hover:w-full"
                        style={{ width: scrolled ? '100%' : '0%' }}
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-6 items-center">
                    {navItems.map((item, idx) =>
                        item.links ? (
                            <Dropdown key={idx} title={item.title} links={item.links} />
                        ) : (
                            <Link
                                key={idx}
                                to={item.href}
                                className="relative group hover:text-yellow-400 transition-colors duration-300"
                            >
                                {item.title}
                                <span className="absolute -bottom-1 left-0 h-0.5 bg-yellow-400 transition-all duration-300 w-0 group-hover:w-full" />
                            </Link>
                        )
                    )}
                    <Link
                        to="/LoginPage"
                        className="relative px-6 py-2 rounded-md group overflow-hidden"
                    >
                        <span className="relative z-10 text-black font-medium">
                            LOGIN
                        </span>
                        <span 
                            className="absolute inset-0 bg-yellow-400 group-hover:bg-green-400 transition-all duration-300"
                            style={{ 
                                clipPath: scrolled 
                                    ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' 
                                    : 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
                                transition: 'clip-path 0.5s cubic-bezier(0.77, 0, 0.175, 1)'
                            }}
                        />
                        <span 
                            className="absolute inset-0 bg-green-400 group-hover:bg-yellow-400 transition-all duration-300"
                        />
                    </Link>
                </nav>

                {/* Mobile Toggle Button with animation */}
                <div className="md:hidden">
                    <button 
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="p-2 rounded-full hover:bg-gray-800 transition-all duration-300 relative"
                    >
                        {mobileOpen ? (
                            <X className="w-6 h-6 text-yellow-400" />
                        ) : (
                            <>
                                <Menu className="w-6 h-6" />
                                <span className="absolute top-0 right-0 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-75" />
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu with animated entrance */}
            {mobileOpen && (
                <div 
                    className={`md:hidden px-6 py-4 bg-gradient-to-b from-gray-900 to-black space-y-4 ${
                        mobileOpen ? "animate-fadeIn" : "animate-fadeOut"
                    }`}
                    style={{
                        animation: 'fadeIn 0.3s ease-out forwards'
                    }}
                >
                    {navItems.map((item, index) =>
                        item.links ? (
                            <Dropdown
                                key={index}
                                title={item.title}
                                links={item.links}
                                isMobile={true}
                            />
                        ) : (
                            <Link
                                key={index}
                                to={item.href}
                                className="block py-2 hover:text-yellow-400 transition-colors duration-300 border-b border-gray-800"
                                onClick={() => setMobileOpen(false)}
                            >
                                {item.title}
                            </Link>
                        )
                    )}
                    <Link
                        to="/LoginPage"
                        className="block w-full bg-yellow-400 text-black text-center py-3 rounded-md font-medium hover:bg-green-400 transition-colors duration-300 mt-4"
                        onClick={() => setMobileOpen(false)}
                    >
                        LOGIN
                    </Link>
                </div>
            )}

            {/* Embedded animations */}
            <style dangerouslySetInnerHTML={{
                __html: `
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(-10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .animate-fadeIn {
                        animation: fadeIn 0.3s ease-out forwards;
                    }
                `
            }} />
        </header>
    );
};

export default Header;











// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { Menu, X, ChevronDown } from "lucide-react";

// const Dropdown = ({ title, links, isMobile }) => {
//     const [open, setOpen] = useState(false);

//     const toggle = () => setOpen(!open);
//     const openDropdown = () => setOpen(true);
//     const closeDropdown = () => setOpen(false);

//     return (
//         <div
//             className="relative"
//             onMouseEnter={!isMobile ? openDropdown : undefined}
//             onMouseLeave={!isMobile ? closeDropdown : undefined}
//         >
//             <button
//                 onClick={isMobile ? toggle : undefined}
//                 className="flex items-center justify-between w-full gap-1 hover:text-yellow-400"
//             >
//                 {title}
//                 <ChevronDown
//                     className={`w-4 h-4 transition-transform duration-200 ${
//                         open ? "rotate-180" : ""
//                     }`}
//                 />
//             </button>
//             {open && (
//                 <div
//                     className={`${
//                         isMobile
//                             ? "pl-4 mt-2 space-y-1"
//                             : "absolute top-full left-0 bg-white text-black rounded shadow-lg mt-2 w-48 z-10"
//                     }`}
//                 >
//                     {links.map((link, index) => (
//                         <Link
//                             key={index}
//                             to={link.href}
//                             className={`block px-4 py-2 text-sm ${
//                                 isMobile ? "hover:text-yellow-400" : "hover:bg-gray-100"
//                             }`}
//                         >
//                             {link.label}
//                         </Link>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };


// const Header = () => {
//     const [mobileOpen, setMobileOpen] = useState(false);

//     const navItems = [
//         {
//             title: "Home",
//             links: [
//                 { label: "Home Layout 1", href: "/home-1" },
//                 { label: "Home Layout 2", href: "/home-2" },
//                 { label: "Home Layout 3", href: "/home-3" },
//                 { label: "Third Level Menu", href: "/third-level" },
//             ],
//         },
//         { title: "About Us", href: "/about" },
//         {
//             title: "Causes",
//             links: [
//                 { label: "Causes List", href: "/causes" },
//                 { label: "Causes Single", href: "/cause-single" },
//             ],
//         },
//         {
//             title: "Pages",
//             links: [
//                 { label: "Volunteers", href: "/volunteers" },
//                 { label: "Become Volunteer", href: "/become-volunteer" },
//                 { label: "Donation Page", href: "/donation" },
//                 { label: "FAQ", href: "/faq" },
//                 { label: "Typography", href: "/typography" },
//                 { label: "404 Page", href: "/404" },
//             ],
//         },
//         {
//             title: "Events",
//             links: [
//                 { label: "Upcoming Events", href: "/events" },
//                 { label: "Event Details", href: "/event-detail" },
//             ],
//         },
//         {
//             title: "Blog",
//             links: [
//                 { label: "Blog Grid", href: "/blog" },
//                 { label: "Single Post", href: "/blog-post" },
//             ],
//         },
//         { title: "Contact", href: "/contact" },
//     ];

//     return (
//         <header className="bg-black text-white shadow-md sticky top-0 z-50">
//             <div className="container mx-auto flex items-center justify-between p-4">

//                 <div className="font-bold">Stan-K</div>

//                 {/* Desktop Nav */}
//                 <nav className="hidden md:flex gap-4 items-center">
//                     {navItems.map((item, idx) =>
//                         item.links ? (
//                             <Dropdown key={idx} title={item.title} links={item.links} />
//                         ) : (
//                             <Link
//                                 key={idx}
//                                 to={item.href}
//                                 className="hover:text-green-400"
//                             >
//                                 {item.title}
//                             </Link>
//                         )
//                     )}
//                     <Link
//                         to="/LoginPage"
//                         className="bg-green-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition"
//                     >
//                         LOGIN
//                     </Link>
//                 </nav>

//                 {/* Mobile Toggle Button */}
//                 <div className="md:hidden">
//                     <button onClick={() => setMobileOpen(!mobileOpen)}>
//                         {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//                     </button>
//                 </div>
//             </div>

//             {/* Mobile Menu */}
//             {mobileOpen && (
//                 <div className="md:hidden px-4 py-4 bg-black space-y-4">
//                     {navItems.map((item, index) =>
//                         item.links ? (
//                             <Dropdown
//                                 key={index}
//                                 title={item.title}
//                                 links={item.links}
//                                 isMobile={true}
//                             />
//                         ) : (
//                             <Link
//                                 key={index}
//                                 to={item.href}
//                                 className="block hover:text-green-400"
//                             >
//                                 {item.title}
//                             </Link>
//                         )
//                     )}
//                     <Link
//                         to="/LoginPage"
//                         className="block w-full bg-green-400 text-black text-center py-2 rounded hover:bg-yellow-500 transition"
//                     >
//                         LOGIN
//                     </Link>
//                 </div>
//             )}
//         </header>
//     );
// };

// export default Header;