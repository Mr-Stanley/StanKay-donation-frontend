import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

const Dropdown = ({ title, links, isMobile }) => {
    const [open, setOpen] = useState(false);

    const toggle = () => setOpen(!open);
    const openDropdown = () => setOpen(true);
    const closeDropdown = () => setOpen(false);

    return (
        <div
            className="relative"
            onMouseEnter={!isMobile ? openDropdown : undefined}
            onMouseLeave={!isMobile ? closeDropdown : undefined}
        >
            <button
                onClick={isMobile ? toggle : undefined}
                className="flex items-center justify-between w-full gap-1 hover:text-yellow-400"
            >
                {title}
                <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                        open ? "rotate-180" : ""
                    }`}
                />
            </button>
            {open && (
                <div
                    className={`${
                        isMobile
                            ? "pl-4 mt-2 space-y-1"
                            : "absolute top-full left-0 bg-white text-black rounded shadow-lg mt-2 w-48 z-10"
                    }`}
                >
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            to={link.href}
                            className={`block px-4 py-2 text-sm ${
                                isMobile ? "hover:text-yellow-400" : "hover:bg-gray-100"
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};


const Header = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

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
        <header className="bg-black text-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between p-4">
                {/* Logo */}
                <div className="font-bold text-lg">Stan-K</div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-6 items-center">
                    {navItems.map((item, idx) =>
                        item.links ? (
                            <Dropdown key={idx} title={item.title} links={item.links} />
                        ) : (
                            <Link
                                key={idx}
                                to={item.href}
                                className="hover:text-yellow-400"
                            >
                                {item.title}
                            </Link>
                        )
                    )}
                    <Link
                        to="/LoginPage"
                        className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition"
                    >
                        LOGIN
                    </Link>
                </nav>

                {/* Mobile Toggle Button */}
                <div className="md:hidden">
                    <button onClick={() => setMobileOpen(!mobileOpen)}>
                        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden px-4 py-4 bg-black space-y-4">
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
                                className="block hover:text-yellow-400"
                            >
                                {item.title}
                            </Link>
                        )
                    )}
                    <Link
                        to="/LoginPage"
                        className="block w-full bg-yellow-400 text-black text-center py-2 rounded hover:bg-yellow-500 transition"
                    >
                        LOGIN
                    </Link>
                </div>
            )}
        </header>
    );
};

export default Header;