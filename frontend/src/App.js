import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import AdminLayout from './layouts/AdminLayout';
import UserLayout from './layouts/UserLayout';

import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Recommendations from './pages/Recommendations';
import Destinations from './pages/Destinations';
import Profile from './pages/Profile';
import Wishlist from './pages/Wishlist';
import AdminDashboard from './pages/AdminDashboard';
import NotFoundPage from './pages/NotFoundPage';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <Router>
            <Routes>
                {/* Admin Routes */}
                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute adminOnly={true}>
                            <AdminLayout>
                                <AdminDashboard initialTab="dashboard" />
                            </AdminLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/users"
                    element={
                        <ProtectedRoute adminOnly={true}>
                            <AdminLayout>
                                <AdminDashboard initialTab="users" />
                            </AdminLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/profile"
                    element={
                        <ProtectedRoute adminOnly={true}>
                            <AdminLayout>
                                {/* Replace with your actual admin profile page/component */}
                                <div className="p-8">Admin Profile Page</div>
                            </AdminLayout>
                        </ProtectedRoute>
                    }
                />
                {/* Redirect /admin to /admin/dashboard */}
                <Route
                    path="/admin"
                    element={<Navigate to="/admin/dashboard" replace />}
                />

                {/* Public/User Routes */}
                <Route
                    path="/"
                    element={
                        <UserLayout>
                            <HomePage />
                        </UserLayout>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <UserLayout>
                            <Login />
                        </UserLayout>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <UserLayout>
                            <Register />
                        </UserLayout>
                    }
                />
                <Route
                    path="/destinations"
                    element={
                        <UserLayout>
                            <Destinations />
                        </UserLayout>
                    }
                />

                {/* Protected User Routes */}
                <Route
                    path="/recommendations"
                    element={
                        <ProtectedRoute>
                            <UserLayout>
                                <Recommendations />
                            </UserLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <UserLayout>
                                <Profile />
                            </UserLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/wishlist"
                    element={
                        <ProtectedRoute>
                            <UserLayout>
                                <Wishlist />
                            </UserLayout>
                        </ProtectedRoute>
                    }
                />

                {/* Catch-all Not Found Route */}
                <Route
                    path="*"
                    element={
                        <UserLayout>
                            <NotFoundPage />
                        </UserLayout>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
