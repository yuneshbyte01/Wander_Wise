// layouts/AdminLayout.jsx
import React from 'react';
import AdminNavbar from '../components/AdminNavbar';
import Footer from '../components/Footer';

const AdminLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <AdminNavbar />
            <main className="flex-grow pt-16">{children}</main>
            <Footer />
        </div>
    );
};

export default AdminLayout;
