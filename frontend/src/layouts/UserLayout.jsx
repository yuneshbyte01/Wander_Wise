// src/layouts/UserLayout.jsx
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const UserLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <Navbar />
            <main className="flex-grow pt-16">{children}</main>
            <Footer />
        </div>
    );
};

export default UserLayout;
