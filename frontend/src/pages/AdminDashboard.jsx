import React, { useEffect, useState } from 'react';
import { Users, MapPin, Trash2, Edit, Loader2, Plus, Eye } from 'lucide-react';
import api from '../config/api';
import Toast from '../components/Toast';

const ROLES = ['USER', 'ADMIN'];

const AdminDashboard = ({ initialTab = 'users' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [users, setUsers] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // User modals
  const [showUserModal, setShowUserModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [userForm, setUserForm] = useState({ name: '', email: '', password: '', role: 'USER' });
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  // Destination modals
  const [showDestModal, setShowDestModal] = useState(false);
  const [editDest, setEditDest] = useState(null);
  const [destForm, setDestForm] = useState({
    name: '',
    place: '',
    averageCost: '',
    bestSeason: '',
    tags: '',
    description: '',
    imageUrl: ''
  });
  const [showDestDetails, setShowDestDetails] = useState(false);
  const [destDetails, setDestDetails] = useState(null);

  useEffect(() => {
    fetchUsers();
    fetchDestinations();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/admin/users');
      setUsers(res.data || []);
    } catch (err) {
      console.error('Error fetching users:', err);
      setToast({ message: 'Failed to fetch users.' });
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchDestinations = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/admin/destinations');
      setDestinations(res.data || []);
    } catch (err) {
      console.error('Error fetching destinations:', err);
      setToast({ message: 'Failed to fetch destinations.' });
      setDestinations([]);
    } finally {
      setLoading(false);
    }
  };

  // User actions
  const openEditUserModal = (user) => {
    setEditUser(user);
    setUserForm({ name: user.name, email: user.email, password: '', role: user.role });
    setShowUserModal(true);
  };

  const handleUserFormChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const handleUserSave = async () => {
    setLoading(true);
    try {
      await api.put(`/api/users/${editUser.id}`, {
        name: userForm.name,
        email: userForm.email,
        password: userForm.password || undefined,
      });
      setToast({ message: 'User details updated.' });
      setShowUserModal(false);
      fetchUsers();
    } catch (err) {
      setToast({ message: 'Failed to update user details.' });
    } finally {
      setLoading(false);
    }
  };

  const handleUserRoleSave = async () => {
    setLoading(true);
    try {
      await api.put(`/api/admin/users/${editUser.id}/role?role=${userForm.role}`);
      setToast({ message: 'User role updated.' });
      setShowUserModal(false);
      fetchUsers();
    } catch (err) {
      setToast({ message: 'Failed to update user role.' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    const user = users.find(u => u.id === id);
    if (user && user.role === 'ADMIN') {
      setToast({ message: 'Cannot delete admin users.' });
      return;
    }
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    setLoading(true);
    try {
      await api.delete(`/api/admin/users/${id}`);
      setToast({ message: 'User deleted.' });
      fetchUsers();
    } catch (err) {
      console.error('Delete user error:', err);
      const errorMessage = err.response?.data || 'Failed to delete user.';
      setToast({ message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleViewUser = async (id) => {
    setLoading(true);
    try {
      const res = await api.get(`/api/admin/users/${id}`);
      setUserDetails(res.data);
      setShowUserDetails(true);
    } catch (err) {
      setToast({ message: 'Failed to fetch user details.' });
    } finally {
      setLoading(false);
    }
  };

  // Destination actions
  const openAddDestModal = () => {
    setEditDest(null);
    setDestForm({
      name: '',
      place: '',
      averageCost: '',
      bestSeason: '',
      tags: '',
      description: '',
      imageUrl: ''
    });
    setShowDestModal(true);
  };

  const openEditDestModal = (dest) => {
    setEditDest(dest);
    setDestForm({
      name: dest.name,
      place: dest.place,
      averageCost: dest.averageCost,
      bestSeason: dest.bestSeason,
      tags: dest.tags,
      description: dest.description,
      imageUrl: dest.imageUrl
    });
    setShowDestModal(true);
  };

  const handleDestFormChange = (e) => {
    setDestForm({ ...destForm, [e.target.name]: e.target.value });
  };

  const handleDestSave = async () => {
    setLoading(true);
    try {
      if (editDest) {
        await api.put(`/api/admin/destinations/${editDest.id}`, destForm);
        setToast({ message: 'Destination updated.' });
      } else {
        await api.post('/api/admin/destinations', destForm);
        setToast({ message: 'Destination added.' });
      }
      setShowDestModal(false);
      fetchDestinations();
    } catch (err) {
      setToast({ message: 'Failed to save destination.' });
    } finally {
      setLoading(false);
    }
  };

  const deleteDestination = async (id) => {
    if (!window.confirm('Are you sure you want to delete this destination?')) return;
    setLoading(true);
    try {
      await api.delete(`/api/admin/destinations/${id}`);
      setToast({ message: 'Destination deleted.' });
      fetchDestinations();
    } catch (err) {
      console.error('Delete destination error:', err);
      const errorMessage = err.response?.data || 'Failed to delete destination.';
      setToast({ message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleViewDestination = async (id) => {
    setLoading(true);
    try {
      const res = await api.get(`/api/destinations/${id}`);
      setDestDetails(res.data);
      setShowDestDetails(true);
    } catch (err) {
      setToast({ message: 'Failed to fetch destination details.' });
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="max-w-7xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-black text-gray-900 mb-10 text-center">Admin Dashboard</h1>

        <div className="flex justify-center space-x-6 mb-12">
          <button
              onClick={() => setActiveTab('users')}
              className={`px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition ${
                  activeTab === 'users'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            <Users className="w-5 h-5" /> Users
          </button>
          <button
              onClick={() => setActiveTab('destinations')}
              className={`px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition ${
                  activeTab === 'destinations'
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            <MapPin className="w-5 h-5" /> Destinations
          </button>
        </div>

        {loading && (
            <div className="text-center my-8">
              <Loader2 className="animate-spin h-6 w-6 text-blue-600 mx-auto" />
            </div>
        )}

        {/* Users Tab */}
        {!loading && activeTab === 'users' && (
            <div className="space-y-6">
              {/* Users Table */}
              <div className="overflow-x-auto shadow rounded-lg">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">ID</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Name</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Email</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Role</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                  {users.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                          No users found.
                        </td>
                      </tr>
                  ) : (
                      users.map((user) => (
                          <tr key={user.id} className="border-t">
                            <td className="px-6 py-4">{user.id}</td>
                            <td className="px-6 py-4">{user.name}</td>
                            <td className="px-6 py-4">{user.email}</td>
                            <td className="px-6 py-4">{user.role}</td>
                            <td className="px-6 py-4 flex gap-2">
                              <button
                                  onClick={() => handleViewUser(user.id)}
                                  className="text-gray-600 hover:text-gray-900"
                                  title="View"
                              >
                                <Eye className="w-5 h-5" />
                              </button>
                              <button
                                  onClick={() => openEditUserModal(user)}
                                  className="text-blue-600 hover:text-blue-800"
                                  title="Edit"
                              >
                                <Edit className="w-5 h-5" />
                              </button>
                              <button
                                  onClick={() => handleDeleteUser(user.id)}
                                  className="text-red-600 hover:text-red-800"
                                  title="Delete"
                                  disabled={user.role === 'ADMIN'}
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </td>
                          </tr>
                      ))
                  )}
                  </tbody>
                </table>
              </div>
            </div>
        )}

        {/* Destinations Tab */}
        {!loading && activeTab === 'destinations' && (
            <div className="space-y-6">
              {/* Add Button */}
              <div className="flex justify-end">
                <button
                    onClick={openAddDestModal}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700"
                >
                  <Plus className="w-5 h-5" /> Add Destination
                </button>
              </div>

              {/* Destinations Table */}
              <div className="overflow-x-auto shadow rounded-lg">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">ID</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Name</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Place</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Cost</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Season</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                  {destinations.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                          No destinations found. Add your first destination!
                        </td>
                      </tr>
                  ) : (
                      destinations.map((dest) => (
                          <tr key={dest.id} className="border-t">
                            <td className="px-6 py-4">{dest.id}</td>
                            <td className="px-6 py-4">{dest.name}</td>
                            <td className="px-6 py-4">{dest.place}</td>
                            <td className="px-6 py-4">${dest.averageCost}</td>
                            <td className="px-6 py-4">{dest.bestSeason}</td>
                            <td className="px-6 py-4 flex gap-2">
                              <button
                                  onClick={() => handleViewDestination(dest.id)}
                                  className="text-gray-600 hover:text-gray-900"
                                  title="View"
                              >
                                <Eye className="w-5 h-5" />
                              </button>
                              <button
                                  onClick={() => openEditDestModal(dest)}
                                  className="text-blue-600 hover:text-blue-800"
                                  title="Edit"
                              >
                                <Edit className="w-5 h-5" />
                              </button>
                              <button
                                  onClick={() => deleteDestination(dest.id)}
                                  className="text-red-600 hover:text-red-800"
                                  title="Delete"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </td>
                          </tr>
                      ))
                  )}
                  </tbody>
                </table>
              </div>
            </div>
        )}

        {/* User Edit Modal */}
        {showUserModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Edit User</h2>
                <div className="mb-4">
                  <label className="block mb-2 font-medium">Name</label>
                  <input
                      className="w-full border rounded px-3 py-2"
                      name="name"
                      value={userForm.name}
                      onChange={handleUserFormChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-medium">Email</label>
                  <input
                      className="w-full border rounded px-3 py-2"
                      name="email"
                      value={userForm.email}
                      onChange={handleUserFormChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-medium">Password (leave blank to keep unchanged)</label>
                  <input
                      className="w-full border rounded px-3 py-2"
                      name="password"
                      type="password"
                      value={userForm.password}
                      onChange={handleUserFormChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-medium">Role</label>
                  <select
                      className="w-full border rounded px-3 py-2"
                      name="role"
                      value={userForm.role}
                      onChange={handleUserFormChange}
                  >
                    {ROLES.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                      onClick={() => setShowUserModal(false)}
                      className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                      onClick={handleUserSave}
                      className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Save Details
                  </button>
                  <button
                      onClick={handleUserRoleSave}
                      className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700"
                  >
                    Save Role
                  </button>
                </div>
              </div>
            </div>
        )}

        {/* User Details Modal */}
        {showUserDetails && userDetails && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">User Details</h2>
                <div className="mb-2"><b>ID:</b> {userDetails.id}</div>
                <div className="mb-2"><b>Name:</b> {userDetails.name}</div>
                <div className="mb-2"><b>Email:</b> {userDetails.email}</div>
                <div className="mb-2"><b>Role:</b> {userDetails.role}</div>
                <div className="flex justify-end mt-4">
                  <button
                      onClick={() => setShowUserDetails(false)}
                      className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
        )}

        {/* Destination Add/Edit Modal */}
        {showDestModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md max-h-screen overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">
                  {editDest ? 'Edit Destination' : 'Add Destination'}
                </h2>
                <div className="mb-4">
                  <label className="block mb-2 font-medium">Name</label>
                  <input
                      className="w-full border rounded px-3 py-2"
                      name="name"
                      value={destForm.name}
                      onChange={handleDestFormChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-medium">Place</label>
                  <input
                      className="w-full border rounded px-3 py-2"
                      name="place"
                      value={destForm.place}
                      onChange={handleDestFormChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-medium">Average Cost</label>
                  <input
                      className="w-full border rounded px-3 py-2"
                      name="averageCost"
                      type="number"
                      value={destForm.averageCost}
                      onChange={handleDestFormChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-medium">Best Season</label>
                  <input
                      className="w-full border rounded px-3 py-2"
                      name="bestSeason"
                      value={destForm.bestSeason}
                      onChange={handleDestFormChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-medium">Tags (comma-separated)</label>
                  <input
                      className="w-full border rounded px-3 py-2"
                      name="tags"
                      value={destForm.tags}
                      onChange={handleDestFormChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-medium">Description</label>
                  <textarea
                      className="w-full border rounded px-3 py-2"
                      name="description"
                      rows="3"
                      value={destForm.description}
                      onChange={handleDestFormChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-medium">Image URL</label>
                  <input
                      className="w-full border rounded px-3 py-2"
                      name="imageUrl"
                      value={destForm.imageUrl}
                      onChange={handleDestFormChange}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                      onClick={() => setShowDestModal(false)}
                      className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                      onClick={handleDestSave}
                      className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
        )}

        {/* Destination Details Modal */}
        {showDestDetails && destDetails && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Destination Details</h2>
                <div className="mb-2"><b>ID:</b> {destDetails.id}</div>
                <div className="mb-2"><b>Name:</b> {destDetails.name}</div>
                <div className="mb-2"><b>Place:</b> {destDetails.place}</div>
                <div className="mb-2"><b>Cost:</b> ${destDetails.averageCost}</div>
                <div className="mb-2"><b>Season:</b> {destDetails.bestSeason}</div>
                <div className="mb-2"><b>Tags:</b> {destDetails.tags}</div>
                <div className="mb-2"><b>Description:</b> {destDetails.description}</div>
                {destDetails.imageUrl && (
                    <div className="mb-2">
                      <b>Image:</b>
                      <img src={destDetails.imageUrl} alt="Destination" className="max-w-sm h-auto mt-2 rounded" />
                    </div>
                )}
                <div className="flex justify-end mt-4">
                  <button
                      onClick={() => setShowDestDetails(false)}
                      className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
        )}

        {/* Toast Notification */}
        {toast && (
            <Toast
                message={toast.message}
                onClose={() => setToast(null)}
            />
        )}
      </div>
  );
};

export default AdminDashboard;