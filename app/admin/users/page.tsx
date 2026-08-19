'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  UserPlus,
  Shield,
  Search,
  CheckCircle2,
  XCircle,
  Edit2,
  Trash2,
  Phone,
  Mail,
  UserCheck,
  Key,
  ShieldAlert,
  Save,
  X,
  RefreshCw,
  CheckSquare,
  Square,
  UserX,
} from 'lucide-react';
import { UserAccount, UserRole, UserStatus } from '@/lib/types';

export default function UserManagementPage() {
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState<string>('All');
  
  // Bulk selection state
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkProcessing, setBulkProcessing] = useState<boolean>(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<UserAccount | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    phone: '',
    role: 'Service Technician' as UserRole,
    status: 'active' as UserStatus,
  });
  const [formError, setFormError] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/users');
      const data = await res.json();
      if (data.success && data.data) {
        setUsers(data.data);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Toggle single selection
  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Toggle select all filtered
  const toggleSelectAll = () => {
    if (selectedIds.length === filteredUsers.length && filteredUsers.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredUsers.map((u) => u.id));
    }
  };

  // Bulk Actions
  const handleBulkStatus = async (status: UserStatus) => {
    if (selectedIds.length === 0) return;

    try {
      setBulkProcessing(true);
      for (const id of selectedIds) {
        const userObj = users.find((u) => u.id === id);
        if (userObj && userObj.username !== 'Comtech_dev') {
          await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...userObj, status }),
          });
        }
      }
      showToast(`Updated status to "${status}" for selected users`);
      setSelectedIds([]);
      fetchUsers();
    } catch {
      alert('Error updating user statuses');
    } finally {
      setBulkProcessing(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    const targetIds = selectedIds.filter((id) => {
      const u = users.find((item) => item.id === id);
      return u && u.username !== 'Comtech_dev';
    });

    if (targetIds.length === 0) {
      alert('Cannot delete the primary Super Administrator account.');
      return;
    }

    if (!confirm(`CONFIRM: Delete ${targetIds.length} selected staff user(s)?`)) return;

    try {
      setBulkProcessing(true);
      for (const id of targetIds) {
        await fetch(`/api/users?id=${id}`, { method: 'DELETE' });
      }
      showToast(`${targetIds.length} users deleted`);
      setSelectedIds([]);
      fetchUsers();
    } catch {
      alert('Error during bulk delete');
    } finally {
      setBulkProcessing(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingUser(null);
    setFormData({
      username: '',
      name: '',
      email: '',
      phone: '',
      role: 'Service Technician',
      status: 'active',
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user: UserAccount) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formData.username.trim() || !formData.name.trim() || !formData.email.trim()) {
      setFormError('Username, Full Name, and Email are required.');
      return;
    }

    try {
      setIsSaving(true);
      const payload: Partial<UserAccount> = {
        id: editingUser ? editingUser.id : `usr-${Date.now()}`,
        username: formData.username.trim(),
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || '9434197268',
        role: formData.role,
        status: formData.status,
      };

      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        fetchUsers();
        showToast(editingUser ? 'User details updated successfully' : 'New user account created successfully');
      } else {
        setFormError(data.error || 'Failed to save user');
      }
    } catch {
      setFormError('Failed to save user details.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, username: string) => {
    if (username === 'Comtech_dev') {
      alert('Cannot delete the primary Super Administrator account.');
      return;
    }

    if (!confirm(`Are you sure you want to delete user "${username}"?`)) return;

    try {
      const res = await fetch(`/api/users?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        fetchUsers();
        showToast(`User ${username} deleted successfully`);
      } else {
        alert(data.error || 'Failed to delete user');
      }
    } catch {
      alert('Error deleting user');
    }
  };

  const handleToggleStatus = async (user: UserAccount) => {
    if (user.username === 'Comtech_dev') {
      alert('Super Administrator cannot be deactivated.');
      return;
    }

    const nextStatus: UserStatus = user.status === 'active' ? 'inactive' : 'active';
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...user, status: nextStatus }),
      });
      const data = await res.json();
      if (data.success) {
        fetchUsers();
        showToast(`User status set to ${nextStatus}`);
      }
    } catch {
      alert('Error updating status');
    }
  };

  // Filtered Users
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.phone.includes(searchQuery);
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-emerald-600 text-white text-xs font-bold shadow-2xl flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-2 border" style={{ background: 'rgba(123,27,90,0.15)', color: '#E9A51A', borderColor: 'rgba(233,165,26,0.30)' }}>
            <Users className="w-3.5 h-3.5" />
            <span>Staff &amp; Access Control</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
            User Management Portal
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage administrator accounts, lab technicians, and sales representatives for Comtech Suri operations.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-bold text-xs shadow-lg transition-all cursor-pointer hover:opacity-95"
          style={{ background: 'linear-gradient(135deg, #7B1B5A 0%, #a82479 100%)', boxShadow: '0 4px 16px rgba(123,27,90,0.35)' }}
        >
          <UserPlus className="w-4 h-4" />
          <span>Add New User / Staff</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Accounts</span>
          <span className="text-2xl font-black text-white font-mono">{users.length}</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Super Admins</span>
          <span className="text-2xl font-black text-[#E9A51A] font-mono">
            {users.filter((u) => u.role === 'Super Admin').length}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Lab Technicians</span>
          <span className="text-2xl font-black text-pink-400 font-mono">
            {users.filter((u) => u.role === 'Service Technician').length}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Active Status</span>
          <span className="text-2xl font-black text-emerald-400 font-mono">
            {users.filter((u) => u.status === 'active').length}
          </span>
        </div>
      </div>

      {/* Bulk Action Sticky Bar */}
      {selectedIds.length > 0 && (
        <div className="p-3.5 rounded-2xl bg-[#1f0516] border border-[#E9A51A]/40 shadow-2xl flex flex-wrap items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-xl bg-[#E9A51A] text-slate-950 font-black text-xs font-mono">
              {selectedIds.length} Staff Selected
            </span>
            <span className="text-xs text-slate-300 font-semibold hidden sm:inline">
              Bulk User Actions:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleBulkStatus('active')}
              disabled={bulkProcessing}
              className="px-3 py-1.5 rounded-xl bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Mark Active</span>
            </button>

            <button
              onClick={() => handleBulkStatus('inactive')}
              disabled={bulkProcessing}
              className="px-3 py-1.5 rounded-xl bg-amber-600/20 text-amber-300 border border-amber-500/30 hover:bg-amber-600/30 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <UserX className="w-3.5 h-3.5" />
              <span>Mark Inactive</span>
            </button>

            <button
              onClick={handleBulkDelete}
              disabled={bulkProcessing}
              className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Bulk Delete</span>
            </button>

            <button
              onClick={() => setSelectedIds([])}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Clear selection"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by name, username, email, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#7B1B5A]"
          />
        </div>

        {/* Role Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['All', 'Super Admin', 'Service Technician', 'Sales Manager', 'Support Executive'].map((role) => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                roleFilter === role
                  ? 'bg-[#7B1B5A] text-white font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* User Table */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-800/60 text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4 w-10 text-center">
                  <button
                    onClick={toggleSelectAll}
                    className="cursor-pointer text-slate-400 hover:text-white"
                    title="Select / Deselect All"
                  >
                    {selectedIds.length === filteredUsers.length && filteredUsers.length > 0 ? (
                      <CheckSquare className="w-4 h-4 text-[#E9A51A]" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="p-4">User Details</th>
                <th className="p-4">Role &amp; Permissions</th>
                <th className="p-4">Contact Info</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-[#7B1B5A]" />
                    <span>Loading users database...</span>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    No users found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const isSuperAdmin = user.username === 'Comtech_dev';
                  const isSelected = selectedIds.includes(user.id);
                  return (
                    <tr
                      key={user.id}
                      className={`transition-colors ${
                        isSelected ? 'bg-[#2b0820]/60' : 'hover:bg-slate-800/40'
                      }`}
                    >
                      <td className="p-4 text-center">
                        <button
                          onClick={() => toggleSelectOne(user.id)}
                          className="cursor-pointer"
                        >
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-[#E9A51A]" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-500 hover:text-slate-300" />
                          )}
                        </button>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-xs shrink-0 shadow-md"
                            style={
                              isSuperAdmin
                                ? { background: 'linear-gradient(135deg, #7B1B5A, #E9A51A)' }
                                : { background: '#240a1c', border: '1px solid #7B1B5A' }
                            }
                          >
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-white flex items-center gap-1.5">
                              <span>{user.name}</span>
                              {isSuperAdmin && (
                                <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-[#E9A51A] font-extrabold border border-amber-500/30">
                                  PRIMARY ROOT
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-400 font-mono">@{user.username}</div>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <span
                          className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1 border"
                          style={
                            user.role === 'Super Admin'
                              ? { background: 'rgba(233,165,26,0.15)', color: '#E9A51A', borderColor: 'rgba(233,165,26,0.30)' }
                              : user.role === 'Service Technician'
                              ? { background: 'rgba(123,27,90,0.20)', color: '#c44a8a', borderColor: 'rgba(123,27,90,0.35)' }
                              : { background: 'rgba(166,164,165,0.15)', color: '#A6A4A5', borderColor: 'rgba(166,164,165,0.30)' }
                          }
                        >
                          <Shield className="w-3 h-3" />
                          <span>{user.role}</span>
                        </span>
                      </td>

                      <td className="p-4 space-y-1">
                        <div className="flex items-center gap-1.5 text-slate-300 text-[11px]">
                          <Mail className="w-3.5 h-3.5 text-slate-500" />
                          <span>{user.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-mono">
                          <Phone className="w-3.5 h-3.5 text-slate-500" />
                          <span>+91 {user.phone}</span>
                        </div>
                      </td>

                      <td className="p-4">
                        <button
                          onClick={() => handleToggleStatus(user)}
                          disabled={isSuperAdmin}
                          title={isSuperAdmin ? 'Cannot deactivate Super Admin' : 'Click to toggle status'}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer ${
                            user.status === 'active'
                              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                              : 'bg-red-500/15 text-red-400 border border-red-500/30'
                          } ${isSuperAdmin ? 'cursor-not-allowed opacity-90' : 'hover:scale-105 transition-transform'}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              user.status === 'active' ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'
                            }`}
                          />
                          <span>{user.status}</span>
                        </button>
                      </td>

                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(user)}
                            className="p-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white hover:border-[#7B1B5A] transition-colors cursor-pointer"
                            title="Edit User"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          {!isSuperAdmin && (
                            <button
                              onClick={() => handleDelete(user.id, user.username)}
                              className="p-1.5 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
                              title="Delete User"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-[#140510] border border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 animate-fade-in relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl" style={{ background: 'rgba(123,27,90,0.25)', color: '#E9A51A' }}>
                  {editingUser ? <Edit2 className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-base font-bold font-heading text-white">
                    {editingUser ? 'Edit Staff Account' : 'Add New Staff / Technician'}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Configure login credentials and operational permissions for Suri portal.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Username *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#7B1B5A]"
                    placeholder="e.g. tech_debashis"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#7B1B5A]"
                    placeholder="e.g. Debasish Banerjee"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#7B1B5A]"
                    placeholder="debashis@comtechis.in"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Mobile Phone
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#7B1B5A]"
                    placeholder="9474306951"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Assigned Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#7B1B5A]"
                  >
                    <option value="Super Admin">Super Admin</option>
                    <option value="Service Technician">Service Technician</option>
                    <option value="Sales Manager">Sales Manager</option>
                    <option value="Support Executive">Support Executive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Account Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as UserStatus })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#7B1B5A]"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-700 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2.5 rounded-xl text-white font-bold text-xs shadow-lg transition-all cursor-pointer hover:opacity-95 flex items-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #7B1B5A 0%, #a82479 100%)' }}
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Saving User...' : editingUser ? 'Update User' : 'Create User'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
